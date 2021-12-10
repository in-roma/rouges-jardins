import { useState, useContext, useEffect } from 'react';
import parsing from '../helpers/helpers';
import Head from 'next/head';

// Components
import Layout from '../components/layout';
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

	const publications = posts.edges;

	return (
		<>
			<Head>
				<title>Publications</title>

				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
				/>
				<meta name="description" content="Section Publications" />
				<meta name="robots" />
				<meta name="googlebot" />
			</Head>
			<Layout>
				<div className={styles.containerPublications}>
					<section className={styles.navBarPublications}>
						<h1>Publications</h1>
						<CartButton
							products={cartList.reduce(function (acc, obj) {
								return acc + obj.quantity;
							}, 0)}
						/>
					</section>

					<div className={styles.contentPublications}>
						{publications.map((el, index) => (
							<CardPublication
								key={'publication' + el.node.apiStripePriceID}
								type="publications"
								colorTag="#FFD31D"
								textColor="black"
								title={parsing(el.node.title)}
								imageUrl={
									el.node.featuredImage.node.mediaDetails
										.sizes[0].sourceUrl
								}
								altText={el.node.featuredImage.node.altText}
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
		</>
	);
}
export async function getStaticProps() {
	const { posts } = await getAllPublications();
	console.log(posts);
	return {
		props: { posts },
		revalidate: 5,
	};
}
