import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center mt-40">
      <Heading>Producto no encontrado</Heading>
      <Link
        href={"/admin/products"}
        className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto hover:bg-amber-500 rounded mt-5 transition-colors duration-200"
      >
        Ir a Productos
      </Link>
    </div>
  );
}
