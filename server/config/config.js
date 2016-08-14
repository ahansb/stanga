var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');

module.exports={
  development:{
      rootPath:rootPath,
      db:'mongodb://heroku_3msv4gx5:416diued9b6nh1st3f1lgsso6h@ds047945.mlab.com:47945/heroku_3msv4gx5',
      port: process.env.PORT || 3000
  }
};