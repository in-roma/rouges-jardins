import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import {
	getPost,
	getAllSlugsPublications,
	getAllPublications,
} from '../../lib/api';
import { useRouter } from 'next/router';
import parsing from '../../helpers/helpers';

// Components
import Layout from '../../components/layout';
import TagPost from '../../components/microComponents/tagPost';
import DateCard from '../../components/microComponents/dateCard';
import Button from '../../components/microComponents/button';
import CartButton from '../../components/microComponents/cartButton';
import More from '../../components/microComponents/more';

// Context
import { AppContext } from '../../lib/context';

// Layout
import styles from '../../styles/PublicationPage.module.scss';
import arrowLeft from '../../public/arrow-left.svg';

export default function PostPage({ data, posts }) {
	const router = useRouter();
	const { cartLength, cartList, addBook } = useContext(AppContext);
	// console.log('this is datapost', data.post);
	return (
		<>
			<Head>
				<title>{data.post.title}</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=5.0,user-scalable=5"
				/>
				<meta
					name="description"
					content={`${data.post.title} Par Guy Grandjean `}
				/>
				<meta name="robots" />
				<meta name="googlebot" />
			</Head>
			<Layout>
				<article className={styles.containerPublicationPage}>
					<div className={styles.PublicationPage}>
						<div className={styles.navBarPublicationPage}>
							<div
								className={styles.containerBtnPublicationPage}
								onClick={() => router.back()}
							>
								<div className={styles.iconBackPublicationPage}>
									<Image src={arrowLeft} alt="search icon" />
								</div>
								<span className={styles.btnPublicationPage}>
									Retour
								</span>
							</div>
						</div>
						<picture
							className={styles.picturePublicationPage}
							style={{
								display: 'block',
								position: 'relative',
								borderRadius: '6px',
								overflow: 'hidden',
							}}
						>
							<Image
								src={data.post.featuredImage.node.sourceUrl}
								layout="fill"
								objectFit="cover"
								alt=""
							/>
						</picture>

						<div className={styles.actionContainerPublicationPage}>
							<h1 className={styles.titlePublicationPage}>
								{data.post.title}
							</h1>
							<Button
								text="Ajouter au panier"
								className={styles.buttonCardPublicationPage}
								onClick={() =>
									addBook(
										data.post.apiStripePriceID,
										data.post.featuredImage.node.sourceUrl,
										data.post.title,
										data.post.apiStripePrice
									)
								}
								name={data.post.name}
							/>
							<div className={styles.infoPublicationPage}>
								{data.post.categories.nodes[0].name && (
									<div className={styles.tagPublicationPage}>
										{data.post.categories.nodes[0].name}
									</div>
								)}
								<DateCard date={data.post.date} />
							</div>
							<div className={styles.cartContainer}>
								<span className={styles.pricePublicationPage}>
									Prix: {data.post.apiStripePrice} euros
								</span>
								<CartButton
									className={styles.cartButtonPublicationPage}
									products={cartList.reduce(function (
										acc,
										obj
									) {
										return acc + obj.quantity;
									},
									0)}
								/>
							</div>
						</div>

						<div className={styles.subtitlePublicationPage}></div>

						<div className={styles.contentPublicationPage}>
							{parsing(data.post.content)}
						</div>
						<More
							dataMore={posts.posts.edges}
							slug={'/blog'}
							linkText="Voir tout"
							colorCard="Black"
							textColorCard="white"
						/>
					</div>
				</article>
			</Layout>
		</>
	);
}

export async function getStaticPaths() {
	const response = await getAllSlugsPublications();
	const paths = response.posts.edges.map((post) => ({
		params: {
			slug: post.node.slug,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
}

export async function getStaticProps({ params: slug }) {
	const data = await getPost(slug);
	const posts = await getAllPublications();
	return {
		props: {
			data,
			posts,
		},
		revalidate: 5,
	};
}
