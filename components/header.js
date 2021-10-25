import Link from 'next/link';
import styles from '../styles/components/Header.module.scss';

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<Link href="/">
					<a className={styles.logo}>
						Rouges jardins{' '}
						<span className={styles.by}>par Guy Grandjean</span>
					</a>
				</Link>
				<nav className={styles.nav}>
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
