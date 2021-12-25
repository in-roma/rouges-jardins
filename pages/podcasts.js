import { useState, useContext, useEffect } from 'react';
import parsing from '../helpers/helpers';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Components
import Layout from '../components/layout';
import CardSmall from '../components/microComponents/cardSmall';
import CardPodcast from '../components/microComponents/cardPodcast';
import Search from '../components/microComponents/search';
import searchPicBlack from '../public/searchBlack.svg';
import crossIcon from '../public/crossBlack.svg';

// Styling
import styles from '../styles/Podcasts.module.scss';

// API
import { getAllPodcasts } from '../lib/api';

// Context
import { AppContext } from '../lib/context';

export default function Podcast({ posts }) {
	const router = useRouter();
	const [podcasts, setPodcasts] = useState(posts.edges);

	// Context states
	const { searchValuePodcast, changeSearchValuePodcast } = useContext(
		AppContext
	);

	// Process States
	// const [keyword, setKeyword] = useState('');
	const [enteredKeyWord, setEnteredKeyWord] = useState('');
	const [filtering, setFiltering] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(true);
	const [searchActive, setSearchActive] = useState(false);
	const [searchMobileActive, setSearchMobileActive] = useState(false);

	const refreshData = () => {
		setIsRefreshing(true);
	};

	// Setting input field
	const onChangeInput = (event) => {
		event.preventDefault();
		let { value } = event.target;
		changeSearchValuePodcast(value);
	};

	// Searchkeyword
	const searchPodcasts = (event) => {
		event.preventDefault();
		setFiltering(true);
		setEnteredKeyWord(searchValuePodcast);

		router.replace({
			pathname: 'podcasts',
			query: {
				keyword: searchValuePodcast,
			},
		});
		refreshData();
		setSearchActive(true);
		setSearchMobileActive(false);
	};

	const resetSearch = () => {
		router.replace({
			pathname: 'podcasts',
			query: {
				keyword: '',
			},
		});
		changeSearchValuePodcast('');
		setEnteredKeyWord('');
		setSearchActive(false);
		refreshData();
	};

	// Updating cards display
	useEffect(() => {
		setPodcasts(posts.edges);
		setIsRefreshing(false);
	}, [posts]);

	return (
		<>
			<Head>
				<title>Podcasts</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=5.0,user-scalable=5"
				/>
				<meta name="description" content="Section Podcasts" />
				<meta name="robots" />
				<meta name="googlebot" />
			</Head>
			<Layout>
				<div className={styles.containerPodcasts}>
					<section className={styles.navBarPodcast}>
						<div className={styles.containerBlogHeaderFilter}>
							<h1>Podcasts</h1>
						</div>
						<div className={styles.searchInputContainerPodcast}>
							<Search
								value={searchValuePodcast}
								onChangeInput={onChangeInput}
								onSubmitSearch={searchPodcasts}
								autofocusSet={false}
							/>
						</div>
						{!searchMobileActive ? (
							<div
								className={styles.iconSearchMobilePodcast}
								onClick={() => setSearchMobileActive(true)}
							>
								<Image src={searchPicBlack} alt="search icon" />
							</div>
						) : (
							<div
								className={styles.iconSearchMobilePodcast}
								onClick={() => setSearchMobileActive(false)}
							>
								<Image src={crossIcon} alt="close icon" />
							</div>
						)}
					</section>
					{searchMobileActive ? (
						<div
							className={styles.searchInputMobileContainerPodcast}
						>
							<Search
								value={searchValuePodcast}
								onChangeInput={onChangeInput}
								onSubmitSearch={searchPodcasts}
								autofocusSet={true}
							/>
						</div>
					) : null}
					{!searchMobileActive && searchActive && (
						<div className={styles.searchBarPodcast}>
							<h2>
								{`${podcasts.length} résultat${
									podcasts.length > 1 ? 's' : ''
								} pour  "${enteredKeyWord}" `}
							</h2>
							<button onClick={resetSearch}>
								Annuler Recherche
							</button>
						</div>
					)}
					{isRefreshing && (
						<div className={styles.containerLoaderPodcast}>
							<div className={styles.loader}>
								<div className={styles.loaderIcon}></div>
								<span>Chargement</span>
							</div>
						</div>
					)}

					<div
						className={styles.contentPodcasts}
						style={searchActive ? { marginTop: '12rem' } : {}}
					>
						{!isRefreshing &&
							podcasts.map((el) => (
								<CardSmall
									key={'podcasts' + el.node.id}
									type="podcasts"
									cardLargeType="cardLargePodcasts"
									color="#D63447"
									textColor="white"
									title={
										el.node.title.length > 64
											? parsing(
													el.node.title.slice(0, 64) +
														'...'
											  )
											: parsing(el.node.title)
									}
									imageUrl={
										el.node.featuredImage.node.mediaDetails
											.sizes[0].sourceUrl
									}
									imageAltText={'test'}
									date={el.node.date}
									category={el.node.categories.nodes[0].name}
									slug={el.node.slug}
									altText={el.node.featuredImage.node.altText}
									section="podcasts"
								/>
							))}
					</div>
				</div>
			</Layout>
		</>
	);
}
// export async function getStaticProps() {
// 	const { posts } = await getAllPodcasts();

// 	return {
// 		props: { posts },
// 		revalidate: 5,
// 	};
// }

export async function getServerSideProps(context) {
	const { keyword } = context.query;

	const { posts } = await getAllPodcasts(keyword);

	return {
		props: { posts },
	};
}
