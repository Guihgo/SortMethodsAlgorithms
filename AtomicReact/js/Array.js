module.exports.onRender = function(atom){
  var inputNumber = Atomic.getSub(atom, 'inputNumber');
  var btnAdd = Atomic.getSub(atom, 'btnAdd');

  atom.array = Atomic.getAtom('Array').array;

  btnAdd.onclick = function() {
    if(inputNumber.value=="") {return alert('Você deve digitar um número para adiciona-lô')}
    Atomic.add(atom, 'Number', [{key:'number', value: inputNumber.value}]);
    inputNumber.value = "";
    inputNumber.focus();
  };

  inputNumber.onkeypress = function(e){
    if(e.charCode==13) {
      btnAdd.onclick();
    }
  }
}

module.exports.onAdded = function(atomAdded, atom){
  let btnRemove = Atomic.getSub(atomAdded, 'btnRemove');
  btnRemove.onclick = function() {
    Atomic.getNucleus(atom).removeChild(atomAdded);
  }
}
