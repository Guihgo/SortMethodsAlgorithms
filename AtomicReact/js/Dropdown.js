module.exports.onRender = function(atom){
  let btnMethod = Atomic.getSub(atom, 'btnMethod');
  let methods = Atomic.getSub(atom, 'methods');
  for(var i=0; i<methods.children.length; i++) {
    let method = methods.children.item(i);
    method.onclick = function(e){
      e.preventDefault();
      btnMethod.innerHTML = this.innerHTML;
    }
  }
}
