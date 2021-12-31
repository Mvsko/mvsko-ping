import time
import random
import string

lower = string.ascii_lowercase
upper = string.ascii_uppercase
num = string.digits
all = lower + upper + num

def logkey():
    pr = random.sample(all, 17)
    p = "".join(pr)
    lr = random.sample(all, 8)
    l = "".join(lr)
    mr = random.sample(all, 15)
    m = "".join(mr)
    return(p + "." + l + "." + m)