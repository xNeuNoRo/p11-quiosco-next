import { prisma } from "@/lib/db";
import { categories } from "./data/categories";
import { products } from "./data/products";

async function main() {
  try {
    // Seed Test Categories
    await prisma.category.createMany({
      data: categories,
    });
    // Seed Test Products
    await prisma.product.createMany({
      data: products,
    });
  } catch (err) {
    console.log(err);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
