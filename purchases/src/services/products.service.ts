import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import slugify from 'slugify';

type CreateProductsParams = {
  title: string;
};

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async listAllProducts() {
    return this.prisma.product.findMany();
  }

  async createProduct({ title }: CreateProductsParams) {
    const slug = slugify(title, { lower: true, trim: true });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new Error('Another product with same slug already exists.');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
