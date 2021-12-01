import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

	console.log('this is parsed date:', parsing(data.post.content));
	return (
		<Layout>
			<div className={styles.containerPostPage}>
				<div className={styles.postPage}>
					<div className={styles.navBarPostPage}>
						<div
							className={styles.containerBtnPostPage}
							onClick={() => router.back()}
						>
							<div className={styles.iconBackPostPage}>
								<Image src={arrowLeft} alt="search icon" />
							</div>
							<span className={styles.btnPostPage}>Retour</span>
						</div>
					</div>
					<div
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
							alt=""
						/>
					</div>
					<h1 className={styles.titlePostPage}>{data.post.title}</h1>
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
			</div>
		</Layout>
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
		fallback: true,
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
		revalidate: 180,
	};
}
