import styles from '../styles/components/Layout.module.scss';
import { useState } from 'react';
import { detect } from 'detect-browser';

// Components
import Header from '../components/header';
import Footer from '../components/footer';

export default function Layout({ children }) {
	const browser = detect();
	const [compatible, setCompatible] = useState(true);

	if (browser.name === 'chrome' && browser.version < 56) {
		setCompatible(false);
	}

	return (
		<div className={styles.pageLayout}>
			<Header />
			{!compatible && (
				<h1 style={{ zIndex: 99 }}>
					Your browser needs to be upgraded to use this wbesite
				</h1>
			)}
			<content className={styles.contentLayout}>{children}</content>
			<Footer />
		</div>
	);
}
