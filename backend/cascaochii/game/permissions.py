from rest_framework.request import Request
from loguru import logger
from rest_framework import permissions

from utils.permissions import PermissionUtil
from utils.enums import RolesEnum

class UserCanAddGame(permissions.BasePermission):
    """
        allow users to add game
    """
    def has_permission(self, request: Request, view):
        allow_roles_list = [RolesEnum.ADMIN.numele]
        res = PermissionUtil.has_role(request, allow_roles_list)
        logger.info(res)
        # TODO: fetch the result message from permissoins utils
        return res
    
    def has_object_permission(self, request, view, obj):
        return True