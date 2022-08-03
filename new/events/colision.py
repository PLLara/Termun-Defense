from new.basics.position import PositionRelative


class ColisionEvent:
    def __init__(self, positionRelative: PositionRelative):
        self.positionRelative = positionRelative