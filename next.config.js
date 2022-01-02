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
	{
		key: 'Content-Security-Policy',
		value:
			"default-src 'self'; script-src 'report-sample' 'self' https://js.stripe.com/v3 'nonce-plausible'; style-src 'report-sample' 'self'; object-src 'none'; base-uri 'self'; connect-src 'self' 'nonce-plausible'; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://js.stripe.com https://open.spotify.com; img-src 'self' data:; manifest-src 'self'; media-src 'self'; report-uri https://61d18c08adaa4253cc595a4b.endpoint.csper.io/?v=0; worker-src 'none';",
	},
];

module.exports = withSass({
	cssModules: true,
});
module.exports = {
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
