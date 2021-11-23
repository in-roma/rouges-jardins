import Link from 'next/link';

// Components
import Layout from '../components/Layout';
import SectionBar from '../components/microComponents/sectionBar';

// Styling
import styles from '../styles/Cart.module.scss';

export default function Cart() {
	return (
		<Layout>
			<div className={styles.containerCart}>
				<div className={styles.contentCart}>
					<div className={styles.navBarCart}>
						<h2>Panier</h2>
						<Link href="/publications">
							<a>Retour</a>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
}
