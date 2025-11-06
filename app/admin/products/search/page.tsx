import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/db";

type SearchPageProps = {
  searchParams: Promise<{ query: string }>;
};

async function searchProducts(query: string) {
  // Lógica de búsqueda de productos en la base de datos
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query, // Búsqueda que contenga el texto
        mode: "insensitive", // Ignorar mayúsculas/minúsculas
      },
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return products;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = await searchParams;
  const products = await searchProducts(query);

  return (
    <>
      <Heading>Resultados de busqueda: {query}</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-end items-center mt-8 gap-4">
        <ProductSearchForm />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center mt-20 text-gray-600 text-lg font-medium">
          No se encontraron productos
        </p>
      )}
    </>
  );
}
