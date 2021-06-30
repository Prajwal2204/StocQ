import numpy as np
period = [1, 2, 4, 7, 0]     
def sigmoid(x):
    return 1 / (1 + np.exp(-x))


print(sigmoid(np.diff(period)))