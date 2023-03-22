from enum import Enum

class RolesEnum(str, Enum):
    # for some reason i cannot use "name" here AttributeError: can't set attribute
    numele: str
    description: str
    
    def __new__(cls, id: int, numele: str = "", description: str =""):
        obj = str.__new__(cls, id)
        obj._value_ = id
        obj.numele = numele
        obj.description = description
        return obj
    
    ADMIN = (1, 'admin', 'The admin role')
    GUEST = (2, 'guest', 'The guest role')