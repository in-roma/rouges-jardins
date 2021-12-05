import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Layout from '../components/layout';
import Search from '../components/microComponents/search';
import Filter from '../components/microComponents/filter';

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
		let count = numberOfPosts + 20;
		changeNumberOfPosts(count);
		router.replace({
			pathname: 'blog',
			query: {
				volume: count,
				category: [5, 6, 7, 11, 12, 13, 14, 15],
				keyword: searchValue,
			},
		});
		refreshData();
	};

	// Updating cards display
	// useEffect(() => {

	// }, [posts]);

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
	// 		setKeyword(searchValue);
	// 		setSearchActive(true);

	// 		refreshData();
	// 	}
	// }, [searchValue, searchActive, filtering]);

	return (
		<>
			<Head>
				<title>Chroniques</title>

				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta name="description" content="Section chroniques" />
				<meta name="robots" />
				<meta name="googlebot" />
			</Head>
			<Layout>
				<div className={styles.containerBlog}>
					<section className={styles.navBarBlog}>
						<h1>Chroniques</h1>
						<Search
							value={searchValue}
							onChangeInput={onChangeInput}
							onSubmitSearch={searchPosts}
						/>
						<Filter
							categories={categories}
							onChangeCategory={onChangeCategory}
						/>
					</section>
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
							{!isRefreshing ? (
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
									/>
								))
							) : (
								<div className={styles.containerLoaderBlog}>
									<div className={styles.loader}>
										<div
											className={styles.loaderIcon}
										></div>
										<span>Chargement</span>
									</div>
								</div>
							)}
							{/* <div className={styles.containerLoaderBlog}>
								<div className={styles.loader}>
									<div className={styles.loaderIcon}></div>
									<span>Chargement</span>
								</div>
							</div> */}
						</div>
					}

					{!isRefreshing && !filtering && (
						<div className={styles.containerButtonBlog}>
							<button
								type="button"
								className={styles.buttonMoreBlog}
								onClick={morePosts}
							>
								More posts
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
