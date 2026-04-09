import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { SurveyService } from "./survey.service";
import { StudentRoleNum } from "src/domain/enums/university.enum";
import { STUDENTRolesGuard } from "src/infrastructure/guard/student-role/role.guard";
import { STUDENTRoles } from "src/infrastructure/guard/student-role/role.decorator";

@UseGuards(STUDENTRolesGuard)
@STUDENTRoles(StudentRoleNum.STUDENT)
@Controller("/survey")
export class SurveyController {
    constructor(
        private readonly surveyService: SurveyService,
    ) { }

    @Get()
    async getStudentSurveys(@Req() req: Request, @Query('offset') offset: string, @Query('limit') limit: string,) {
        return await this.surveyService.getStudentSurveys(req.user,parseInt(offset) || Number(process.env.page_offset), parseInt(limit) || Number(process.env.page_limit));
    }

}