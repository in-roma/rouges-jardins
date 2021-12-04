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

export async function getChroniquesHome() {
	const data = await fetchAPI(`
		{
			posts(first: 5, where: {categoryNotIn: [1,2,8,9]}) {
				edges {
					node {
						id
						title
						excerpt
						date
						slug
						featuredImage {
							node {
								altText
								sourceUrl
								mediaDetails {
								  sizes {
									sourceUrl
								  }
								}
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

export async function getPodcastsHome() {
	const data = await fetchAPI(`
		{
			posts(first: 5, where: {categoryId: 8}) {
				edges {
				  node {
					id
					title
					date
					slug
					excerpt
					featuredImage {
						node {
							altText
							sourceUrl
							mediaDetails {
							  sizes {
								sourceUrl
							  }
							}
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
			posts(first: 1000) {
				edges {
					node {
						slug
						slugImportCustom
					}
				}
			}
		}
	`);
	return data;
}

export async function getAllSlugsPodcasts() {
	const data = await fetchAPI(`
		{
			posts(where: {categoryId: 8},first: 70) {
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

export async function getAllSlugsPublications() {
	const data = await fetchAPI(`
		{
			posts(where: {categoryId: 9},first: 70) {
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

export async function getAllCategories() {
	const data = await fetchAPI(`
		{
			categories(where: {hideEmpty: true, exclude: ["1", "2", "8","9"]}) {
				nodes {
				  name
				  categoryId
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
			slugImportCustom
			slug
			content
			featuredImage {
				node {
					altText
					sourceUrl
					mediaDetails {
					  sizes {
						sourceUrl
					  }
					}
				  }
			}
			categories {
				nodes {
					name
				}
			}
			terms {
				pageInfo {
				  startCursor
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

export async function getAllChroniques(volume, category, search) {
	const data = await fetchAPI(
		`
		query MyQuery($first: Int, $categoryIn: [ID], $search: String = "") {
			posts(first: $first, where: {categoryIn: $categoryIn, search: $search}) {
			  edges {
			  node {
				id
				title
				date
				slug
				featuredImage {
					node {
						altText
						sourceUrl
						mediaDetails {
						  sizes {
							sourceUrl
						  }
						}
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
}`,
		{
			variables: {
				first: volume,
				categoryIn: category,
				search: search,
			},
		}
	);
	return data;
}

export async function getAllPodcasts() {
	const data = await fetchAPI(`
		{
			posts(where: {categoryId: 8}) {
				edges {
				  node {
					id
					title
					date
					slug
					featuredImage {
						node {
							altText
							sourceUrl
							mediaDetails {
							  sizes {
								sourceUrl
							  }
							}
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

export async function getAllPublications() {
	const data = await fetchAPI(`
		{
			posts(where: {categoryId: 9}) {
				edges {
				  node {
					id
					title
					date
					slug
					apiStripeID
					apiStripePrice
					apiStripePriceID
					featuredImage {
						node {
							altText
							sourceUrl
							mediaDetails {
							  sizes {
								sourceUrl
							  }
							}
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

export async function getMore(postId) {
	const data = await fetchAPI(
		`
		query PostsByDate($after: String) {
			posts(after: $after, first: 6, where: {categoryNotIn: [1,2,3,4,5,8,9,10]}) {
			  edges {

				node {
				  id
				  title
				  date
				  slug
				  featuredImage {
					node {
						altText
						sourceUrl
						mediaDetails {
						  sizes {
							sourceUrl
						  }
						}
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
		  

		`,
		{
			variables: {
				after: postId,
			},
		}
	);
	return data;
}
