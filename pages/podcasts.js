import parsing from '../helpers/helpers';

// Components
import Layout from '../components/layout';
import CardPodcast from '../components/microComponents/cardPodcast';
import Search from '../components/microComponents/search';

// Styling
import styles from '../styles/Podcasts.module.scss';

// api
import { getAllPodcasts } from '../lib/api';

export default function Podcast({ posts }) {
	const podcasts = posts.edges;
	return (
		<Layout>
			<div className={styles.containerPodcasts}>
				<section className={styles.navBarPodcast}>
					<h1>Podcasts</h1>
					<Search />
				</section>
				<div className={styles.contentPodcasts}>
					{podcasts.map((el) => (
						<CardPodcast
							key={'podcasts' + el.node.id}
							type="podcasts"
							cardLargeType="cardLargePodcasts"
							colorTag="#D63447"
							textColor="white"
							title={
								el.node.title.length > 64
									? parsing(
											el.node.title.slice(0, 64) + '...'
									  )
									: parsing(el.node.title)
							}
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
			</div>
		</Layout>
	);
}
export async function getStaticProps() {
	const { posts } = await getAllPodcasts();

	return {
		props: { posts },
		revalidate: 5,
	};
}
