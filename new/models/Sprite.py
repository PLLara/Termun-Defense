from new.constants.colors import Colors

class Sprite:
    def __init__(self, sprite:str, color : Colors, bgColor: Colors, drawPriority: int):
        self.sprite = sprite
        self.color = color
        self.bgColor = bgColor
        self.drawPriority = drawPriority
    
    def render(self):
        return (
            self.color + self.bgColor + self.sprite + Colors.Reset
        )

