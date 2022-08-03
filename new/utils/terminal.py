def setCursorPosition(x:int, y:int):
    print("\033[" + str(y) + ";" + str(x) + "H", end='')
    print("\033[0J", end='')
