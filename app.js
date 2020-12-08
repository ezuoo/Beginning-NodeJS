// 익스프레스로 서버 설정 및 구동

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', require('./api/user'));

app.listen(3000, () => {
    console.log('Express app listening on port 3000 !');
});