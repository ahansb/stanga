var CONTROLLER_NAME = 'home';

module.exports = {
  getHome:function(req,res){
      res.render(CONTROLLER_NAME+'/home',{})
  }
};