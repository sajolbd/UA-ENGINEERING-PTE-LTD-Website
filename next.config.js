/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', port: '' },
      { protocol: 'https', hostname: 'drive.google.com', port: '' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', port: '' },
      { protocol: 'https', hostname: 'res.cloudinary.com', port: '' },
      { protocol: 'https', hostname: 'bayshore.nyc3.digitaloceanspaces.com' },
      { protocol: 'https', hostname: 'api.uaengineering.com.sg', port: '' },
      { protocol: 'https', hostname: 'www.uaengineering.com.sg', port: '' },
      { protocol: 'https', hostname: 'uaengineering.com.sg', port: '' },
      { protocol: 'https', hostname: 'dashboard.uaengineering.com.sg', port: '' },
    ],
  },
  skipTrailingSlashRedirect: true,
  async headers() {
    return [
      {
        source: '/Sabbir-Nasir-Transformation-Framework.pdf',
        headers: [
          { key: 'Content-Type', value: 'application/pdf' },
          { key: 'Content-Disposition', value: 'attachment; filename="Sabbir-Nasir-Transformation-Framework.pdf"' },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=UTF-8' },
          { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400' },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
