import { SetMetadata } from '@nestjs/common';
import { StudentRoleNum } from 'src/domain/enums/university.enum';

export const STUDENT_ROLES_KEY = 'roles';
export const STUDENTRoles = (...roles: StudentRoleNum[]) => SetMetadata(STUDENT_ROLES_KEY, roles);
