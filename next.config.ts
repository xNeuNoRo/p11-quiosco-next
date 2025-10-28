import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Configuraciones para optimizar las imagenes servidas por Next.js
  images: {
    // En dispositivos de estos tamaños
    deviceSizes: [480, 768, 1024, 1600, 1920],
    // Se generaran imagenes con estas calidades y formatos
    qualities: [50, 60, 70, 80, 85],
    // Y en estos formatos
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
