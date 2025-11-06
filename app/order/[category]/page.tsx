import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/db";

type OrderPageProps = {
  params: Promise<{ category: string }>;
};

async function getProductsByCategory(category: string) {
  return await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { category } = await params;
  const products = await getProductsByCategory(category);
  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuacion:</Heading>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
