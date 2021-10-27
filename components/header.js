import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/components/Header.module.scss';

//Components & elements
import searchPic from '../public/search.svg';
import crossPic from '../public/cross.svg';

export default function Header() {
	const [searchStatus, setSearchStatus] = useState(false);

	const activateSearch = () => {
		if (!searchStatus) {
			setSearchStatus(true);
		}
	};
	const deactivateSearch = () => {
		if (searchStatus) {
			setSearchStatus(false);
		}
	};

	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<div className={styles.logoContainer}>
					<Link href="/">
						<a className={styles.logo}>Rouges jardins</a>
					</Link>
					<span className={styles.by}>par Guy Grandjean</span>
				</div>
				<nav className={styles.nav}>
					<div
						className={styles.searchButton}
						style={{ width: searchStatus && '24rem' }}
					>
						<Image
							src={searchPic}
							alt="cross icon"
							onClick={activateSearch}
						/>
						{searchStatus && (
							<form className={styles.searchInput}>
								<input autofocus></input>
								<Image
									src={crossPic}
									alt="search icon"
									onClick={deactivateSearch}
								/>
							</form>
						)}
					</div>
					<Link href="/blog">
						<a className={styles.navItem}>Chroniques</a>
					</Link>
					<Link href="/podcasts">
						<a className={styles.navItem}>Podcasts</a>
					</Link>
					<Link href="/publications">
						<a className={styles.navItem}>Publications</a>
					</Link>
					<Link href="/about">
						<a className={styles.navItem}>À propos</a>
					</Link>
				</nav>
			</div>
		</header>
	);
}
