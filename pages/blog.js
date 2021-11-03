// Components
import Layout from '../components/Layout';
import Search from '../components/microComponents/search';
import Filter from '../components/microComponents/filter';

// Layout
import styles from '../styles/Blog.module.scss';

export default function Blog() {
	return (
		<Layout>
			<div className={styles.containerBlog}>
				<div className={styles.navBarBlog}>
					<Search />
					<Filter />
				</div>
			</div>
		</Layout>
	);
}
