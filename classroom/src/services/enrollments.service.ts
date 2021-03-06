import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type GetByCourseAndStudentId = {
  courseId: string;
  studentId: string;
};

type CreateEnrollmentParams = {
  studentId: string;
  courseId: string;
};

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getEnrollmentsByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getByCourseAndStudentId({
    courseId,
    studentId,
  }: GetByCourseAndStudentId) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  async createEnrollment({ courseId, studentId }: CreateEnrollmentParams) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });
  }
}
