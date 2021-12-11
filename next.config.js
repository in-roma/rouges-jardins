const path = require('path');
const withSass = require('@zeit/next-sass');

const securityHeaders = [
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'X-Frame-Options',
		value: 'sameorigin',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'Referrer-Policy',
		value: 'same-origin',
	},
	{
		key: 'Permissions-Policy',
		value: 'geolocation=*',
	},
	// {
	// 	key: 'Content-Security-Policy',
	// 	value:
	// 		"default-src 'self'; style-src 'self' fonts.googleapis.com; img-src 'self' jcou8054.odns.fr *.jcou8054.odns.fr; font-src 'self' fonts.gstatic.com *.fonts.gstatic.com",
	// },
];

module.exports = withSass({
	cssModules: true,
});
module.exports = {
	reactStrictMode: true,
	env: {
		RAYGUN_API_KEY: 'OUP2nDfz1ksV9wTJgEQ7Q',
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['www.jcou8054.odns.fr'],
	},

	async redirects() {
		return [
			{
				source: '/blog/:year/:month/:day/:post',
				destination: '/blog/:year-:month-:day-:post',
				permanent: true,
			},
		];
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: securityHeaders,
			},
		];
	},
};
