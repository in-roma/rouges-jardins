import Image from 'next/image';
import parse, { domToReact } from 'html-react-parser';
import { GraphQLClient } from 'graphql-request';

// Components
import Layout from '../components/Layout';
import SectionBar from '../components/microComponents/sectionBar';
import CardLarge from '../components/microComponents/cardLarge';
import CardSmall from '../components/microComponents/cardSmall';

// Styling
import styles from '../styles/Home.module.scss';

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
			<SectionBar
				sectionTitle="Chroniques"
				slug={'/blog'}
				text="Toutes les chroniques"
			/>
			<CardLarge
				title={parse(posts.edges[0].node.title)}
				text={
					posts.edges[0].node.excerpt.length > 288
						? parse(
								posts.edges[0].node.excerpt.slice(0, 288) +
									'...'
						  )
						: parse(posts.edges[0].node.excerpt)
				}
				imageUrl={posts.edges[0].node.featuredImage.node.sourceUrl}
				imageAltText={'test'}
				date={posts.edges[0].node.date}
				category={posts.edges[0].node.categories.nodes[0].name}
			/>
			{posts.edges.slice(1, 5).map((el) => (
				<CardSmall
					key={'smallCard' + el.node.id}
					title={el.node.title}
					imageUrl={el.node.featuredImage.node.sourceUrl}
					imageAltText={'test'}
					date={el.node.date}
					category={el.node.categories.nodes[0].name}
				/>
			))}
			<SectionBar
				sectionTitle="Podcasts"
				slug={'/podcasts'}
				text="Toutes les podcasts"
			/>
		</Layout>
	);
}
export async function getStaticProps() {
	const graphcms = new GraphQLClient(process.env.CMSWP_URL);

	const { posts } = await graphcms.request(
		`{
			posts(first: 1000) {
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
										categories {
									nodes {
									  name
									}
								  }
				  }
				}
			  }
	  }`
	);
	// console.log('data fetched:', posts.edges);
	return {
		props: { posts },
	};
}
