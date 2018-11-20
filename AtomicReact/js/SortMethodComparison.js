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
    };

    btnLimpar.onclick = function(){
        let result = Atomic.getSub(atom, 'result');
        Atomic.getNucleus(Atomic.getSub(result, 'table')).innerHTML = '';
        Atomic.getNucleus(result).innerHTML = '';
    };
    };

module.exports.getArray = function(){
    let array = Atomic.getNucleus(Atomic.getSub(Atomic.getSub(this, 'menu'), 'array'));
    let arrayNumber = [];
    for(let i=0; i<array.children.length; i++) {
        let number = parseInt(Atomic.getSub(array.children.item(i), 'number').innerHTML);
        arrayNumber.push(number);
    }
    return arrayNumber;
    };

module.exports.getMethod = function(){
    let btnMethod = Atomic.getSub(Atomic.getSub(Atomic.getSub(this, 'menu'), 'method'), 'btnMethod');
    return (btnMethod.innerHTML);
    };

module.exports.doMethod = function(methodName){

    let methodReturn = {};
    let array = this.getArray();
    let Atom = Atomic.getAtom(this.atomicKey);

    let timeInitial = performance.now();

    if(methodName=='Bubble') {
        methodReturn = Atom.bubble(array, array.length);
        methodReturn.graphicName = 'BubbleSortComplexity.pdf';
    }

    if(methodName=='CocktailShaker') {
        methodReturn = Atom.cocktailShaker(array, array.length);
        methodReturn.graphicName = 'CocktailShakerSortComplexity.pdf';
    }

    if(methodName=='Shell') {
        methodReturn = Atom.shell(array, array.length);
        methodReturn.graphicName = 'ShellSortComplexity.pdf';
    }

    if(methodName=='Selection') {
        methodReturn = Atom.selection(array, array.length);
        methodReturn.graphicName = 'SelectionSortComplexity.pdf';
    }

    if(methodName=='Insertion Asc') {
        methodReturn = Atom.insertionAsc(array, array.length);
        methodReturn.graphicName = 'InsertionSortComplexity.pdf';
    }

    if(methodName=='Insertion Desc') {
        methodReturn = Atom.insertionDesc(array, array.length);
        methodReturn.graphicName = 'InsertionSortComplexity.pdf';
    }

    if(methodName=='Merge') {
        methodReturn = Atom.mergeSort(array, 0, array.length, Atomic.getAtom(this.atomicKey));
        methodReturn.graphicName = 'MergeSortComplexity.pdf';
    }

    if(methodName=='Quick') {
        methodReturn = Atom.quick(array, 0, array.length, Atomic.getAtom(this.atomicKey));
        methodReturn.graphicName = 'QuickSortComplexity.pdf';
    }

    let timeEnd = performance.now();

    methodReturn.time = (timeEnd-timeInitial);
    methodReturn.arrayLength = array.length;
    return methodReturn;
};

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

};

/* Sort Methods Implementation */

module.exports.bubble = function(A, n){
    let aux,i,j;
    let n_comparacoes = 0, n_trocas = 0;
    for(i = 1; i < n; i++){
        for(j = 0; j < n - 1; j++){
            n_comparacoes = n_comparacoes + 1;
            if(A[j] > A[j+1]){
                aux = A[j];
                A[j] = A[j+1];
                A[j+1] = aux;
                n_trocas = n_trocas + 1;
            }
        }
    }
    return {comparisons: n_comparacoes, swaps: n_trocas};
};

module.exports.cocktailShaker = function(arr, n){
    let swapped = true;
    var n_trocas = 0;
    var n_comparacoes = 0;
    let end = n - 1;
    let temp1, temp2;
    while(swapped){
        swapped = false;

        for(var i = 0; i<end; i++){
            n_comparacoes = n_comparacoes + 1;
            if(arr[i] > arr[i+1]){
                temp1 = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp1;
                n_trocas = n_trocas + 1;
                swapped = true;
            }
        }

        if(!swapped) break; // ja esta ordenado

        swapped = true;

        end--;

        for(var j = end - 1; j > i - 1; j--){
            n_comparacoes = n_comparacoes + 1;
            if(arr[j] > arr[j + 1]){
                temp2 = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp2;
                n_trocas = n_trocas + 1;
                swapped = true;
            }
        }

        i++;
    }
    return {comparisons: n_comparacoes, swaps: n_trocas};
};

module.exports.shell = function(arr, n){
    // TODO: CONFERIR TROCAS E COMPARACOES
    var n_trocas = 0;
    var n_comparacoes = 0;

    let h = n/2;
    let key;
    do{
        h = 3*h + 1;
    }while(h < n);

    let i,j;

    do{
        h = h/3;
        for(i = h + 1; i < n; i++){
            key = arr[i];
            j = i;
            n_comparacoes = n_comparacoes + 1;
            while(arr[j - h] > key){
                arr[j] = arr[j - h];
                j = j - h;
                if(j < h) break;
                n_trocas = n_trocas + 1;
            }
            arr[j] = key;
        }
        console.log('teste');
    }while(h != 1);

    return {comparisons: n_comparacoes, swaps: n_trocas};
};

