/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'eu-north-1.console.aws.amazon.com',
            port: '',
            pathname: '/s3/buckets/direct-upload-booksweeper-bucket',
        }]
    }
};

export default nextConfig;
