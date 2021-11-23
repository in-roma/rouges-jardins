import Link from 'next/link';
import axios from 'axios';

// Components
import Layout from '../components/Layout';
import SectionBar from '../components/microComponents/sectionBar';
import Button from '../components/microComponents/button';

// Styling
import styles from '../styles/Cart.module.scss';

export default function Cart() {
	const cartDetails = [{ id: 'price_1Jz01jG1ckaZTP2OwXpN0poe', quantity: 1 }];

	const redirectToCheckout = async () => {
		// Create Stripe checkout
		const {
			data: { id },
		} = await axios.post('/api/checkout_sessions', {
			items: Object.entries(cartDetails).map(([_, { id, quantity }]) => ({
				price: id,
				quantity,
			})),
		});

		// Redirect to checkout
		const stripe = await getStripe();
		await stripe.redirectToCheckout({ sessionId: id });
	};

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
				<Button text="Commander" onClick={redirectToCheckout} />
			</div>
		</Layout>
	);
}
