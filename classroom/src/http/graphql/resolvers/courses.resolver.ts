import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';

import { CoursesService } from '../../../services/courses.service';

import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesService: CoursesService) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async courses() {
    return await this.coursesService.listAllCourses();
  }
}
