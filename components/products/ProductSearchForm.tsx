"use client";
import { searchFormSchema } from "@/src/schemas";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProductSearchForm() {
  const router = useRouter();
  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };
    const result = searchFormSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    // Redirigir a la pagina de busqueda con el query
    router.push(`/admin/products/search?query=${result.data.search}`);
  };

  return (
    <form action={handleSearchForm} className="flex items-center">
      <input
        type="text"
        placeholder="Buscar Producto"
        className="p-2 bg-white placeholder-gray-400 w-full rounded-l-md focus:outline-none border border-indigo-300 transition-colors duration-200"
        name="search"
      />

      <input
        type="submit"
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer rounded-r-md border border-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
        value={"Buscar"}
      />
    </form>
  );
}
