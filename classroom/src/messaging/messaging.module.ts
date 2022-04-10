import { Module } from '@nestjs/common';

import { PurchasesController } from './controllers/purchases.controller';

import { DatabaseModule } from 'src/database/database.module';

import { CoursesService } from '../services/courses.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { StudentsService } from '../services/students.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchasesController],
  providers: [
    // Services
    CoursesService,
    EnrollmentsService,
    StudentsService,
  ],
})
export class MessagingModule {}
