import time
timeElapsed = time.time()


def mainGameLoop():
    print("Bom dia")


while True:
    timeElapsed+=0.001;
    mainGameLoop()
    now = time.time()
    sleeptime = timeElapsed - now
    if sleeptime > 0:
        time.sleep(sleeptime)
