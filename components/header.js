import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/components/Header.module.scss';
import Media from 'react-media';

//Components & elements
import searchPic from '../public/search.svg';
import crossPic from '../public/cross.svg';
import burger from '../public/burger.svg';
import burgerActive from '../public/active-burger.svg';

export default function Header() {
	const [searchStatus, setSearchStatus] = useState(false);
	const [burgerMenu, setBurgerMenu] = useState(false);

	const activateSearch = () => {
		if (!searchStatus) {
			setSearchStatus(true);
		}
		if (searchStatus) {
			setSearchStatus(false);
		}
	};
	const deactivateSearch = () => {
		if (searchStatus) {
			setSearchStatus(false);
		}
	};

	const openBurgerMenu = () => {
		if (!burgerMenu) {
			setBurgerMenu(true);
		}
		if (burgerMenu) {
			setBurgerMenu(false);
		}
	};

	return (
		<header className={styles.header}>
			<navbar className={styles.headerContent}>
				<div className={styles.logoContainer}>
					<Link href="/">
						<a className={styles.logo}>Rouges jardins</a>
					</Link>
					<span className={styles.by}>par Guy Grandjean</span>
				</div>
				<nav className={styles.nav}>
					<div
						className={styles.searchButton}
						style={{ width: searchStatus && '14rem' }}
					></div>

					<div className={styles.burger} onClick={openBurgerMenu}>
						{burgerMenu ? (
							<Image src={burgerActive} alt="burger icon" />
						) : (
							<Image src={burger} alt="burger icon" />
						)}
					</div>
					<Media
						query="(min-width: 1040px)"
						render={() => (
							<ul className={styles.linksContainer}>
								<li>
									<Link href="/blog">
										<a className={styles.navItem}>
											Chroniques
										</a>
									</Link>
								</li>
								<li>
									<Link href="/podcasts">
										<a className={styles.navItem}>
											Podcasts
										</a>
									</Link>
								</li>
								<li>
									<Link href="/publications">
										<a className={styles.navItem}>
											Publications
										</a>
									</Link>
								</li>
								<li>
									<Link href="/about">
										<a className={styles.navItem}>
											À propos
										</a>
									</Link>
								</li>
							</ul>
						)}
					/>
				</nav>
				<Media
					query="(max-width: 1040px)"
					render={() =>
						burgerMenu ? (
							<ul className={styles.linksContainerMobileActive}>
								<li>
									<Link href="/blog">
										<a className={styles.navItemMobile}>
											Chroniques
										</a>
									</Link>
								</li>
								<li>
									<Link href="/podcasts">
										<a className={styles.navItemMobile}>
											Podcasts
										</a>
									</Link>
								</li>
								<li>
									<Link href="/publications">
										<a className={styles.navItemMobile}>
											Publications
										</a>
									</Link>
								</li>
								<li>
									<Link href="/about">
										<a className={styles.navItemMobile}>
											À propos
										</a>
									</Link>
								</li>
							</ul>
						) : (
							<ul className={styles.linksContainerMobileInactive}>
								<li>
									<Link href="/blog">
										<a className={styles.navItemMobile}>
											Chroniques
										</a>
									</Link>
								</li>
								<li>
									<Link href="/podcasts">
										<a className={styles.navItemMobile}>
											Podcasts
										</a>
									</Link>
								</li>
								<li>
									<Link href="/publications">
										<a className={styles.navItemMobile}>
											Publications
										</a>
									</Link>
								</li>
								<li>
									<Link href="/about">
										<a className={styles.navItemMobile}>
											À propos
										</a>
									</Link>
								</li>
							</ul>
						)
					}
				/>
			</navbar>
		</header>
	);
}
