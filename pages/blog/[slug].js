import Image from 'next/image';
import Link from 'next/link';
import getData from '../api/data';
import { useRouter } from 'next/router';
import parsing from '../../helpers/helpers';

// Components
import Layout from '../../components/layout';
import TagPost from '../../components/microComponents/tagPost';
import DateCard from '../../components/microComponents/dateCard';

// Layout
import styles from '../../styles/PostPage.module.scss';
import arrowLeft from '../../public/arrow-left.svg';

export default function PostPage({ post }) {
	console.log('this is post', post);

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
							backgroundImage: `url(${post[0].node.featuredImage.node.sourceUrl})`,
						}}
					></div>
					<h1 className={styles.titlePostPage}>
						{post[0].node.title}
					</h1>
					<div className={styles.infoPostPage}>
						<TagPost
							text={post[0].node.categories.nodes[0].name}
							color={'#F6EEDF'}
							textColor={'black'}
						/>
						<DateCard date={post[0].node.date} />
					</div>
					<div className={styles.contentPostPage}>
						{parsing(post[0].node.content)}
					</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getStaticPaths() {
	const response = await getData();

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
	const response = await getData();
	console.log('this is slug:', slug);
	const post = response.posts.edges.filter(
		(post) => post.node.slug === slug.slug
	);

	return { props: { post } };
}
