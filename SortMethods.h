#include <stdio.h>
#include <stdbool.h>

void printaVetor(int *A, int n){
    printf("[  ");
    for(int i = 0; i < n; i ++){
        printf("%d  ", A[i]);
    }
    printf("]");
    printf("\n");
}

void cocktailShakerSort(int *A, int n){
    int i, j; 
    bool swapped = true;
    int ntrocas = 0;
    int ncomp = 0;
    int end = n - 1;
    int temp1, temp2;
    while(swapped){
        swapped = false;

        for(i = 0; i < end; i++){
            ncomp++;
            if(A[i] > A[i+1]){
                temp1 = A[i];
                A[i] = A[i + 1];
                A[i + 1] = temp1;
                ntrocas++;
                swapped = true;
            }
        }

        if(swapped == false) break; //ja esta ordenado

        swapped = true;

        end--;

        for(j = end - 1; j > i - 1; j--){
            if(A[j] > A[j + 1]){
                temp2 = A[j];
                A[j] = A[j + 1];
                A[j + 1]= temp2;
                ntrocas++;
                swapped = true;
            }
        }

        i++;
    }
}

void shellSort(int *A, int n){
    // TODO: NUMERO DE TROCAS E COMPARACOES
    int h = n/2;
    int key;

    do{
        h = 3*h +1;
    }while(h < n);

    int i, j;
    do{
        h = (h)/3;
        for(i = h + 1; i < n; i++){
            key = A[i];
            j = i;
            while(A[j - h] > key){
                A[j] = A[j - h];
                j = j - h;
                if(j < h) break;
            }
            A[j] = key;
            printaVetor(A, n);
        }
    }while(h != 1);
}

void bubbleSort(int A[], int n){
    int aux,i,j;
    int cont = 0, trocas = 0;
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
    printf("Comparacoes: %d\n", cont);
    printf("Trocas: %d\n", trocas);
}

void selection_sort(int v[], int n){
    int menor = 0, i=0,j=0, temp=0, ntrocas = 0;
    for(i = 0; i < n - 1 ; i++){
        menor = i;
        for(j = i + 1; j < n; j++){
            if(v[j] < v[menor]){
                menor = j;
            }
        }
        if(i != menor){
                temp = v[i];
                v[i] = v[menor];
                v[menor] = temp;
                ntrocas++;
        }
    }
}

void insertion_sort_asc(int v[], int n){
    // TODO: NUMERO DE TROCAS E COMPARACOES
    int i, j, key, count = 0;
    for(i = 1; i < n; i++){
        key = v[i];
        j = i - 1;
        count++;
        while(j >= 0 && key < v[j]){
            v[j + 1] = v[j];
            j--;
        }
        v[j + 1] = key;
    }
    printf("count: %d\n", count);
}

void insertion_sort_desc(int *v, int n){
    // TODO: NUMERO DE TROCAS E COMPARACOES
    int i,j, key, count = 0;
    for(i = 1; i < n; i++){
        key = v[i];
        j = i - 1;
        while(j >= 0 && key > v[j]){
            v[j + 1] = v[j];
            j--;
        }
        v[j + 1] = key;
    }
}
void merge(int *A,int i1,int j1,int i2,int j2)
{
    int temp[(j2*2) - 1]; 
    int i,j,k;
    i=i1;    //inicio do primeiro vetor
    j=i2;    //inicio do segundo vetor
    k=0;
    
    while(i<=j1 && j<=j2)    //Enquanto ha elementos nos dois vetores
    {
        if(A[i]<A[j])
            temp[k++]=A[i++];
        else
            temp[k++]=A[j++];
    }
    
    while(i<=j1)    //Copia elementos que sobraram do primeiro vetor
        temp[k++]=A[i++];
        
    while(j<=j2)    //Copia elementos que sobraram do segundo vetor
        temp[k++]=A[j++];
        
    //Transefere elementos de temp de volta para o A
    for(i=i1,j=0;i<=j2;i++,j++){
        A[i]=temp[j];
    }
        
}

void mergeSort(int a[],int i,int j)
{
    // TODO: NUMERO DE TROCAS E COMPARACOES
    int mid;
        
    if(i<j){
        mid=(i+j)/2;
        mergeSort(a,i,mid);        //recursao a esquerda
        mergeSort(a,mid+1,j);    //recursao a direita
        merge(a,i,mid,mid+1,j);    //juntando os dois vetores 
    }
}

int partition (int A[], int menor, int maior) 
{   
    // TODO: NUMERO DE TROCAS E COMPARACOES
    int pivot = A[maior];    // pivo
    int i = (menor - 1);  // menor elemento
    int temp, temp2;
    for (int j = menor; j <= maior - 1; j++) 
    { 
        // Se o elemento atual e menor igual ao pivot 
        if (A[j] <= pivot) 
        { 
            i++;    //aumenta index do menor elemento
            temp = A[i];
            A[i] = A[j];
            A[j] = temp;
        } 
    } 
    temp2 = A[i+1];
    A[i+1] = A[maior];
    A[maior] = temp2;

    return (i + 1); 
} 

void quickSort(int arr[], int menor, int maior) 
{ 
    // TODO: NUMERO DE TROCAS E COMPARACOES
    if (menor < maior) 
    { 
        int partIndex = partition(arr, menor, maior); 
        quickSort(arr, menor, partIndex - 1); 
        quickSort(arr, partIndex + 1, maior - 1); 
    } 
} 