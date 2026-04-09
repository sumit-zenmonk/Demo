import { UniversityDepartmentRepository } from "src/infrastructure/repository/university-dept.repo";
import { RegisterDto } from "./dto/register.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtHelperService } from "src/infrastructure/services/jwt.service";
import { BcryptService } from "src/infrastructure/services/bcrypt.service";
import { LoginDto } from "./dto/login.dto";
import { LoginStudentDto } from "./dto/login.student.dto";
import { StudentRepository } from "src/infrastructure/repository/student.repo";

@Injectable()
export class AuthService {
    constructor(
        private readonly universityDeptRepo: UniversityDepartmentRepository,
        private readonly jwtService: JwtHelperService,
        private readonly bcryptService: BcryptService,
        private readonly studentRepo: StudentRepository
    ) { }

    async registerDept(body: RegisterDto) {
        //check if already exists using this email
        const isDeptExists = await this.universityDeptRepo.findByEmail(body.email);
        if (isDeptExists) {
            throw new BadRequestException('Dept Already Exists with this Email');
        }

        //hashed password using bcrypt
        body.password = await this.bcryptService.hashPassword(body.password);

        //register Dept in DB
        const RegisteredDept = await this.universityDeptRepo.register(body);

        // generate token for accessing resources
        const token = await this.jwtService.generateJwtToken(RegisteredDept);
        return {
            message: "Registered Dept",
            access_token: token,
            user: {
                name: RegisteredDept.name,
                email: RegisteredDept.email,
                role: RegisteredDept.role,
                uid: RegisteredDept.uuid,
            }
        }
    }

    async loginDept(body: LoginDto) {
        //check if already exists using this email
        const isloginDeptExists = await this.universityDeptRepo.findByEmail(body.email);
        if (!isloginDeptExists) {
            throw new BadRequestException('User not Exists with this Email ');
        }

        const isValid = await this.bcryptService.verifyPassword(body.password, isloginDeptExists.password);

        if (!isValid) {
            throw new BadRequestException('Password not matched');
        }

        const token = await this.jwtService.generateJwtToken(isloginDeptExists);
        return {
            message: "Logged In Dept",
            access_token: token,
            user: {
                name: isloginDeptExists.name,
                email: isloginDeptExists.email,
                role: isloginDeptExists.role,
                uid: isloginDeptExists.uuid,
            }
        }
    }

    async loginStudent(body: LoginStudentDto) {
        const student = await this.studentRepo.findByEmailAndCard(
            body.email,
            body.card_uuid
        );

        if (!student) {
            throw new BadRequestException('Invalid email or card ID');
        }

        const token = await this.jwtService.generateJwtToken(student);

        return {
            message: "Logged In Student",
            access_token: token,
            user: {
                name: student.name,
                email: student.email,
                role: student.role,
                uid: student.uuid,
            }
        };
    }
}