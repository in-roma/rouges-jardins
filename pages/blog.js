import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Components
import Layout from '../components/layout';
import Search from '../components/microComponents/search';
import Filter from '../components/microComponents/filter';
import searchPicBlack from '../public/searchBlack.svg';
import crossIcon from '../public/crossBlack.svg';

// Layout
import styles from '../styles/Blog.module.scss';
import CardSmall from '../components/microComponents/cardSmall';

// API
import { getAllChroniques, getAllCategories } from '../lib/api';

// Context
import { AppContext } from '../lib/context';

export default function Blog({ posts, categories }) {
	const router = useRouter();

	// States
	// -> Data
	// const [dataFetched, setDataFetched] = useState(posts.edges);
	const [chroniques, setChroniques] = useState(posts.edges);

	// Context states
	const {
		searchValue,
		changeSearchValue,
		category,
		changeCategory,
		numberOfPosts,
		changeNumberOfPosts,
	} = useContext(AppContext);

	// Process States
	const [isRefreshing, setIsRefreshing] = useState(true);
	const [searchActive, setSearchActive] = useState(false);

	const refreshData = () => {
		// router.replace(router.asPath);
		setIsRefreshing(true);
	};

	// Setting input field
	const onChangeInput = (event) => {
		event.preventDefault();
		let { value } = event.target;
		changeSearchValue(value);
	};

	// Searchkeyword
	const [searchMobileActive, setSearchMobileActive] = useState(false);

	const searchPosts = (event) => {
		event.preventDefault();
		let keyword = searchValue;
		router.replace({
			pathname: 'blog',
			query: {
				volume: 1000,
				category: category,
				keyword: keyword,
			},
		});
		setSearchActive(true);
		refreshData();
	};

	const resetSearch = () => {
		router.replace({
			pathname: 'blog',
			query: {
				volume: numberOfPosts,
				category: category,
				keyword: '',
			},
		});

		setSearchActive(false);
		changeSearchValue('');
		refreshData();
	};

	// Filter categories
	const [filtering, setFiltering] = useState(false);
	const onChangeCategory = (event) => {
		event.preventDefault();
		let { value } = event.target;
		setFiltering(true);
		changeCategory([value]);
		console.log('this is value:', value);
		router.replace({
			pathname: 'blog',
			query: {
				volume: 1000,
				category: [value],
				keyword: searchValue,
			},
		});
		refreshData();
	};

	// Fetch more posts
	const morePosts = () => {
		router.replace({
			pathname: 'blog',
			query: {
				volume: 1000,
				category: [5, 6, 7, 11, 12, 13, 14, 15],
				keyword: searchValue,
			},
		});
		refreshData();
	};

	// Updating cards display

	useEffect(() => {
		setChroniques(posts.edges);
		setIsRefreshing(false);
	}, [posts]);

	// Search context value from home
	// useEffect(() => {
	// 	if (
	// 		searchValue &&
	// 		searchValue.length > 0 &&
	// 		!searchActive &&
	// 		!filtering
	// 	) {
	// 		setChroniques(posts.edges);
	// 		setSearchActive(true);
	// 		setIsRefreshing(false);
	// 	}
	// }, [searchValue, searchActive, filtering]);

	return (
		<>
			<Head>
				<title>Chroniques</title>

				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
				/>
				<meta name="description" content="Section chroniques" />
				<meta name="robots" />
				<meta name="googlebot" />
			</Head>
			<Layout>
				<div className={styles.containerBlog}>
					<section className={styles.navBarBlog}>
						<div className={styles.containerBlogHeaderFilter}>
							<h1>Chroniques</h1>
							<Filter
								className={styles.filterBlog}
								categories={categories}
								onChangeCategory={onChangeCategory}
								autofocusSet={false}
							/>
						</div>
						<div className={styles.searchInputContainer}>
							<Search
								value={searchValue}
								onChangeInput={onChangeInput}
								onSubmitSearch={searchPosts}
							/>
						</div>
						{!searchMobileActive ? (
							<div
								className={styles.iconSearchMobile}
								onClick={() => setSearchMobileActive(true)}
							>
								<Image src={searchPicBlack} alt="search icon" />
							</div>
						) : (
							<div
								className={styles.iconSearchMobile}
								onClick={() => setSearchMobileActive(false)}
							>
								<Image src={crossIcon} alt="close icon" />
							</div>
						)}
					</section>
					{searchMobileActive ? (
						<div className={styles.searchInputMobileContainer}>
							<Search
								value={searchValue}
								onChangeInput={onChangeInput}
								onSubmitSearch={searchPosts}
								autofocusSet={true}
							/>
						</div>
					) : null}
					{isRefreshing && (
						<div className={styles.containerLoaderBlog}>
							<div className={styles.loader}>
								<div className={styles.loaderIcon}></div>
								<span>Chargement</span>
							</div>
						</div>
					)}
					{searchActive && (
						<div className={styles.searchBarBlog}>
							<h2>
								{`${chroniques.length} résultat${
									chroniques.length > 1 ? 's' : ''
								} pour  "${searchValue}" `}
							</h2>
							<button onClick={resetSearch}>
								Annuler la recherche
							</button>
						</div>
					)}
					{
						<div
							className={styles.contentBlog}
							style={searchActive ? { marginTop: '12rem' } : {}}
						>
							{!isRefreshing &&
								chroniques.map((el) => (
									<CardSmall
										key={'smallCard' + el.node.id}
										title={el.node.title}
										imageUrl={
											el.node.featuredImage.node
												.mediaDetails.sizes[0].sourceUrl
										}
										imageAltText={'test'}
										date={el.node.date}
										category={
											el.node.categories.nodes[0].name
										}
										slug={el.node.slug}
										color="
							rgba(0, 0, 0, 1)"
										textColor="white"
										altText={
											el.node.featuredImage.node.altText
										}
										section="blog"
									/>
								))}
						</div>
					}

					{!isRefreshing && !filtering && chroniques.length < 40 && (
						<div className={styles.containerButtonBlog}>
							<button
								type="button"
								className={styles.buttonMoreBlog}
								onClick={morePosts}
							>
								Toutes les chroniques
							</button>
						</div>
					)}
				</div>
			</Layout>
		</>
	);
}

export async function getServerSideProps(context) {
	const { volume, category, keyword } = context.query;

	const { posts } = await getAllChroniques(
		parseInt(volume),
		category,
		keyword
	);
	const { categories } = await getAllCategories();
	console.log('query:', volume, category, keyword);

	return {
		props: { posts, categories },
	};
}
