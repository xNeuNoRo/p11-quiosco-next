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
