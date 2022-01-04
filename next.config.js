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
			"frame-ancestors 'self';block-all-mixed-content;default-src 'self';script-src 'self' 'report-sample' http://*.stripe.com http://*.plausible.io ;style-src 'self' 'report-sample' 'unsafe-inline' checkout.stripe.com fonts.googleapis.com;object-src 'none';frame-src 'self' http://*.stripe.network http://*.stripe.com ;child-src 'self';img-src 'self' data: http://*.stripe.com fonts.gstatic.com;font-src 'self' fonts.googleapis.com fonts.gstatic.com;connect-src 'self' http://*.stripe.com fonts.googleapis.com fonts.gstatic.com http://*.plausible.io ;manifest-src 'self';base-uri 'self';form-action 'self';media-src 'self';prefetch-src 'self';worker-src 'self';",
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
