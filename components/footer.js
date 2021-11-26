import Link from 'next/link';
import styles from '../styles/components/footer.module.scss';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<div className={styles.footerLogoContainer}>
					<Link href="/">
						<a className={styles.footerLogo}>Rouges jardins</a>
					</Link>
					<span className={styles.footerBy}>par Guy Grandjean</span>
				</div>
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
				<div className={styles.footerMentions}>
					<span>Tous droits réservés - Rouges Jardins</span>
					<span>Site hébergé chez O2Switch</span>
				</div>
			</div>
		</footer>
	);
}
