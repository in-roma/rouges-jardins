import { useState, useContext, useEffect } from 'react';
import parsing from '../helpers/helpers';

// Components
import Layout from '../components/Layout';
import CardPublication from '../components/microComponents/cardPublication';
import CartButton from '../components/microComponents/cartButton';

// Styling
import styles from '../styles/Publications.module.scss';

// Context
import { AppContext } from '../lib/context';

// api
import { getAllPublications } from '../lib/api';

export default function Publications({ posts }) {
	// Context states
	const { cartLength, cartList, addBook } = useContext(AppContext);
	console.log('this is cartLength', cartLength);

	const publications = posts.edges;

	console.log('this is CartLength:', cartLength);
	console.log('this is CartList:', cartList);
	return (
		<Layout>
			<div className={styles.containerPublications}>
				<div className={styles.navBarPublications}>
					<h1>Publications</h1>
					<CartButton
						products={cartList.reduce(function (acc, obj) {
							return acc + obj.quantity;
						}, 0)}
					/>
				</div>

				<div className={styles.contentPublications}>
					{publications.map((el, index) => (
						<CardPublication
							key={'publication' + el.node.apiStripePriceID}
							type="publications"
							colorTag="#FFD31D"
							textColor="black"
							title={parsing(el.node.title)}
							imageUrl={el.node.featuredImage.node.sourceUrl}
							imageAltText={'test'}
							date={el.node.date}
							category={el.node.categories.nodes[0].name}
							slug={el.node.slug}
							name={el.node.apiStripeID}
							price={el.node.apiStripePrice}
							addBook={() =>
								addBook(
									el.node.apiStripePriceID,
									el.node.featuredImage.node.sourceUrl,
									el.node.title,
									el.node.apiStripePrice
								)
							}
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
