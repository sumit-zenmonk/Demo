import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ResponseModule } from "./response/response.module";
import { SurveyModule } from "./survey/survey.module";

@Module({
    imports: [
        ResponseModule,
        SurveyModule,
        RouterModule.register([
            {
                path: 'student',
                children: [
                    { path: '/', module: ResponseModule },
                    { path: '/', module: SurveyModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [StudentDeptModule],
})

export class StudentDeptModule { }