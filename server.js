//Install express server
const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors'); 

const CONTEXT = `/${process.env.CONTEXT || 'puzzler'}`;

const app = express();
app.use(cors());
app.use(compression({ level: 6 }));

// Serve only the static files form the dist directory
app.use('/app',express.static(__dirname + '/dist/puzzler'));

app.use('/docs', express.static(__dirname + '/dist/puzzler'));

app.get('/docs', function(req,res) {
    
res.sendFile(path.join(__dirname+'/documentation/index.html'));
});

app.get('/', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/puzzler/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
