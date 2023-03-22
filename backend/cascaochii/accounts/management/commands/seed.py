from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from django.db import IntegrityError
from loguru import logger
import os

from utils.enums import RolesEnum
from accounts.models import RoleModel, CustomUser, CustomUserRole

class Command(BaseCommand):
    help = "seed database for testing and development."
    
    def create_roles(self):
        for role in RolesEnum:
            try:
                current_role = RoleModel.objects.update_or_create(id=role.value, defaults={'name': role.numele, 'description': role.description})
                logger.info(f'Add/Update role: {current_role[0].name}')
            except Exception as e:
                logger.error(f'Unable to add role: {role.value} \n{e}')
    
    def create_test_user(self):
        try:
            test_user = CustomUser.objects.create(
                    first_name = 'Test',
                    last_name = 'Test',
                    username = 'test',
                    password = make_password('test')
                )
            
            admin_role = RoleModel.objects.get(id=RolesEnum.ADMIN.value)
            CustomUserRole.objects.create(customuser_id=test_user, role_id=admin_role)
            logger.info('User test creted')
        except IntegrityError as e:
            logger.info('User test already present')
        
    def run_seed(self):
        self.create_roles()
        if os.getenv('DJANGO_DEVELOPMENT') == 'true':
            self.create_test_user()
            
    def handle(self, *args, **options):
        logger.info('START seeding data')
        self.run_seed()
        logger.info('FINISH seeding data')
        