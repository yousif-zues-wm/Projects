var rect = require('./rect');
function solveRect(l,b){
  console.log("Solving for " + l + ' ' + b);

  rect(l,b, function(err,rectangle){
    if (err) {
      console.log(err);
    }
    else{
      console.log("the  area is " + rectangle.area());
      console.log("the perimeter is " + rectangle.perimeter());
    }
  });
}
solveRect(3,4);
