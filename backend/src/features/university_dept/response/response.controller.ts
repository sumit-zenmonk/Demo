import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { ResponseService } from "./response.service";
import { UniversityDepartmentRoleEnum } from "src/domain/enums/university.enum";
import { DeptRolesGuard } from "src/infrastructure/guard/dept-role/role.guard";
import { DeptRoles } from "src/infrastructure/guard/dept-role/role.decorator";

@UseGuards(DeptRolesGuard)
@DeptRoles(
    UniversityDepartmentRoleEnum.HOD,
    UniversityDepartmentRoleEnum.TEACHER,
    UniversityDepartmentRoleEnum.ADMINISTRATORS
)
@Controller("/response")
export class ResponseController {
    constructor(
        private readonly responseService: ResponseService,
    ) { }

    @Get()
    async getStudentResponses(@Query('offset') offset: string, @Query('limit') limit: string,) {
        return await this.responseService.getStudentResponses(parseInt(offset) || Number(process.env.page_offset), parseInt(limit) || Number(process.env.page_limit));
    }

}