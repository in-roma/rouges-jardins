import Image from 'next/image';
import Link from 'next/link';
import { getPost, getAllSlugs } from '../../lib/api';
import { useRouter } from 'next/router';
import parsing from '../../helpers/helpers';

// Components
import Layout from '../../components/layout';
import TagPost from '../../components/microComponents/tagPost';
import DateCard from '../../components/microComponents/dateCard';

// Layout
import styles from '../../styles/PostPage.module.scss';
import arrowLeft from '../../public/arrow-left.svg';

export default function PostPage({ data }) {
	console.log(
		'data.post.categories.nodes[0].name',
		data.post.categories.nodes[0].name
	);

	const router = useRouter();

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
							backgroundImage: `url(${data.post.featuredImage.node.sourceUrl})`,
						}}
					></div>
					<h1 className={styles.titlePostPage}>{data.post.title}</h1>
					<div className={styles.infoPostPage}>
						{data.post.categories.nodes[0].name && (
							<TagPost
								text={data.post.categories.nodes[0].name}
								color={'#F6EEDF'}
								textColor={'black'}
							/>
						)}
						<DateCard date={data.post.date} />
					</div>
					<div className={styles.contentPostPage}>
						{parsing(data.post.content)}
					</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getStaticPaths() {
	const response = await getAllSlugs();
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
	return {
		props: {
			data,
		},
	};
}
