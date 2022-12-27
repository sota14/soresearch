/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: ['www.notion.so','images.unsplash.com','instagram.fkix2-1.fna.fbcdn.net','s3.us-west-2.amazonaws.com'],
  },
  
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',//
        },
      },
    ],
}

module.exports = nextConfig
