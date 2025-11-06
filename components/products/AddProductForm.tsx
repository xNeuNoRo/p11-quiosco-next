"use client";
import { createProduct } from "@/actions/create-product-action";
import { productFormSchema } from "@/src/schemas";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };
    // Validar los datos en el cliente antes de enviarlos al servidor
    const result = productFormSchema.safeParse(data);
    if (!result.success) {
      // Mostrar errores
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    // Enviar los datos al servidor
    const response = await createProduct(result.data);

    // Manejar errores del servidor
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    toast.success("Producto creado correctamente");
    // Redirigir a la lista de productos
    router.push("/admin/products");
  };
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form className="space-y-5" action={handleSubmit}>
        {children}

        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-md cursor-pointer transition-colors duration-200"
          value="Registrar Producto"
        />
      </form>
    </div>
  );
}
