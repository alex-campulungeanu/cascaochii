from loguru import logger
from rest_framework.request import Request
from django.core.exceptions import ObjectDoesNotExist
from accounts.models import CustomUser
import traceback

def method_permission_classes(classes):
    def decorator(func):
        def decorated_func(self,  *args, **kwargs):
            self.permission_classes = classes
            self.check_permissions(self.request)
            return func(self, *args, **kwargs)
        return decorated_func
    return decorator

class PermissionUtil:
    @staticmethod
    def has_role(request: Request, allow_list):
        if request.user is None:
            return False
        user = request.user
        try:
            authentication = CustomUser.objects.get(pk=user.id)
        except ObjectDoesNotExist as e:
            # traceback.print_stack()
            return False
        roles = [role.name for role in authentication.roles.all()]
        # check if any existing roles on user is in the allowed list of roles
        if any(map(lambda role: role in roles, allow_list)):
            return True
        return False