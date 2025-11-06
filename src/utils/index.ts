import { ActionState } from "../types";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getImagePath(imagePath: string) {
  const clodinaryBaseUrl = "https://res.cloudinary.com";
  if (imagePath.startsWith(clodinaryBaseUrl)) return imagePath;
  else return `/products/${imagePath}.jpg`;
}

// Funcion generica para derivar el estado inicial de una accion del servidor
// T extiende el tipo de dato que retorna la accion en caso de exito
// Ejemplo: T podria ser { message: string } si la accion retorna ese tipo en caso de exito
// A extiende el tipo de array de argumentos que recibe la accion
// Ejemplo: A podria ser FormData y algun que otro argumento adicional si la accion lo requiere
export function deriveInitialState<T, A extends unknown[]>(
  _action: (...args: A) => Promise<ActionState<T>> // Aplicamos A como tipo de argumentos de la funcion
  // Y retornamos un ActionState con T como tipo de data en caso de exito
) {
  // Finalmente retornamos el estado inicial siempre como 'idle'
  return { status: "idle" } as ActionState<T>; // Hacemos un type assertion para que TypeScript entienda el tipo correcto
}
