import numpy as np
period = [1, 2, 4, 7, 0]     
def sigmoid(x):
    return 1 / (1 + np.exp(-x))





def average_interest_rate(trading_period):
    #returns average mutual funds per annum 6 to 9% as per google
    #so return per candle of missed oppurtunity will be
    #annual return around 8%
    return 0.0002 

print(average_interest_rate(trading_period=255))