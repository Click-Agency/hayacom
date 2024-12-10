import { Reflector } from '@nestjs/core';

enum RolesEnum {
  ADMIN = 'admin',
  USER = 'user',
}

const Roles = Reflector.createDecorator<RolesEnum[]>();

export { Roles, RolesEnum };
