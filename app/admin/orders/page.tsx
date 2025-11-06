"use client";
import useSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";

export default function OrdersPage() {
  const url = `/admin/orders/api`;
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, isLoading, mutate } = useSWR<OrderWithProducts[]>(
    url,
    fetcher,
    {
      refreshInterval: 60000, // Refrescar cada 60 segundos
      revalidateOnFocus: false, // No es necesario revalidar al enfocar la ventana
    }
  );

  if (isLoading) return <p>Cargando ordenes...</p>;
  if (data)
    return (
      <>
        <Heading>Administrar Ordenes</Heading>

        {data.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {data.map((order) => (
              <OrderCard key={order.id} order={order} mutate={mutate} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay ordenes pendientes</p>
        )}
      </>
    );
}
