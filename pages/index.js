import { useState, useContext } from 'react';
import parsing from '../helpers/helpers';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Api
import {
	getChroniquesHome,
	getPodcastsHome,
	getAllPublications,
} from '../lib/api';

// Context
import { AppContext } from '../lib/context';

// Components
import Layout from '../components/layout';
import SectionBar from '../components/microComponents/sectionBar';
import CardLarge from '../components/microComponents/cardLarge';
import CardMedium from '../components/microComponents/cardMedium';
import CardSmall from '../components/microComponents/cardSmall';
import CardSmallVertical from '../components/microComponents/cardSmallVertical';

// Styling
import styles from '../styles/Home.module.scss';

export default function Home({ posts, podcasts, publications }) {
	const router = useRouter();

	// Search states
	const { searchValue, changeSearchValue } = useContext(AppContext);

	//  Search Input
	const handleChangeInput = (event) => {
		event.preventDefault();
		let { value } = event.target;
		changeSearchValue(value);
	};

	const searchSubmit = (event) => {
		event.preventDefault();
		router.replace({
			pathname: 'blog',
			query: {
				keyword: searchValue,
			},
		});
	};

	return (
		<>
			<Head>
				<title>Rouges Jardins</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta
					name="description"
					content="Chroniques sur le monde vivant - Blog par Guy Grandjean"
				/>
				<meta name="robots" />
				<meta name="googlebot" />
			</Head>
			<Layout>
				<div className={styles.contentHome}>
					<SectionBar
						sectionTitle="Chroniques"
						slug={'/blog'}
						text="Toutes les chroniques"
						search="true"
						value={searchValue}
						onChangeInput={handleChangeInput}
						onSubmitSearch={searchSubmit}
					/>

					<CardLarge
						type="blog"
						cardLargeType="cardLargeChroniques"
						colorTag="
				rgba(0, 0, 0, 1)"
						textColor="white"
						title={parsing(posts.edges[0].node.title)}
						text={
							posts.edges[0].node.excerpt.length > 288
								? parsing(
										posts.edges[0].node.excerpt.slice(
											0,
											288
										) + '...'
								  )
								: parsing(posts.edges[0].node.excerpt)
						}
						imageUrl={
							posts.edges[0].node.featuredImage.node.mediaDetails
								.sizes[3].sourceUrl
						}
						// imageUrl={posts.edges[0].node.featuredImage.node.sourceUrl}
						imageAltText={'test'}
						date={posts.edges[0].node.date}
						category={posts.edges[0].node.categories.nodes[0].name}
						slug={posts.edges[0].node.slug}
						altText={posts.edges[0].node.featuredImage.node.altText}
					/>
					{posts.edges.slice(1, 5).map((el) => (
						<CardSmall
							key={'smallCard' + el.node.id}
							title={el.node.title}
							imageUrl={
								el.node.featuredImage.node.mediaDetails.sizes[0]
									.sourceUrl
							}
							imageAltText={'test'}
							date={el.node.date}
							category={el.node.categories.nodes[0].name}
							slug={el.node.slug}
							color="
					rgba(0, 0, 0, 1)"
							textColor="white"
							altText={el.node.featuredImage.node.altText}
						/>
					))}
					<SectionBar
						sectionTitle="Podcasts"
						slug={'/podcasts'}
						text="Tous les podcasts"
					/>
					<CardLarge
						type="podcasts"
						cardLargeType="cardLargePodcasts"
						colorTag="#D63447"
						textColor="white"
						title={parsing(podcasts.posts.edges[0].node.title)}
						text={
							podcasts.posts.edges[0].node.excerpt.length > 288
								? parsing(
										podcasts.posts.edges[0].node.excerpt.slice(
											0,
											288
										) + '...'
								  )
								: parsing(podcasts.posts.edges[0].node.excerpt)
						}
						// imageUrl={
						// 	podcasts.posts.edges[0].node.featuredImage.node
						// 		.sourceUrl
						// }
						imageUrl={
							podcasts.posts.edges[0].node.featuredImage.node
								.sourceUrl
						}
						imageAltText={'test'}
						date={podcasts.posts.edges[0].node.date}
						category={
							podcasts.posts.edges[0].node.categories.nodes[0]
								.name
						}
						slug={podcasts.posts.edges[0].node.slug}
						altText={posts.edges[0].node.featuredImage.node.altText}
					/>
					{podcasts.posts.edges.slice(1, 4).map((el) => (
						<CardMedium
							colorTag="#D63447"
							textColor="white"
							key={'smallCard' + el.node.id}
							title={el.node.title}
							imageUrl={
								el.node.featuredImage.node.mediaDetails.sizes[0]
									.sourceUrl
							}
							imageAltText={'test'}
							date={el.node.date}
							category={el.node.categories.nodes[0].name}
							slug={el.node.slug}
							altText={el.node.featuredImage.node.altText}
						/>
					))}
					<SectionBar
						sectionTitle="Publications"
						slug={'/publications'}
						text="Toutes les publications"
					/>

					{publications.posts.edges.slice(0, 5).map((el) => (
						<CardSmallVertical
							colorTag="#FFD31D"
							key={'smallCard' + el.node.id}
							title={el.node.title}
							imageUrl={
								el.node.featuredImage.node.mediaDetails.sizes[0]
									.sourceUrl
							}
							imageAltText={'test'}
							date={el.node.date}
							category={el.node.categories.nodes[0].name}
							slug={el.node.slug}
							altText={el.node.featuredImage.node.altText}
						/>
					))}
				</div>
			</Layout>
		</>
	);
}
export async function getStaticProps() {
	const { posts } = await getChroniquesHome();
	const podcasts = await getPodcastsHome();
	const publications = await getAllPublications();

	return {
		props: { posts, podcasts, publications },
		revalidate: 5,
	};
}
