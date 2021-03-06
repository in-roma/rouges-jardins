import styles from '../styles/components/Layout.module.scss';

// Components
import Header from '../components/header';
import Footer from '../components/footer';

export default function Layout({ children }) {
	return (
		<div className={styles.pageLayout}>
			<Header />
			<main className={styles.contentLayout}>{children}</main>
			<Footer />
		</div>
	);
}
