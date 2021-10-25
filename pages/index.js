import Image from 'next/image';
import parse, { domToReact } from 'html-react-parser';
import { GraphQLClient } from 'graphql-request';

// Components
import Layout from '../components/Layout';
import SectionBar from '../components/microComponents/sectionBar';
import CardLarge from '../components/microComponents/cardLarge';

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
			/>

			{/* {posts.edges.map((el) => (
				<div key={'div' + el.node.id}>
					<h3 key={'title' + el.node.id}>{el.node.title}</h3>
					<div key={'excerpt' + el.node.id}>
						{parse(el.node.excerpt, options)}
					</div> */}
			{/* <div key={'content' + el.node.id}>
						{parse(el.node.content, options)}
					</div> */}
			{/* <p>{el.node.date}</p>
					{el.node.featuredImage !== null && (
						<img src={`${el.node.featuredImage.node.sourceUrl}`} />
					)}
				</div>
			))} */}
		</Layout>
	);
}
export async function getStaticProps() {
	const graphcms = new GraphQLClient(process.env.CMSWP_URL);

	const { posts } = await graphcms.request(
		`{
			posts( first: 1000 ) {
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
	// console.log('data fetched:', posts.edges);
	return {
		props: { posts },
	};
}
