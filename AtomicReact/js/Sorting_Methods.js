let arr = [10,2,5,7,1,4,3];
let n = arr.length;

function cocktailShakerSort(arr, n){
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
}

function shellSort(arr, n){
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
            while(arr[j - h] > key){
                arr[j] = arr[j - h];
                j = j - h;
                if(j < h) break;
            }
            arr[j] = key;
        }
    }while(h != 1);
}

function bubbleSort(arr, n){
    let temp;
    var n_comparacoes = 0;
    var n_trocas = 0;
    for(let i = 1; i < n; i++){
        for(let j = 0; j < n - 1; j++){
            n_comparacoes = n_comparacoes + 1;
            if(arr[j] > arr[j+1]){
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                n_trocas = n_trocas + 1;
            }
        }
    }
}

function selectionSort(arr, n){
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
}

function insertionSortAsc(arr, n){
    let key , count = 0, j;
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
}

function insertionSortDesc(arr, n){
    let key , count = 0, j;
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
}

function merge(arr, i1, j1, i2, j2){
    // TODO: NUMERO DE TROCAS E COMPARACOES
    let size = (j2*2) - 1;
    let temp = Array.apply(null, Array(size)).map(function () {});
    let i,j,k;
    i=i1;    //inicio do primeiro vetor
    j=i2;    //inicio do segundo vetor
    k=0;

    while(i<=j1 && j<=j2)    //Enquanto ha elementos nos dois vetores
    {
        if(arr[i] < arr[j])
            temp[k++] = arr[i++];
        else
            temp[k++] = arr[j++];
    }

    while(i<=j1)    //Copia elementos que sobraram do primeiro vetor
        temp[k++] = arr[i++];

    while(j<=j2)    //Copia elementos que sobraram do segundo vetor
        temp[k++] = arr[j++];

    //Transefere elementos de temp de volta para o A
    for(i=i1,j=0;i<=j2;i++,j++){
        arr[i]=temp[j];
    }
}

function mergeSort(arr, i, j){
    // TODO: NUMERO DE TROCAS E COMPARACOES
    let mid;

    if(i<j){
        mid=(i+j)/2;
        mergeSort(arri,mid);        //recursao a esquerda
        mergeSort(arr,mid+1,j);    //recursao a direita
        merge(arr,i,mid,mid+1,j);    //juntando os dois vetores
    }
}

// FALTA O QUICKSORT E O SEU PARTITION



//testes
// cocktailShakerSort(arr, n);

// console.log(arr);

// shellSort(arr, n); //ESSE NAO RODOU

// console.log(arr);
