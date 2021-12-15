import Link from 'next/link';
import styles from '../styles/components/Footer.module.scss';

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
				<nav>
					<ul className={styles.footerNav}>
						<li>
							<Link href="/blog">
								<a className={styles.footerNavItem}>
									Chroniques
								</a>
							</Link>
						</li>
						<li>
							<Link href="/podcasts">
								<a className={styles.footerNavItem}>Podcasts</a>
							</Link>
						</li>
						<li>
							<Link href="/publications">
								<a className={styles.footerNavItem}>
									Publications
								</a>
							</Link>
						</li>
						<li>
							<Link href="/about">
								<a className={styles.footerNavItem}>À propos</a>
							</Link>
						</li>
					</ul>
				</nav>
				<div className={styles.footerMentions}>
					<span>Tous droits réservés - Rouges Jardins</span>
					<span>Digital Ocean / O2Switch</span>
				</div>
			</div>
		</footer>
	);
}
