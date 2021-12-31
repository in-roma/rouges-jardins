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
	// 		"default-src 'self'; style-src 'self'; img-src 'self' https://*.jcou8054.odns.fr https://*.stripe.com; font-src 'self' https://*.fonts.gstatic.com; script-src 'self' 'nonce-plausible' 'unsafe-inline'; connect-src 'self' https://*.checkout.stripe.com  https://*.plausible.io; frame-src https://*.youtube.com https://*.spotify.com https://*.open.spotify.com; object-src 'none', base-uri 'self'",
	// },
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
