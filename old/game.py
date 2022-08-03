import time
timeElapsed = time.time()


def main():
    print("Bom dia")


while True:
    timeElapsed+=0.001;
    main()
    now = time.time()
    sleeptime = timeElapsed - now
    if sleeptime > 0:
        time.sleep(sleeptime)
