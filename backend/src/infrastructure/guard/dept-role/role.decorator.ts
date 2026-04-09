import { SetMetadata } from '@nestjs/common';
import { UniversityDepartmentRoleEnum } from 'src/domain/enums/university.enum';

export const DEPT_ROLES_KEY = 'roles';
export const DeptRoles = (...roles: UniversityDepartmentRoleEnum[]) => SetMetadata(DEPT_ROLES_KEY, roles);
