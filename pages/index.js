import Image from 'next/image';
import parse, { domToReact } from 'html-react-parser';
import { GraphQLClient } from 'graphql-request';

// Components
import Layout from '../components/Layout';
import SectionBar from '../components/microComponents/sectionBar';
import CardLarge from '../components/microComponents/cardLarge';
import CardMedium from '../components/microComponents/cardMedium';
import CardSmall from '../components/microComponents/cardSmall';
import CardSmallVertical from '../components/microComponents/cardSmallVertical';

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

	const chroniques = posts.edges.filter(
		(el) =>
			el.node.categories.nodes[0].name !== 'Podcast' &&
			el.node.categories.nodes[0].name !== 'Publication'
	);

	const podcasts = posts.edges.filter(
		(el) => el.node.categories.nodes[0].name === 'Podcast'
	);

	const publications = posts.edges.filter(
		(el) => el.node.categories.nodes[0].name === 'Publication'
	);

	return (
		<Layout>
			<SectionBar
				sectionTitle="Chroniques"
				slug={'/blog'}
				text="Toutes les chroniques"
			/>
			<CardLarge
				grid={{ gridRow: '2/4' }}
				colorTag="#F6EEDF"
				title={parse(chroniques[0].node.title)}
				text={
					chroniques[0].node.excerpt.length > 288
						? parse(
								chroniques[0].node.excerpt.slice(0, 288) + '...'
						  )
						: parse(chroniques[0].node.excerpt)
				}
				imageUrl={chroniques[0].node.featuredImage.node.sourceUrl}
				imageAltText={'test'}
				date={chroniques[0].node.date}
				category={chroniques[0].node.categories.nodes[0].name}
			/>
			{chroniques.slice(1, 5).map((el) => (
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
				text="Tous les podcasts"
			/>
			<CardLarge
				grid={{ gridRow: '5/8' }}
				colorTag="#D63447"
				textColor="white"
				title={parse(podcasts[0].node.title)}
				text={
					podcasts[0].node.excerpt.length > 288
						? parse(podcasts[0].node.excerpt.slice(0, 288) + '...')
						: parse(podcasts[0].node.excerpt)
				}
				imageUrl={podcasts[0].node.featuredImage.node.sourceUrl}
				imageAltText={'test'}
				date={podcasts[0].node.date}
				category={podcasts[0].node.categories.nodes[0].name}
			/>
			{podcasts.slice(1, 4).map((el) => (
				<CardMedium
					colorTag="#D63447"
					textColor="white"
					key={'smallCard' + el.node.id}
					title={el.node.title}
					imageUrl={el.node.featuredImage.node.sourceUrl}
					imageAltText={'test'}
					date={el.node.date}
					category={el.node.categories.nodes[0].name}
				/>
			))}
			<SectionBar
				sectionTitle="Publications"
				slug={'/publications'}
				text="Toutes les publications"
			/>

			{publications.slice(0, 5).map((el) => (
				<CardSmallVertical
					colorTag="#FFD31D"
					key={'smallCard' + el.node.id}
					title={el.node.title}
					imageUrl={el.node.featuredImage.node.sourceUrl}
					imageAltText={'test'}
					date={el.node.date}
					category={el.node.categories.nodes[0].name}
				/>
			))}
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
