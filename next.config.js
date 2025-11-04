/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // força gerar site estático
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
