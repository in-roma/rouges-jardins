import Image from 'next/image';
import parse, { domToReact } from 'html-react-parser';
import { GraphQLClient } from 'graphql-request';

// Components
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
	// Options to format html tags from wordpress
	const options = {
		replace: ({ attribs, children }) => {
			if (!attribs) {
				return;
			}
			if (
				attribs.class &&
				attribs.class.includes('sqs-image-shape-container-element')
			) {
				return (
					<div style={{ padding: 0 }}>
						{domToReact(children, options)}
					</div>
				);
			}
		},
	};
	return (
		<Layout>
			{posts.edges.map((el) => (
				<div key={'div' + el.node.id}>
					<h3 key={'title' + el.node.id}>{el.node.title}</h3>
					<div key={'excerpt' + el.node.id}>
						{parse(el.node.excerpt, options)}
					</div>
					{/* <div key={'content' + el.node.id}>
						{parse(el.node.content, options)}
					</div> */}

					{el.node.featuredImage !== null && (
						<img src={`${el.node.featuredImage.node.sourceUrl}`} />
					)}
				</div>
			))}
		</Layout>
	);
}
export async function getStaticProps() {
	const graphcms = new GraphQLClient(process.env.CMSWP_URL);

	const { posts } = await graphcms.request(
		`{
			posts {
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
					  }
					}
				  }
				}
			  }
			
	  }`
	);
	console.log('data fetched:', posts.edges);
	return {
		props: { posts },
	};
}
