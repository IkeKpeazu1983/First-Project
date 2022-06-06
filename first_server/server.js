// const http = require ("http");

const req = require("express/lib/request");
const res = require("express/lib/response");

// http.createServer(function(req, res) {
//     res.write("Hello welcome to my first server");
//     res.end();
// }).listen(7000, function () {
//     console.log("server listening on port 7000");
// });

const express = required ('express');
const app = express ();

app.get('/', (req, res )  {
    res.send('this is the home page')
});


app.listen(7000, function() {
    console.log("server up and running")

});

