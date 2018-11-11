import matplotlib.pyplot as plt
import matplotlib
import numpy as np
print('Imports OK')

##IMPORTANTE
#COLOCAR ESSE N COM BASE NO TAMANHO DO VETOR INFORMADO PELO USUARIO
n = 100
x = np.arange(0, n+1)
x


inf = 0.5
sup = 1.5
plt.title('Selection Sort Complexidade')
PiorMedioMelhorCaso, = plt.plot(x, x**2, 'r-', label = 'Pior, Medio e Melhor caso')
limiteSupMedioCaso, = plt.plot(x, sup*x**2, 'pink', label = 'Limite Superior do Medio caso')
limiteInfMelhorMedioCaso, = plt.plot(x, inf*x**2, 'lightgreen', label = 'Limite Inferior do Melhor e Medio caso')
plt.legend(handles = [PiorMedioMelhorCaso, limiteSupMedioCaso, limiteInfMelhorMedioCaso])
plt.xlabel('Numero de entradas')
plt.ylabel('Operacoes realizadas')
plt.savefig('/Users/joaomarcelo/Desktop/temp/SelectionSortComplexity.pdf', format = 'pdf')


plt.title('Complexidade Insertion Sort')
piorMedioCaso, = plt.plot(x, x**2, 'b-', label = 'Pior e Medio Caso')
melhorCaso, = plt.plot(x,x,'r-', label = 'Melhor Caso')
limiteInfMelhorMedioCaso, = plt.plot(x, inf*x**2, 'c-', label = 'Limite Inferior do Melhor e Medio caso')
limiteSupMedioCaso, = plt.plot(x, sup*x**2, 'g-', label = 'Limite Superior do Medio caso')
plt.legend(handles = [limiteSupMedioCaso, piorMedioCaso,limiteInfMelhorMedioCaso, melhorCaso])
plt.xlabel('Numero de entradas')
plt.ylabel('Operacoes realizadas')
plt.savefig('/Users/joaomarcelo/Desktop/temp/InsertionSortComplexity.pdf', format = 'pdf')


plt.title('Bubble Sort Complexidade')
limiteInfMelhorCaso, = plt.plot(x, inf*x, 'g-', label = 'Limite Inferior do Melhor caso')
limiteInfMedioCaso, = plt.plot(x, inf*x**2, 'b-', label = 'Limite Inferior do Medio caso')
limiteSupMedioCaso, = plt.plot(x, sup*x**2, 'r-', label = 'Limite Superior do Medio caso')
piorMedioCaso, = plt.plot(x, x**2, 'lightgreen', label = 'Pior e Medio caso')
plt.legend(handles = [limiteSupMedioCaso, piorMedioCaso, limiteInfMedioCaso, limiteInfMelhorCaso])
plt.xlabel('Numero de entradas')
plt.ylabel('Operacoes realizadas')
plt.savefig('/Users/joaomarcelo/Desktop/temp/BubbleSortComplexity.pdf', format = 'pdf')



#The best case ∊ Theta(nlogn):
#The worst case ∊ theta(n*(logn)^2):
#The avg case ∊ theta(n*(logn)^2):
plt.title('Shell Sort Complexidade')
limiteInfMedioPiorCaso, = plt.plot(x, 0.5*inf*(x*(np.log10(x)**2)), 'b-', label = 'Limite Inferior Medio e Pior caso')
limiteSupMedioPiorCaso, = plt.plot(x, sup*(x*(np.log10(x)**2)), 'g-', label = 'Limite Superior Medio e Pior caso')
melhorCaso, = plt.plot(x, (x*np.log10(x)), 'r-', label = 'Melhor Caso')
plt.legend(handles = [limiteInfMedioPiorCaso, limiteSupMedioPiorCaso, melhorCaso])
plt.xlabel('Numero de entradas')
plt.ylabel('Operacoes realizadas')
plt.savefig('/Users/joaomarcelo/Desktop/temp/ShellSortComplexity.pdf', format = 'pdf')


