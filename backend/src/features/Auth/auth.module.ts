import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UniversityDepartmentRepository } from "src/infrastructure/repository/university-dept.repo";
import { BcryptService } from "src/infrastructure/services/bcrypt.service";
import { AuthController } from "./auth.controller";
import { JwtHelperService } from "src/infrastructure/services/jwt.service";
import { StudentRepository } from "src/infrastructure/repository/student.repo";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [JwtHelperService, UniversityDepartmentRepository, AuthService, BcryptService, StudentRepository],
    exports: [AuthModule],
})

export class AuthModule { }