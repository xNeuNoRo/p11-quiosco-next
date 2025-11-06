import { redirect } from "next/navigation";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/db";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

type ProductsPageProps = {
  searchParams: Promise<{ page: string | undefined }>;
};

async function getTotalProductsCount() {
  return await prisma.product.count();
}

async function getProducts(pageSize: number, skip: number) {
  const products = await prisma.product.findMany({
    take: pageSize,
    skip: skip,
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

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { page } = await searchParams;

  // Logica de paginacion
  const pageNumber = page ? +page : 1;
  const pageSize = 10;
  const skip = (pageNumber - 1) * pageSize;

  // Redireccionar si el numero de pagina es negativo
  if (pageNumber < 1) redirect(`/admin/products`);

  // Obtener productos
  const productsData = getProducts(pageSize, skip);

  // Contar total de productos
  const totalProductsCountData = getTotalProductsCount();

  // Esperar a que ambas promesas se resuelvan
  // No es necesario await por separado ya que las consultas no dependen una de la otra
  const [products, totalProductsCount] = await Promise.all([
    productsData,
    totalProductsCountData,
  ]);
  const totalPages = Math.ceil(totalProductsCount / pageSize);

  // Si el numero de pagina es mayor al total de paginas, redirigir al inicio.
  if (pageNumber > totalPages) redirect("/admin/products");

  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between items-center mt-8 gap-4">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-400 w-full lg:w-auto hover:bg-amber-500 text-white text-xl font-bold py-3 px-10 rounded cursor-pointer transition-colors duration-200"
        >
          Crear Producto
        </Link>
        <ProductSearchForm />
      </div>
      <ProductTable products={products} />
      <ProductsPagination pageNumber={pageNumber} totalPages={totalPages} />
    </>
  );
}
