import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { completeOrder } from "@/actions/complete-order-action";

type OrderCardProps = {
  order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
  // Esto es solo de ejemplo, lo recomendado seria manejarlo como un action aparte para no tener que refactorizar este componente
  // Ya que, si en algun momento se quisiera hacer un componente del cliente, este codigo no tendria sentido aqui
  //   async function completeOrder(formData: FormData) {
  //     // Aunque sea un componente del servidor usando actions debe usarse la directiva 'use server' para funciones que manejen formularios
  //     // Si fuera del cliente deberia ser un archivo aparte con el formulario para hacerlo componente del server y poder usar la accion
  //     "use server";

  //     console.log("desde completeOrder");
  //   }

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
    >
      <p className="text-2xl font-medium text-gray-900">
        Cliente: {order.name}
      </p>
      <p className="text-lg font-medium text-gray-900">Productos Ordenados:</p>
      <dl className="mt-6 space-y-4">
        {order.orderProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-2 border-t border-gray-200 pt-4"
          >
            <dt className="flex items-center text-sm text-gray-600">
              <span className="font-black">
                ({product.quantity}) {""}
              </span>
            </dt>
            <dd className="text-sm font-medium text-gray-900">
              {product.product.name}
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            Total a Pagar:
          </dt>
          <dd className="text-base font-medium text-gray-900">
            {formatCurrency(order.total)}
          </dd>
        </div>
      </dl>

      <form action={completeOrder}>
        {/* input oculto para enviar el id de la orden al action */}
        <input type="hidden" value={order.id} name="order_id" />
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Marcar Orden Completada"
        />
      </form>
    </section>
  );
}
