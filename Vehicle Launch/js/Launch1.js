
var x = {
  ob: 'string',
  obj: true,
  nu: 1,
  nan: null
}

y: function(){
  document.write('Our String is ' + this.ob);
}

function e(){
  x.y();
}
