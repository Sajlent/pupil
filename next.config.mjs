/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@import "src/app/styles/_variables.scss";`,
  },
};

export default nextConfig;
