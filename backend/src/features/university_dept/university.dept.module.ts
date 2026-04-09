import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { SurveyModule } from "./survey/survey.module";
import { ResponseModule } from "./response/response.module";

@Module({
    imports: [
        SurveyModule,
        ResponseModule,
        RouterModule.register([
            {
                path: 'university',
                children: [
                    { path: '/', module: SurveyModule },
                    { path: '/', module: ResponseModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [UniversityDeptModule],
})

export class UniversityDeptModule { }