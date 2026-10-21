const PORT = process.env.PORT || 4000;
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./connection.js');
const route = require('./routes');

mongoose.connect(config.url).then(
  () => {console.log('Connected to Zutor DB') },
  err => { console.log('Not connected to Zutor DB: '+ err) }
);

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', route);
//Default route
app.use(function(req, res){
  res.status(403);
  res.json({'Message':'Access Denied'});
});

app.listen(PORT, function(){
  console.log('Server running at: http://localhost:'+PORT+'/api');
});
