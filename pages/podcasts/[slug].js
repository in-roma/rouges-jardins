import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { getPost, getAllSlugsPodcasts, getAllPodcasts } from '../../lib/api';
import { useRouter } from 'next/router';
import parsing from '../../helpers/helpers';

// Components
import Layout from '../../components/layout';
import TagPost from '../../components/microComponents/tagPost';
import DateCard from '../../components/microComponents/dateCard';
import More from '../../components/microComponents/more';

// Layout
import styles from '../../styles/PodcastPage.module.scss';
import arrowLeft from '../../public/arrow-left.svg';

export default function PostPage({ data, posts }) {
	const router = useRouter();

	return (
		<>
			<Head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
				<title>{data.post.title}</title>
				<meta
					name="description"
					content={`Podcast '${data.post.title}' - ${data.post.categories.nodes[0].name}`}
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
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=5.0,user-scalable=5"
				/>

				<meta name="robots" />
				<meta name="googlebot" />
			</Head>
			<Layout>
				<article className={styles.containerPodcastPage}>
					<div className={styles.podcastPage}>
						<div className={styles.navBarPodcastPage}>
							<div
								className={styles.containerBtnPodcastPage}
								onClick={() => router.back()}
							>
								<div className={styles.iconBackPodcastPage}>
									<Image src={arrowLeft} alt="search icon" />
								</div>
								<span className={styles.btnPodcastPage}>
									Retour
								</span>
							</div>
						</div>
						<picture
							className={styles.picturePodcastPage}
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
						<h1 className={styles.titlePodcastPage}>
							{data.post.title}
						</h1>
						<div className={styles.infoPodcastPage}>
							{data.post.categories.nodes[0].name && (
								<TagPost
									text={data.post.categories.nodes[0].name}
									color={'#D63447'}
									textColor={'white'}
								/>
							)}
							<DateCard date={data.post.date} />
						</div>
						<div className={styles.contentPodcastPage}>
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
	const response = await getAllSlugsPodcasts();
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
	const posts = await getAllPodcasts();
	return {
		props: {
			data,
			posts,
		},
		revalidate: 5,
	};
}
