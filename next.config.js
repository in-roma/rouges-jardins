const path = require('path');
const withSass = require('@zeit/next-sass');
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
};
