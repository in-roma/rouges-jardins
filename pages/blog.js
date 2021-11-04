import { useState } from 'react';

// Components
import Layout from '../components/Layout';
import Search from '../components/microComponents/search';
import Filter from '../components/microComponents/filter';

// Layout
import styles from '../styles/Blog.module.scss';
import CardSmall from '../components/microComponents/cardSmall';

// Api
import { getAllPosts, getAllCategories } from '../lib/api';

export default function Blog({ posts, categories }) {
	const initialImport = posts.edges.filter(
		(el) =>
			el.node.categories.nodes[0].name !== 'Podcast' &&
			el.node.categories.nodes[0].name !== 'Publication'
	);

	const [chroniquesImported, setChroniquesImported] = useState(initialImport);
	const [chroniques, setChroniques] = useState(chroniquesImported);
	const [valueSearch, setValueSearch] = useState('');

	// Setting input field
	const onChangeInput = (event) => {
		let { value } = event.target;
		setValueSearch(value);
	};
	// Search function
	const searchPosts = (text) => {};

	// Filter categories
	const onChangeCategory = (event) => {
		let { value } = event.target;
		if (value !== 'Toutes') {
			let filtered = chroniquesImported.filter(
				(el) => el.node.categories.nodes[0].name === value
			);
			setChroniques(filtered);
		}
		if (value === 'Toutes') {
			setChroniques(chroniquesImported);
		}
	};

	return (
		<Layout>
			<div className={styles.containerBlog}>
				<div className={styles.navBarBlog}>
					<Search
						value={valueSearch}
						onChange={onChangeInput}
						search={searchPosts}
					/>
					<Filter
						categories={categories}
						onChangeCategory={onChangeCategory}
					/>
				</div>

				<content className={styles.contentBlog}>
					{chroniques.map((el) => (
						<CardSmall
							key={'smallCard' + el.node.id}
							title={el.node.title}
							imageUrl={el.node.featuredImage.node.sourceUrl}
							imageAltText={'test'}
							date={el.node.date}
							category={el.node.categories.nodes[0].name}
							slug={el.node.slug}
						/>
					))}
				</content>
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const { posts } = await getAllPosts();
	const { categories } = await getAllCategories();
	console.log(categories);
	return {
		props: { posts, categories },
	};
}
