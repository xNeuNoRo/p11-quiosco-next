import ProductCard from "@/components/products/ProductCard";
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
      <h1 className="text-2xl my-10 font-bold">
        Elige y personaliza tu pedido a continuacion:
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
