// require
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templeteHTML(title, list, body,control){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB - ${title}</a></h1>
    ${list}
    ${control}
    ${body}
  </body>
  </html>`;
}

// http service 
var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(request.url, true).query;
  var pathName = url.parse(request.url, true).pathname;
  var isid = queryData.id != undefined ? true : false;
  var title = queryData.id != undefined ? queryData.id : "WELCOME3";
  var description = '';
  var list = '';
  var control = (queryData.id == undefined) ? `<a href="/create">Create</a>` : 
  `<a href="/create">Create</a> <a href="/update?id=${title}">Update</a> <a href="/delete?id=${title}">Delete</a>`;

  // valid request
  if (pathName == '/') {
    
    fs.readdir('./data', function (err, filelist) {
      list = '<ol>';

      for (var i = 0; i < filelist.length; i++) {
        list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      }

      list += '</ol>';

      fs.readFile(`./data/${title}`, 'utf-8', function (err, data) {
        var templete = templeteHTML(title, list, `<h2>${title}</h2><p>${data}</p>`,control);
        console.log(queryData.id);
        response.writeHead(200);
        response.end(templete);
      
      });
    });
  }

  else if (pathName == '/create') {
    control = ``;
    fs.readdir('./data', function (err, filelist) {
      list = '<ol>';

      for (var i = 0; i < filelist.length; i++) {
        list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      }

      list += '</ol>';

      var templete = templeteHTML('Create', list, `
        <p>
        <form action="http://localhost:3000/create_process" method="POST">
          <input type="text" name="title" placeholder="title"><p>
          <textarea name="description" placeholder="description"></textarea>
          <input type="submit">
        </form>
      `,control);

      response.writeHead(200);
      response.end(templete);
    });
  }

  else if (pathName == '/create_process') {
    var body = '';
      request.on('data', function (data) {
          body += data;
      });

      request.on('end', function () {
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;
          
          fs.writeFile(`./data/${title}`, description, 'utf-8', function(err){
            response.writeHead(302, { Location: `/?id=${title}`});
            response.end('success');
          })
      });
  }

  else if (pathName == '/update'){
    fs.readdir('./data', function (err, filelist) {
        list = '<ol>';
          for (var i = 0; i < filelist.length; i++) {
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          }
        list += '</ol>';
      
        fs.readFile(`./data/${title}`, 'utf-8', function (err, data) {
        description = data;
        var templete = templeteHTML('Update', list, `
          <p>
          <form action="http://localhost:3000/update_process" method="POST">
            <input type="hidden" name="ori_title" value="${title}">
            <input type="text" name="title" placeholder="title" value="${title}"><p>
            <textarea name="description" placeholder="description">${description}</textarea>
            <input type="submit">
          </form>
        `, ` <a href="/create">Create</a>`);
        response.writeHead(200);
        response.end(templete);
      });
    
    });
  }

  else if(pathName == '/update_process'){
    var body = '';
      request.on('data', function (data) {
          body += data;
      });

      request.on('end', function () {
          var post = qs.parse(body);
          var original_title = post.ori_title;
          var title = post.title;
          var description = post.description;
          
          fs.rename(`./data/${original_title}`,`./data/${title}`, function(err){
              fs.writeFile(`./data/${title}`, description, 'utf-8', function(err){
                response.writeHead(302, { Location: `/?id=${title}`});
                response.end('success');
               });
          });
      });
  }
  else if(pathName == '/delete'){
    fs.unlink(`./data/${title}`, function(err){
      response.writeHead(302, { Location: '/'});
      response.end('success');
    });
  }

  // invalid request, err page 
  else {
    response.writeHead(404);
    response.end("Not Found");
  }

});

app.listen(3000);