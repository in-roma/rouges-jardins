import Image from 'next/image';
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
		<Layout>
			<div className={styles.containerPodcastPage}>
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
			</div>
		</Layout>
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
		fallback: false,
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
	};
}
