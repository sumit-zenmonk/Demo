import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtHelperService } from '../services/jwt.service';
import { StudentRepository } from '../repository/student.repo';

@Injectable()
export class AuthenticateStudentMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtHelpService: JwtHelperService,
        private readonly studentRepo: StudentRepository
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            // fetched token using req
            const token = req.headers.authorization || req.headers.Authorization;
            if (!token || Array.isArray(token)) {
                throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
            }

            //verify token using jwt
            const user = await this.jwtHelpService.verifyJwtToken(token ?? '');
            if (!user) {
                throw new HttpException("invalid token found", HttpStatus.UNAUTHORIZED);
            }

            // check account's presence in DB
            const isExistsAndActiveUser = await this.studentRepo.findByUuid(user.uuid);
            if (!isExistsAndActiveUser) {
                throw new HttpException("account not found", HttpStatus.UNAUTHORIZED);
            }

            req.user = isExistsAndActiveUser
            next();
        } catch (error) {
            console.error("Middleware Error:", error);
            throw error;
        }
    }
}