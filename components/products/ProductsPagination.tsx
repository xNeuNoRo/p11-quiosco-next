import Link from "next/link";

type ProductsPaginationProps = {
  pageNumber: number;
  totalPages: number;
};

export default function ProductsPagination({
  pageNumber,
  totalPages,
}: ProductsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center py-10">
      {pageNumber > 1 && (
        <Link
          href={`/admin/products?page=${pageNumber - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 font-black ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 hover:bg-gray-50"
        >
          &laquo;
        </Link>
      )}
      {pages.map((currentPage) => (
        <Link
          key={currentPage}
          href={`/admin/products?page=${currentPage}`}
          className={`${
            currentPage === pageNumber && "font-black"
          } bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 hover:bg-gray-50`}
        >
          {currentPage}
        </Link>
      ))}
      {totalPages > pageNumber && (
        <Link
          href={`/admin/products?page=${pageNumber + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 font-black ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 hover:bg-gray-50"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
