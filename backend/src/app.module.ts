import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSource } from './infrastructure/database/data-source';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityDepartmentRepository } from './infrastructure/repository/university-dept.repo';
import { AuthenticateUnniversityDeptMiddleware } from './infrastructure/middleware/authenticate.university.dept.middleware';
import { ConfigModule } from '@nestjs/config';
import { BcryptService } from './infrastructure/services/bcrypt.service';
import { AuthModule } from './features/Auth/auth.module';
import { JwtHelperService } from './infrastructure/services/jwt.service';
import { UniversityDeptModule } from './features/university_dept/university.dept.module';
import { StudentDeptModule } from './features/student/student.module';
import { AuthenticateStudentMiddleware } from './infrastructure/middleware/authenticate.student.middleware';
import { StudentRepository } from './infrastructure/repository/student.repo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      ...dataSource.options,
      retryAttempts: 10,
      retryDelay: 5000
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_REGISTER_SECRET,
      // signOptions: { expiresIn: '60m' },
    }),

    //Modules
    AuthModule,
    UniversityDeptModule,
    StudentDeptModule
  ],
  controllers: [AppController],
  providers: [AppService, BcryptService, UniversityDepartmentRepository, JwtHelperService, StudentRepository],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateUnniversityDeptMiddleware)
      .forRoutes({ path: '/university/*path', method: RequestMethod.ALL });
    consumer
      .apply(AuthenticateStudentMiddleware)
      .forRoutes({ path: '/student/*path', method: RequestMethod.ALL });
  }
}