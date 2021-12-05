import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Loader } from 'semantic-ui-react';

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
	const [dataFetched, setDataFetched] = useState(posts.edges);
	const [chroniques, setChroniques] = useState(dataFetched);
	const [isRefreshing, setIsRefreshing] = useState(false);

	// -> Number of posts
	const [numberOfPosts, setNumberOfPosts] = useState(20);

	// -> Category
	const [category, setCategory] = useState([5, 6, 7, 11, 12, 13, 14, 15]);

	// -> Keyword
	const { searchValue, changeSearchValue } = useContext(AppContext);
	const [keyword, setKeyword] = useState('');
	const [searchActive, setSearchActive] = useState(false);

	const refreshData = () => {
		router.replace(router.asPath);
		setIsRefreshing(true);
	};

	// Fetch more posts
	const morePosts = () => {
		let count = numberOfPosts + 20;
		setNumberOfPosts(count);
		router.replace({
			pathname: 'blog',
			query: {
				volume: numberOfPosts,
				category: category,
				keyword: keyword,
			},
		});
		refreshData();
	};

	// Setting input field
	const onChangeInput = (event) => {
		// event.preventDefault();
		let { value } = event.target;
		setKeyword(value);
	};

	const searchPosts = (event) => {
		const { value } = event.target;
		router.replace({
			pathname: 'blog',
			query: {
				volume: numberOfPosts,
				category: category,
				keyword: value,
			},
		});
		setKeyword(event.target.value);
		changeSearchValue(value);
		refreshData();
	};

	const resetSearch = () => {
		setSearchActive(false);
		setChroniques(chroniquesImported);
		setValueSearchActive('');
		changeValue('');
	};

	// Filter categories
	const [filtering, setFiltering] = useState(false);
	const onChangeCategory = (event) => {
		let { value } = event.target;
		setFiltering(true);
		setCategory(value);

		router.replace({
			pathname: 'blog',
			query: {
				volume: numberOfPosts,
				category: value,
				keyword: keyword,
			},
		});
		refreshData();
	};

	// Updating cards display
	useEffect(() => {
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
							value={keyword}
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
								} pour  "${keyword}" `}
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
							rgba(0, 0, 0, 0.7)"
										textColor="white"
										altText={
											el.node.featuredImage.node.altText
										}
									/>
								))
							) : (
								<div className={styles.loaderBlog}>
									<Loader
										active
										size="medium"
										content="Chargement"
									/>
								</div>
							)}
						</div>
					}
				</div>
				<button
					type="button"
					className={styles.buttonMoreBlog}
					onClick={morePosts}
				>
					More posts
				</button>
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
