#%%
import matplotlib.pyplot as plt
import matplotlib
import numpy as np
print('Imports OK')

#%%
x = np.arange(0, 100)
y = 0.5 * x
print(y, x)

#%% 
k = 0.5
sup = 1.5
plt.title('Selection Sort Complexidade')
print('Tanto para o melhor, pior e medio caso sua complexidade e de O(n^2)')
PiorMedioMelhorCaso, = plt.plot(x, x**2, 'lightblue', lw = 0.05, marker = "o", label = 'Pior, Medio, Melhor Caso')
limiteSupmedioCaso, = plt.plot(x, sup*x**2, 'pink', label = 'Limite Superior do caso Medio')
limiteInfMelhorMedioCaso, = plt.plot(x, k*x**2, 'lightgreen', label = 'Limite Inferior do Melhor e Medio caso')
plt.legend(handles = [PiorMedioMelhorCaso, limiteSupmedioCaso, limiteInfMelhorMedioCaso])



#%% 
plt.title('Complexidade Insertion Sort')

constanteVezesMelhorCaso = 0.5
medioCaso, = plt.plot(x, x**2, 'bs', label = 'Medio Caso')
piorCaso, = plt.plot(x, x**2, 'g-', label = 'Pior Caso')
melhorCaso, = plt.plot(x,x,'r--', label = 'Melhor Caso')
omegaNMelhorCaso, = plt.plot(y, y, 'p', label = 'Omega(n)')
plt.legend(handles = [medioCaso, piorCaso, melhorCaso, omegaNMelhorCaso])

#%%
plt.title('Bubble Sort Complexidade')
