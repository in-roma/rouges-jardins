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
import More from '../../components/microComponents/more';

// Layout
import styles from '../../styles/PublicationPage.module.scss';
import arrowLeft from '../../public/arrow-left.svg';

export default function PostPage({ data, posts }) {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>{data.post.title}</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta
					name="description"
					content={`Livre '${data.post.title}' - ${data.post.categories.nodes[0].name}`}
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
						<h1 className={styles.titlePublicationPage}>
							{data.post.title}
						</h1>
						<div className={styles.infoPublicationPage}>
							{data.post.categories.nodes[0].name && (
								<TagPost
									text={data.post.categories.nodes[0].name}
									color={'#FFD31D'}
									textColor={'black'}
								/>
							)}
							<DateCard date={data.post.date} />
						</div>

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
