import parsing from '../helpers/helpers';

// Components
import Layout from '../components/Layout';
import CardPublication from '../components/microComponents/cardPublication';
import CartButton from '../components/microComponents/cartButton';

// Styling
import styles from '../styles/Publications.module.scss';

// api
import { getAllPublications } from '../lib/api';

export default function Publications({ posts }) {
	const publications = posts.edges;
	return (
		<Layout>
			<div className={styles.containerPublications}>
				<div className={styles.navBarPublications}>
					<CartButton />
				</div>
				<div className={styles.contentPublications}>
					{publications.map((el) => (
						<CardPublication
							key={'publication' + el.node.id}
							type="publications"
							colorTag="#FFD31D"
							textColor="black"
							title={parsing(el.node.title)}
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
	const { posts } = await getAllPublications();
	console.log(posts);
	return {
		props: { posts },
	};
}
