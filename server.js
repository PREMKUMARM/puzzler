//Install express server
const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors'); 

const CONTEXT = `/${process.env.CONTEXT || 'puzzler'}`;

const app = express();
app.use(cors());
app.use(compression({ level: 6 }));
app.use(
  CONTEXT,
  express.static(
    path.resolve(__dirname, '/dist/puzzler')
  )
);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/puzzler'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/puzzler/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);