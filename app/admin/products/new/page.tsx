import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";

export default function CreateProductPage() {
  return (
    <>
      <Heading>Nuevo Producto</Heading>
      <AddProductForm>
        {/* Composicion => Componente de cliente envolviendo a uno de servidor mediante children */}
        <ProductForm /> {/* Componente de servidor */}
      </AddProductForm>
      {/* De esa forma, se reserva el componente del servidor mediante children para ejecutarlo debidamente  */}
    </>
  );
}
