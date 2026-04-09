import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { ResponseService } from "./response.service";
import { STUDENTRolesGuard } from "src/infrastructure/guard/student-role/role.guard";
import { STUDENTRoles } from "src/infrastructure/guard/student-role/role.decorator";
import { StudentRoleNum } from "src/domain/enums/university.enum";
import { CreateStudentResponseDto } from "./dto/create.response.dto";

@Controller("/response")
@UseGuards(STUDENTRolesGuard)
@STUDENTRoles(StudentRoleNum.STUDENT)
export class responseController {
    constructor(
        private readonly responseService: ResponseService,
    ) { }

    @Post()
    async createresponse(@Req() req: Request, @Body() body: CreateStudentResponseDto) {
        return await this.responseService.createresponse(req.user, body);
    }

    @Get()
    async getResponses(@Req() req: Request, @Query('offset') offset: string, @Query('limit') limit: string,) {
        return await this.responseService.getResponses(req.user, parseInt(offset) || Number(process.env.page_offset), parseInt(limit) || Number(process.env.page_limit));
    }
}