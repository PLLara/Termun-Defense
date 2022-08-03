from enum import Enum     # for enum34, or the stdlib version

class Colors(Enum):
    Black = '\033[30m'
    Red = '\033[31m'
    Green = '\033[32m'
    Yellow = '\033[33m'
    Blue = '\033[34m'
    Magenta = '\033[35m'
    Cyan = '\033[36m'
    White = '\033[37m'
    Reset = '\033[0m'

class BgColor(Enum):
    Black = '\033[40m'
    Red = '\033[41m'
    Green = '\033[42m'
    Yellow = '\033[43m'
    Blue = '\033[44m'
    Magenta = '\033[45m'
    Cyan = '\033[46m'
    White = '\033[47m'
    Reset = '\033[0m'