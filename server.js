const express = require("express");
const path = require("path");
const app = express();

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
    index: ['index.html'],
    maxAge: '1m',
    redirect: false
}

app.use(express.static('build', options));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`React app listening at http://localhost:${port}`);
});