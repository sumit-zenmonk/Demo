import { Module } from "@nestjs/common";
import { ResponseController } from "./response.controller";
import { ResponseService } from "./response.service";
import { StudentResponseRepository } from "src/infrastructure/repository/student.response.repo";

@Module({
    imports: [],
    controllers: [ResponseController],
    providers: [ResponseService, StudentResponseRepository],
    exports: [ResponseModule],
})

export class ResponseModule { }