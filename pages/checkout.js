import Link from 'next/link';

// Components
import Layout from '../components/Layout';
import SectionBar from '../components/microComponents/sectionBar';

// Styling
import styles from '../styles/Checkout.module.scss';

export default function Checkout() {
	return (
		<Layout>
			<div className={styles.containerCheckout}>
				<div className={styles.contentCheckout}>
					<div className={styles.navBarCheckout}>
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
