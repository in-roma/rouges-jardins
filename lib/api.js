const endPoint = process.env.CMSWP_URL;

async function fetchAPI(query, { variables } = {}) {
	const headers = { 'Content-Type': 'application/json' };

	const res = await fetch(endPoint, {
		method: 'POST',
		headers,
		body: JSON.stringify({ query, variables }),
	});

	const json = await res.json();
	if (json.errors) {
		console.log(json.errors);
		console.log('error details', query, variables);
		throw new Error('Failed to fetch API');
	}
	return json.data;
}

export async function getAllPosts() {
	const data = await fetchAPI(`
		{
			posts(first: 30) {
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
	`);
	return data;
}

export async function getAllSlugs() {
	const data = await fetchAPI(`
		{
			posts(first: 30) {
				edges {
					node {
						slug
					}
				}
			}
		}
	`);
	return data;
}

export async function getPost(slug) {
	const data = await fetchAPI(
		`
		fragment PostFields on Post {
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

		query PostBySlug($id: ID!, $idType: PostIdType!) {
			post(id: $id, idType: $idType) {
			  ...PostFields
			}
		  }
		`,
		{
			variables: {
				id: slug.slug,
				idType: 'SLUG',
			},
		}
	);

	return data;
}