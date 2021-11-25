import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

// Components
import Layout from '../components/Layout';
import SectionBar from '../components/microComponents/sectionBar';
import Button from '../components/microComponents/button';
import Quantity from '../components/microComponents/quantity';

// Styling
import styles from '../styles/Cart.module.scss';
import crossIcon from '../public/crossBlack.svg';

// Context
import { AppContext } from '../lib/context';

export default function Cart() {
	// Context states
	const {
		cartLength,
		cartList,
		addBookContext,
		removeBookContext,
	} = useContext(AppContext);

	const deleteBook = () => {};

	const redirectToCheckout = async () => {
		// Create Stripe checkout
		const {
			data: { id },
		} = await axios.post('/api/checkout_sessions', {
			items: Object.entries(cartList).map(([_, { id, quantity }]) => ({
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

					<div className={styles.tableCart}>
						<span className={styles.thTableTitreCart}>Titre</span>
						<span className={styles.thTableCart}>Prix</span>
						<span className={styles.thTableCart}>Quantité</span>
						<span className={styles.thTableCart}>Total</span>
						{cartList.length < 1 && (
							<span className={styles.noItemsCart}>
								Aucun livre sélectionné
							</span>
						)}
						{cartList.map((el) => (
							<>
								<div
									key={el.id + 'picture'}
									className={styles.pictureCardCart}
									style={{
										backgroundImage: `url(${el.picture})`,
									}}
								></div>
								<span
									key={el.id + 'title'}
									className={styles.titleTableCart}
								>
									{el.title}
								</span>
								<span
									key={el.id + 'price'}
									className={styles.priceTableCart}
								>
									{el.price}
								</span>
								<Quantity />
								<span
									key={el.id + 'total'}
									className={styles.totalTableCart}
								>
									{parseInt(el.price) * parseInt(el.quantity)}
								</span>
								<Image
									className={styles.iconDeleteCArt}
									src={crossIcon}
									alt="cross icon"
									onClick={deleteBook}
									name={el.id}
								/>
							</>
						))}
					</div>
					<div className={styles.tableCartfooter}>
						<span className={styles.SumTableCart}>Quantity</span>
						<span className={styles.SumValueTableCart}>0</span>
						<span className={styles.SumTableCart}>Total</span>
						<span className={styles.SumValueTableCart}>00.00</span>
						<Button text="Commander" onClick={redirectToCheckout} />
					</div>
				</div>
			</div>
		</Layout>
	);
}
