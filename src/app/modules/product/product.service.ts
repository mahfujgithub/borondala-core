import { Prisma, PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

const insertIntoDB = async (
  productData: Prisma.ProductCreateInput,
): Promise<Product> => {
  const result = await prisma.product.create({
    data: productData,
  });

  return result;
};

export const ProductService = {
  insertIntoDB,
};
