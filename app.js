const express = require('express');
const app = express();

let users = [
    {   id: 1, name: 'bae' },
    {   id: 2, name: 'alice' },
    {   id: 3, name: 'chris' }
];

var print = '';



app.get('/', (rep, res) => {

    res.json(users);
});

// get users
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id,10);
    
    if (!id) {
        return res.status(400).json({error: 'Incorrect id'});
      }
    
      let user = users.filter(user => user.id === id)[0]
      
      if(!user){
          return res.status(404).json({ error: 'Unknown User !'});
      }
      
      console.log(user);
      var uu = new User(user.name);
      uu.greeting().introduce();

      return res.json(user);
});

// delete user
app.delete('/users/:id', (req, res) => {

    const id = parseInt(req.params.id,10);

    if(!id) { return res.status(400).json({ error: 'Incorrect id !'}); }

    const userIdx = users.findIndex( user => user.id === id );

    console.log(`user Index : ${userIdx}`);

    if(userIdx === -1) { return res.status(404).json({error: 'Unknown user'}); }
    
    users.splice(userIdx, 1);

    res.status(204).send();
});

// add user
app.post('/users/:id', (req, res) => {
    
})





app.listen(3000, () => {
    console.log('Express app listening on port 3000 !');
});




function User(_name){
    this.name = _name;
}

User.prototype.greeting = function(){
    console.log('Hello!');
    return this;
};
User.prototype.introduce = function() {
    console.log(`I am ${this.name}`);
    return this;
};