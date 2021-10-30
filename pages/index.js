import Image from 'next/image';
import { GraphQLClient } from 'graphql-request';
import parsing from '../helpers/helpers';

// Api
import getData from '../pages/api/data';

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
				cardLargeType="cardLargeChroniques"
				colorTag="#F6EEDF"
				title={parsing(chroniques[0].node.title)}
				text={
					chroniques[0].node.excerpt.length > 288
						? parsing(
								chroniques[0].node.excerpt.slice(0, 288) + '...'
						  )
						: parsing(chroniques[0].node.excerpt)
				}
				imageUrl={chroniques[0].node.featuredImage.node.sourceUrl}
				imageAltText={'test'}
				date={chroniques[0].node.date}
				category={chroniques[0].node.categories.nodes[0].name}
				slug={chroniques[0].node.slug}
			/>
			{chroniques.slice(1, 5).map((el) => (
				<CardSmall
					key={'smallCard' + el.node.id}
					title={el.node.title}
					imageUrl={el.node.featuredImage.node.sourceUrl}
					imageAltText={'test'}
					date={el.node.date}
					category={el.node.categories.nodes[0].name}
					slug={el.node.slug}
				/>
			))}
			<SectionBar
				sectionTitle="Podcasts"
				slug={'/podcasts'}
				text="Tous les podcasts"
			/>
			<CardLarge
				cardLargeType="cardLargePodcasts"
				colorTag="#D63447"
				textColor="white"
				title={parsing(podcasts[0].node.title)}
				text={
					podcasts[0].node.excerpt.length > 288
						? parsing(
								podcasts[0].node.excerpt.slice(0, 288) + '...'
						  )
						: parsing(podcasts[0].node.excerpt)
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
					slug={el.node.slug}
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
	const { posts } = await getData();
	return {
		props: { posts },
	};
}
