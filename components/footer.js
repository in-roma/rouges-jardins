import Link from 'next/link';
import styles from '../styles/components/Footer.module.scss';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<Link href="/">
					<a className={styles.footerLogo}>
						Rouges jardins
						<span className={styles.footerBy}>
							par Guy Grandjean
						</span>
					</a>
				</Link>
				<nav className={styles.footerNav}>
					<Link href="/blog">
						<a className={styles.footerNavItem}>Chroniques</a>
					</Link>
					<Link href="/podcasts">
						<a className={styles.footerNavItem}>Podcasts</a>
					</Link>
					<Link href="/publications">
						<a className={styles.footerNavItem}>Publications</a>
					</Link>
					<Link href="/about">
						<a className={styles.footerNavItem}>À propos</a>
					</Link>
				</nav>
				<div className="footerRights">
					<span>
						Tous droits réservés - Rouges Jardins Site hébergé chez
					</span>
					<span>Digital Ocean et O2Switch</span>
				</div>
			</div>
		</footer>
	);
}
