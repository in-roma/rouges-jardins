import { useState, useContext, useEffect } from 'react';

// Components
import Layout from '../components/layout';
import Search from '../components/microComponents/search';
import Filter from '../components/microComponents/filter';

// Layout
import styles from '../styles/Blog.module.scss';
import CardSmall from '../components/microComponents/cardSmall';

// Api
import { getAllChroniques, getAllCategories } from '../lib/api';

// Context
import { AppContext } from '../lib/context';

export default function Blog({ posts, categories }) {
	// Initial import
	const initialImport = posts.edges.filter(
		(el) =>
			el.node.categories.nodes[0].name !== 'Podcast' &&
			el.node.categories.nodes[0].name !== 'Publication'
	);

	// Context
	const { searchValue, changeValue } = useContext(AppContext);

	// States
	const [chroniquesImported, setChroniquesImported] = useState(initialImport);
	const [chroniques, setChroniques] = useState(chroniquesImported);
	const [searchValueDisplay, setSearchValueDisplay] = useState('');
	// Setting input field
	const onChangeInput = (event) => {
		let { value } = event.target;
		setSearchValueDisplay(value);
		// changeValue(value);
	};

	// Search function
	const [searchActive, setSearchActive] = useState(false);
	const [valueSearchActive, setValueSearchActive] = useState('');
	const [chroniquesSearched, setchroniquesSearched] = useState();

	const searchPosts = (event) => {
		event.preventDefault();
		if (searchValueDisplay.length > 3) {
			let formatting = searchValueDisplay
				.split(' ')
				.map((el) => `(${el}).*`)
				.join('');
			let regex = new RegExp(formatting, 'gmi');

			let results = chroniquesImported.filter(
				(el) => regex.test(el.node.title) || regex.test(el.node.content)
			);
			setValueSearchActive(searchValueDisplay);
			setSearchActive(true);
			setChroniques(results);
			setchroniquesSearched(results);
		}
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
		setFiltering(true);
		let { value } = event.target;
		if (value !== 'Toutes' && !searchActive) {
			let filtered = chroniquesImported.filter(
				(el) => el.node.categories.nodes[0].name === value
			);
			setChroniques(filtered);
		}
		if (value === 'Toutes' && !searchActive) {
			setChroniques(chroniques);
		}
		// Search active
		if (value !== 'Toutes' && searchActive) {
			let filtered = chroniquesSearched.filter(
				(el) => el.node.categories.nodes[0].name === value
			);

			setChroniques(filtered);
		}
		if (value === 'Toutes' && searchActive) {
			setChroniques(chroniquesSearched);
		}
	};

	// Search context value from home
	useEffect(() => {
		if (searchValue.length > 0 && !searchActive && !filtering) {
			let formatting = searchValue
				.split(' ')
				.map((el) => `(${el}).*`)
				.join('');
			let regex = new RegExp(formatting, 'gmi');

			let results = chroniquesImported.filter(
				(el) => regex.test(el.node.title) || regex.test(el.node.content)
			);
			setValueSearchActive(searchValue);
			setSearchValueDisplay(searchValue);
			setSearchActive(true);
			setChroniques(results);
			setchroniquesSearched(results);
		}
	}, [searchValue, searchActive, filtering, chroniquesImported]);

	return (
		<Layout>
			<div className={styles.containerBlog}>
				<div className={styles.navBarBlog}>
					<h1>Chroniques</h1>
					<Search
						value={searchValueDisplay}
						onChangeInput={onChangeInput}
						onSubmitSearch={searchPosts}
					/>
					<Filter
						categories={categories}
						onChangeCategory={onChangeCategory}
					/>
				</div>
				{searchActive && (
					<div className={styles.searchBarBlog}>
						<h2>
							{`${chroniques.length} résultat${
								chroniques.length > 1 ? 's' : ''
							} pour  "${valueSearchActive}" `}
						</h2>
						<button onClick={resetSearch}>
							Annuler la recherche
						</button>
					</div>
				)}
				<content
					className={styles.contentBlog}
					style={searchActive ? { marginTop: '12rem' } : {}}
				>
					{chroniques.map((el) => (
						<CardSmall
							key={'smallCard' + el.node.id}
							title={el.node.title}
							imageUrl={
								el.node.featuredImage.node.mediaDetails.sizes[0]
									.sourceUrl
							}
							imageAltText={'test'}
							date={el.node.date}
							category={el.node.categories.nodes[0].name}
							slug={el.node.slug}
							color="
							rgba(0, 0, 0, 0.7)"
							textColor="white"
						/>
					))}
				</content>
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const { posts } = await getAllChroniques();
	const { categories } = await getAllCategories();

	return {
		props: { posts, categories },
	};
}
