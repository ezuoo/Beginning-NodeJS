const express = require('express');
const app = express();

app.get('/',(rep, res) => {
    res.send('Hello World! ');
})
app.listen(3000, () => {
    console.log('Express app listening on port 3000 !');
});