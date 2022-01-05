import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { getPost, getAllSlugs, getMore } from '../../lib/api';
import { useRouter } from 'next/router';
import parsing from '../../helpers/helpers';

// Context
import { AppContext } from '../../lib/context';

// Components
import Layout from '../../components/layout';
import TagPost from '../../components/microComponents/tagPost';
import DateCard from '../../components/microComponents/dateCard';
import More from '../../components/microComponents/more';

// Layout
import styles from '../../styles/PostPage.module.scss';
import arrowLeft from '../../public/arrow-left.svg';

export default function PostPage({ data, posts }) {
	// Router
	const router = useRouter();

	// Context
	const { postsViewed, changePostsViewed } = useContext(AppContext);

	return (
		<>
			<Head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
				<title>{data.post.title}</title>
				<meta
					name="description"
					content={`Par Guy Grandjean - ${data.post.title} - ${data.post.categories.nodes[0].name}`}
				/>
				<meta property="og:title" content={`${data.post.title}`} />
				<meta property="og:type" content="article" />
				<meta property="article:author" content="Guy Grandjean" />
				<meta
					property="article:published_time"
					content={data.post.date}
				/>
				<meta
					property="og:url"
					content={`https://rouges-jardins.com/blog/${data.post.slug}`}
				/>
				<meta
					property="og:image"
					content={data.post.featuredImage.node.sourceUrl}
				/>
				<meta property="og:site_name" content="Rouges jardins" />
				<meta property="og:locale" content="fr_FR" />
				<meta name="robots" />
				<meta name="googlebot" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=5.0,user-scalable=5"
				/>
			</Head>
			<Layout>
				<article className={styles.containerPostPage}>
					<div className={styles.postPage}>
						<div className={styles.navBarPostPage}>
							<div
								className={styles.containerBtnPostPage}
								onClick={() => router.back()}
							>
								<div className={styles.iconBackPostPage}>
									<Image src={arrowLeft} alt="search icon" />
								</div>
								<span className={styles.btnPostPage}>
									Retour
								</span>
							</div>
						</div>
						<picture
							className={styles.picturePostPage}
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
						<h1 className={styles.titlePostPage}>
							{data.post.title}
						</h1>
						<div className={styles.infoPostPage}>
							{data.post.categories.nodes[0].name && (
								<TagPost
									text={data.post.categories.nodes[0].name}
									color={'black'}
									textColor={'white'}
								/>
							)}
							<DateCard date={data.post.date} />
						</div>
						<div className={styles.contentPostPage}>
							{parsing(data.post.content)}
						</div>
					</div>
					<More
						dataMore={posts.posts.edges}
						slug={'/blog'}
						linkText="Voir tout"
						colorCard="Black"
						textColorCard="white"
					/>
				</article>
			</Layout>
		</>
	);
}

export async function getStaticPaths() {
	const response = await getAllSlugs();
	let paths = response.posts.edges.map((post) => ({
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

	const posts = await getMore(data.post.terms.pageInfo.startCursor);

	return {
		props: {
			data,
			posts,
		},
		revalidate: 15,
	};
}
