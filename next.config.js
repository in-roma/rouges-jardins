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
			"frame-ancestors 'self';block-all-mixed-content;default-src 'self';script-src 'self' 'report-sample' https://checkout.stripe.com https://js.stripe.com https://plausible.io;style-src 'self' 'report-sample' 'unsafe-inline' checkout.stripe.com;object-src 'none';frame-src 'self' *.stripe.network *.stripe.com;child-src 'self';img-src 'self' *.jcou8054.odns.fr data: *.stripe.com;font-src 'self' https://fonts.gstatic.com;connect-src 'self' *.stripe.com plausible.io;manifest-src 'self';base-uri 'self';form-action 'self';media-src 'self';prefetch-src 'self';worker-src 'self';",
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
