import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';

type CreateCourseParams = {
  title: string;
  slug?: string;
};

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async listAllCourses() {
    return this.prisma.course.findMany();
  }

  async getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  async getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: { slug },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true, trim: true }),
  }: CreateCourseParams) {
    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseWithSameSlug) {
      throw new Error('Another course with same slug already exists.');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
