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
				<div className={styles.navBarPodcast}>
					<h1>Podcasts</h1>
					<Search />
				</div>
				{/* {searchActive && (
					<div className={styles.searchBarBlog}>
						<h2>
							{`${chroniques.length} résultat${
								chroniques.length > 1 ? 's' : ''
							} pour  "${valueSearchActive}" `}
						</h2>
						<button onClick={resetSearch}>
							Annuler la recherche
						</button>
					</div>
				)} */}
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
							// text={
							// 	el.node.excerpt.length > 128
							// 		? parsing(
							// 				el.node.excerpt.slice(0, 128) +
							// 					'...'
							// 		  )
							// 		: parsing(el.node.excerpt)
							// }
							imageUrl={
								el.node.featuredImage.node.mediaDetails.sizes[0]
									.sourceUrl
							}
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

	return {
		props: { posts },
	};
}
