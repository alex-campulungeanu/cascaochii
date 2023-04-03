from rest_framework import permissions
from rest_framework.request import Request

from utils.permissions import PermissionUtil

# TODO: incomplete permission mechanism
class UserHasRole(permissions.BasePermission):
    def __init__(self):
        pass
        # self.allowed_roles = allowed_roles
        # self.message = "You don't have the required role to access this !"
    
    def has_permission(self, request: Request, view):
        # res = PermissionUtil.has_role(request, self.allowed_roles)
        # TODO: fetch the result message from permissoins utils
        return True
    
        # raise exceptions.Forbidden()