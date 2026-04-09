import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { SurveyService } from "./survey.service";
import { UniversityDepartmentRoleEnum } from "src/domain/enums/university.enum";
import { CreateSurveyDto } from "./dto/create.survey.dto";
import { CreateSurveyQuestionDto } from "./dto/create.survey.question.dto";
import { DeptRolesGuard } from "src/infrastructure/guard/dept-role/role.guard";
import { DeptRoles } from "src/infrastructure/guard/dept-role/role.decorator";

@UseGuards(DeptRolesGuard)
@DeptRoles(
    UniversityDepartmentRoleEnum.HOD,
    UniversityDepartmentRoleEnum.TEACHER,
    UniversityDepartmentRoleEnum.ADMINISTRATORS
)
@Controller("/survey")
export class SurveyController {
    constructor(
        private readonly surveyService: SurveyService,
    ) { }

    @Post()
    async createSurvey(@Req() req: Request, @Body() body: CreateSurveyDto) {
        return await this.surveyService.createSurvey(req.user, body);
    }

    @Get()
    async getSurveys(@Query('offset') offset: string, @Query('limit') limit: string,) {
        return await this.surveyService.getSurveys(parseInt(offset) || Number(process.env.page_offset), parseInt(limit) || Number(process.env.page_limit));
    }

    @Delete("/:survey_uuid")
    async deleteSurvey(@Req() req: Request, @Param("survey_uuid") survey_uuid: string) {
        return await this.surveyService.deleteSurvey(req.user, survey_uuid);
    }

    @Post('/question')
    async createQuestion(@Body() body: CreateSurveyQuestionDto) {
        return await this.surveyService.createQuestion(body);
    }

    @Delete("/question/:question_uuid")
    async deleteQuestion(@Req() req: Request, @Param("question_uuid") question_uuid: string) {
        return await this.surveyService.deleteQuestion(question_uuid);
    }
}