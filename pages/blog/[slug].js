import getData from '../api/data';
import { useRouter } from 'next/router';
import parsing from '../../helpers/helpers';

// Components
import Layout from '../../components/layout';

export default function PostPage({ post }) {
	console.log('this is post', post);
	return (
		<Layout>
			<h1>{post[0].node.title}</h1>
			{/* <img src={post[0].node.featuredImage.node.sourceUrl} /> */}
			<h3>{parsing(post[0].node.excerpt)}</h3>
			<div>{parsing(post[0].node.content)}</div>
		</Layout>
	);
}

export async function getStaticPaths() {
	const response = await getData();

	const paths = response.posts.edges.map((post) => ({
		params: {
			slug: post.node.slug,
		},
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params: slug }) {
	const response = await getData();
	console.log('this is slug:', slug);
	const post = response.posts.edges.filter(
		(post) => post.node.slug === slug.slug
	);

	return { props: { post } };
}
