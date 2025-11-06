"use client";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="bg-amber-400 w-full lg:w-auto hover:bg-amber-500 text-white text-xl font-bold py-3 px-10 rounded cursor-pointer transition-colors duration-200"
    >
      Regresar a Productos
    </button>
  );
}
