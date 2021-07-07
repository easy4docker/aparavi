const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const port = 10000;
const env = {
    root : __dirname,
    dataFolder : '/var/_localAppData',
    appFolder : '/var/_localApp'
}
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.json() ); 
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies   
    extended: true
  })); 
app.get('/app.js', function(req, res, next) {
    res.sendFile(env.appFolder + '/cloudApp/www/app.js');
});

app.get('/', function(req, res, next) {
    res.sendFile(env.appFolder + '/cloudApp/www/index.html');
});

app.post('/api', function(req, res, next) {
    delete require.cache[env.appFolder + '/cloudApp/modules/api.js'];
    const API = require(env.appFolder + '/cloudApp/modules/api.js');
    const api = new API(env);
    api.run(req.body, (data) => {
        res.send(data);
    });
});
/*
app.all('*', function(req, res, next) {
    // res.send('data');
    // return true;
    delete require.cache[env.appFolder + '/cloudApp/modules/sql.js'];
    const SQL = require(env.appFolder + '/cloudApp/modules/sql.js');
    const sql = new SQL(env);
    sql.query('Show Databases', (data) => {
        res.send(data);
    });
    // res.send('hello world ' + new Date());
});
*/
/*
var pkg = {
    require : function(fileName, isCache) {
        if (!isCache) {
            delete require.cache[fileName];
        }
        return require(fileName);
    },
    md5 : require('md5')
}


app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies   
  extended: true
})); 



app.get(/(.+)$/i, (req, res) => {
    try {
        var APP = pkg.require(__dirname + '/modules/appRouter.js');
        var app = new APP(env, pkg, req, res);
        app.get();
    } catch (err) {
        res.send(err.toString());
    }

});

app.post(/(.+)$/i, (req, res) => {
    try {
        var APP = pkg.require(__dirname + '/modules/appRouter.js');
        var appPost = new APP(env, pkg, req, res);
        appPost.post();
    } catch (err) {
        res.send(err.toString());
    }

});
*/
app.listen(port,  () => {
    var d = new Date(); // for now
    datetext = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    console.log(datetext + ' Start app listening at http://localhost');
});