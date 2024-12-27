import random
import string

def random_gen(len: int) -> str:
    hashs = ''.join(random.choices(string.ascii_uppercase + string.digits, k=len))
    print(hashs)
    return hashs