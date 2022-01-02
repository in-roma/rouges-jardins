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
			"frame-ancestors 'self';block-all-mixed-content;default-src 'self';script-src 'self' 'report-sample' https://checkout.stripe.com https://js.stripe.com https://plausible.io;style-src 'self' 'report-sample' 'unsafe-inline' checkout.stripe.com fonts.googleapis.com;object-src 'none';frame-src 'self' *.stripe.network *.stripe.com;child-src 'self';img-src 'self' data: *.stripe.com fonts.gstatic.com;font-src 'self' fonts.googleapis.com fonts.gstatic.com;connect-src 'self' *.stripe.com fonts.googleapis.com fonts.gstatic.com plausible.io;manifest-src 'self';base-uri 'self';form-action 'self';media-src 'self';prefetch-src 'self';worker-src 'self';report-uri https://gate.rapidsec.net/g/r/csp/89b487cf-0948-4e3a-b850-1bcae687c77f/-1/1/3?sdkv=-1.-1.-1_unknown&sct=d6038784-8f22-4e32-85b8-94727502c7a2&dpos=report;",
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
