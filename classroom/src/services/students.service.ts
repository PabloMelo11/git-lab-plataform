import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type CreateStudentParams = {
  authUserId: string;
};

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async getStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async createStudent({ authUserId }: CreateStudentParams) {
    return this.prisma.student.create({
      data: {
        authUserId,
      },
    });
  }

  async listAllStudents() {
    return this.prisma.student.findMany();
  }

  async getStudent(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }
}
