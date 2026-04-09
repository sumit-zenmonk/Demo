import { faker } from '@faker-js/faker';
import { dataSource } from './data-source';
import { StudentRoleNum } from 'src/domain/enums/university.enum';
import { StudentEntity } from 'src/domain/entities/student/student.entity';
import { UniversityDepartmentEntity } from 'src/domain/entities/university_dept/university-dept.entity';
import { BcryptService } from '../services/bcrypt.service';

async function seedDepartments() {
    const bcryptService = new BcryptService();
    const hashedPassword = await bcryptService.hashPassword("123");

    const departments = Array.from({ length: 5 }).map(() => ({
        email: faker.internet.email(),
        password: hashedPassword,
        name: faker.company.name(),
    }));
    await dataSource.manager.save(UniversityDepartmentEntity, departments);
    console.info('✅ Departments seeded');
}

async function seedStudents() {
    const students = Array.from({ length: 5 }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        card_uuid: faker.string.uuid(),
        program: faker.helpers.arrayElement(['Mtech', 'Btech', 'Bca']),
        role: StudentRoleNum.STUDENT,
    }));
    console.log(students);
    await dataSource.manager.save(StudentEntity, students);
    console.info('✅ Students seeded');
}

async function run() {
    await dataSource.initialize();
    const type = process.argv[2];

    try {
        if (type === 'student') await seedStudents();
        else if (type === 'dept') await seedDepartments();
        else {
            await seedDepartments();
            await seedStudents();
        }
    } catch (error) {
        console.error('❌ Seed failed:', error);
    } finally {
        await dataSource.destroy();
    }
}

void run();
