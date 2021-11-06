import parsing from '../helpers/helpers';

// Components
import Layout from '../components/Layout';
import CardPodcast from '../components/microComponents/cardPodcast';

// Styling
import styles from '../styles/Podcasts.module.scss';

// api
import { getAllPodcasts } from '../lib/api';

export default function Podcast({ posts }) {
	const podcasts = posts.edges;
	return (
		<Layout>
			<div className={styles.containerPodcasts}>
				<div className={styles.contentPodcasts}>
					{podcasts.map((el) => (
						<CardPodcast
							type="podcasts"
							cardLargeType="cardLargePodcasts"
							colorTag="#D63447"
							textColor="white"
							title={parsing(el.node.title)}
							text={
								el.node.excerpt.length > 288
									? parsing(
											el.node.excerpt.slice(0, 288) +
												'...'
									  )
									: parsing(el.node.excerpt)
							}
							imageUrl={el.node.featuredImage.node.sourceUrl}
							imageAltText={'test'}
							date={el.node.date}
							category={el.node.categories.nodes[0].name}
							slug={el.node.slug}
						/>
					))}
				</div>
			</div>
		</Layout>
	);
}
export async function getStaticProps() {
	const { posts } = await getAllPodcasts();
	console.log(posts);
	return {
		props: { posts },
	};
}
