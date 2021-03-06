const express= require('express');
const bodyParser= require('body-parser');
const path= require('path');
const http= require('http');
const app= express();

//api file for interacting with mongoDB.
const api=require('./server/routes/api');

//parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//api location
app.use('/api', api);

//send all other request to Angular app
app.get('*', (req, res)=>{
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//set port
const port= process.env.PORT || '3000';
app.set('port', port);

//create server
const server =http.createServer(app);
server.listen(port,()=> console.log(`Running on localhost:${port}`,port));