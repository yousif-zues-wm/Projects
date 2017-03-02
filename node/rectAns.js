var argv = require('yargs')
.usage('Usage: node $0 --l=[num] --b=[num]')
.demand(['l','b'])
.argv;
var rect = require('./solveRect');
function solveRect(l,b){
  console.log('Solving For Length ' + l + " Width " + b);
  rect(l,b, function(err,rectangle){
      if(err){
        console.log(err);
      }
      else{
        console.log("The Area Is " + rectangle.area());
        console.log("The perimeter Is " + rectangle.perimeter());
      }
  });
}