module.exports.selection = function(arr, n){
    let menor = 0, temp = 0, n_trocas = 0, n_comparacoes = 0;
    for(let i = 0; i < n - 1; i++){
        menor = i;
        for(let j = i; j < n; j++){
            n_comparacoes = n_comparacoes + 1;
            if(arr[j] < arr[menor]){
                menor = j;
            }
        }
        if(i != menor){
            temp = arr[i];
            arr[i] = arr[menor];
            arr[menor] = temp;
            n_trocas = n_trocas + 1;
        }
    }
    return {comparisons: n_comparacoes, swaps: n_trocas};
};

module.exports.insertionAsc = function(arr, n){
    let key , j;
    let n_trocas = 0, n_comparacoes = 0;
    for(let i = 1; i < n; i++){
        key = arr[i];
        j = i - 1;
        n_comparacoes = n_comparacoes + 1;
        while(j >= 0 && key < arr[j]){
            arr[j + 1] = arr[j];
            j--;
            n_trocas = n_trocas + 1;
        }
        arr[j + 1] = key;
    }
    return {comparisons: n_comparacoes, swaps: n_trocas};
};

module.exports.insertionDesc = function(arr, n){
    let key , j;
    let n_trocas = 0, n_comparacoes = 0;
    for(let i = 1; i < n; i++){
        key = arr[i];
        j = i - 1;
        n_comparacoes = n_comparacoes + 1;
        while(j >= 0 && key > arr[j]){
            arr[j + 1] = arr[j];
            j--;
            n_trocas = n_trocas + 1;
        }
        arr[j + 1] = key;
    }
    return {comparisons: n_comparacoes, swaps: n_trocas};
};

module.exports.merge = function(arr, i1, j1, i2, j2){
    // TODO: NUMERO DE TROCAS E COMPARACOES
    let n_comparacoes = 0;
    let n_trocas = 0;
    let temp = [];
    let i,j,k;
    let n_comparacoes = 0, n_trocas = 0;
    i=i1;    //inicio do primeiro vetor
    j=i2;    //inicio do segundo vetor
    k=0;

    while(i<=j1 && j<=j2)    //Enquanto ha elementos nos dois vetores
    {

        n_comparacoes = n_comparacoes + 1;
        if(arr[i] < arr[j]){
            temp[k++] = arr[i++];
            n_trocas++;
        }
        else{
            temp[k++] = arr[j++];
            n_trocas++;
        }
    }

    while(i<=j1) {   //Copia elementos que sobraram do primeiro vetor
        temp[k++] = arr[i++];
        n_trocas = n_trocas + 1;
    }

    while(j<=j2){    //Copia elementos que sobraram do segundo vetor
        temp[k++] = arr[j++];
        n_trocas++;
    }

    //Transefere elementos de temp de volta para o A
    for(i=i1,j=0;i<=j2;i++,j++){
        arr[i]=temp[j];
    }
};

module.exports.mergeSort = function(arr, i, j, Atom){
    // TODO: NUMERO DE TROCAS E COMPARACOES
    let n_comparacoes = 0;
    let n_trocas = 0;
    let mid;

    if(i<j){
        mid=(i+j)/2;
        let returnRecEsquerda = Atom.mergeSort(arr,i,mid, Atom);        //recursao a esquerda
        let returnRecDireita = Atom.mergeSort(arr,mid+1,j, Atom);    //recursao a direita
        Atom.merge(arr,i,mid,mid+1,j);    //juntando os dois vetores
    }

    return {comparisons: -1, swaps: -1};
};

// TODO: QUICKSORT (E O SEU PARTITION)
module.exports.partition = function(arr, menor, maior){
    // TODO: NUMERO DE TROCAS E COMPARACOES
    let n_comparacoes = 0;
    let n_trocas = 0;
    let pivot = arr[maior];    // pivo
    let i = (menor - 1);  // menor elemento
    let temp, temp2;
    for (let j = menor; j <= maior - 1; j++)
    {
        // Se o elemento atual e menor igual ao pivot
        n_comparacoes = n_comparacoes + 1;
        if (arr[j] <= pivot)
        {
            i++;    //aumenta index do menor elemento
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            n_trocas = n_trocas + 1;
        }
    }
    temp2 = arr[i+1];
    arr[i+1] = arr[maior];
    arr[maior] = temp2;
    n_trocas = n_trocas + 1;
    return {comparisons: n_comparacoes, swaps: n_trocas, wall: (i + 1)};
};

module.exports.quick = function(arr, menor, maior, Atom){
    let n_comparacoes = 0;
    let n_trocas = 0;
    if(menor < maior){
        let returnPartition = Atom.partition(arr, menor, maior);
        let q = returnPartition.wall;

        let returnLeft = Atom.quick(arr, menor, q - 1, Atom);
        let returnRight = Atom.quick(arr, q + 1, maior, Atom);

        n_comparacoes += (returnPartition.comparisons + returnLeft.comparisons + returnRight.comparisons);
        n_trocas += (returnPartition.swaps + returnLeft.swaps + returnRight.swaps);
    }

    return {comparisons: n_comparacoes, swaps: n_trocas};
};
