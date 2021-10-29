import { request, gql } from 'graphql-request';

export default async function getData(req, res) {
	const endPoint = process.env.CMSWP_URL;
	const query = gql`
		{
			posts(first: 1000) {
				edges {
					node {
						id
						title
						excerpt
						date
						slug
						content
						featuredImage {
							node {
								altText
								sourceUrl
							}
						}
						categories {
							nodes {
								name
							}
						}
					}
				}
			}
		}
	`;
	try {
		const data = await request(endPoint, query);
		// console.log(JSON.stringify(data, undefined, 2));
		return data;
	} catch (error) {
		console.error(JSON.stringify(error, undefined, 2));
		process.exit(1);
	}
}
