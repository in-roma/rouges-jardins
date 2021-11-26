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
		domains: ['jcou8054.odns.fr'],
	},
};
