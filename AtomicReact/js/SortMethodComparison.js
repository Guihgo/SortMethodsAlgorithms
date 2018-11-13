module.exports.onRender = function(atom){
  atom.atomicKey = 'SortMethodComparison';
  let thisAtom = Atomic.getAtom(atom.atomicKey);
  atom.getArray = thisAtom.getArray;
  atom.getMethod = thisAtom.getMethod;
  atom.doMethod = thisAtom.doMethod;
  atom.addResult = thisAtom.addResult;

  let menu = Atomic.getSub(atom, 'menu');
  let btnComparar = Atomic.getSub(menu, 'btnComparar');
  let btnLimpar = Atomic.getSub(menu, 'btnLimpar');

  btnComparar.onclick = function(){
    atom.addResult(atom.getMethod());
    // atom.addResult(atom.getMethod('methodTwo'));
  }

  btnLimpar.onclick = function(){
    let result = Atomic.getSub(atom, 'result');
    Atomic.getNucleus(Atomic.getSub(result, 'table')).innerHTML = '';
    Atomic.getNucleus(result).innerHTML = '';
  }
}

module.exports.getArray = function(){
  let array = Atomic.getNucleus(Atomic.getSub(Atomic.getSub(this, 'menu'), 'array'));
  let arrayNumber = [];
  for(let i=0; i<array.children.length; i++) {
    let number = parseInt(Atomic.getSub(array.children.item(i), 'number').innerHTML);
    arrayNumber.push(number);
  }
  return arrayNumber;
}

module.exports.getMethod = function(){
  let btnMethod = Atomic.getSub(Atomic.getSub(Atomic.getSub(this, 'menu'), 'method'), 'btnMethod');
  return (btnMethod.innerHTML);
}

module.exports.doMethod = function(methodName){

  let methodReturn = {};
  let array = this.getArray();
  let Atom = Atomic.getAtom(this.atomicKey);

  let timeInitial = performance.now();

  if(methodName=='Bubble') {
    methodReturn = Atom.bubble(array, array.length);
    methodReturn.graphicName = 'BubbleSortComplexity.pdf';
  }

  let timeEnd = performance.now();

  methodReturn.time = (timeEnd-timeInitial);
  methodReturn.arrayLength = array.length;
  return methodReturn;
}

module.exports.addResult = function(methodName) {
  let resultMethod = this.doMethod(methodName);
  console.log(resultMethod);

  let result = Atomic.getSub(this, 'result');
  let resultTable = Atomic.getSub(result, 'table');

  Atomic.add(resultTable, 'ResItem', [
    {key: 'method', value: methodName},
    {key: 'arrayLength', value: resultMethod.arrayLength},
    {key: 'comparisons', value: resultMethod.comparisons},
    {key: 'swaps', value: resultMethod.swaps},
    {key: 'time', value: resultMethod.time+"ms"}
  ]);

  Atomic.add(result, 'Graphic', [
    {key: 'title', value: methodName},
    {key: 'url', value: ('./plots/'+resultMethod.graphicName)}
  ]);

}

/* Sort Methods Implementation */

/* Bubble */
module.exports.bubble = function(A, n){
    let aux,i,j;
    let cont = 0, trocas = 0;
    for(i = 1; i < n; i++){
        for(j = 0; j < n - 1; j++){
            cont++;
            if(A[j] > A[j+1]){
                aux = A[j];
                A[j] = A[j+1];
                A[j+1] = aux;
                trocas++;
            }
        }
    }
    return {comparisons: cont, swaps: trocas};
}
