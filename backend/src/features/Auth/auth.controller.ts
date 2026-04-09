import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { LoginStudentDto } from "./dto/login.student.dto";

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    async registerDept(@Body() body: RegisterDto) {
        return this.authService.registerDept(body);
    }

    @Post('/login')
    async loginDept(@Body() body: LoginDto) {
        return this.authService.loginDept(body);
    }

    @Post('/student/login')
    async loginStudent(@Body() body: LoginStudentDto) {
        return this.authService.loginStudent(body);
    }

}