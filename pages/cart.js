import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head';

// Components
import Layout from '../components/layout';
import SectionBar from '../components/microComponents/sectionBar';
import Button from '../components/microComponents/button';
import Quantity from '../components/microComponents/quantity';

// Styling
import styles from '../styles/Cart.module.scss';
import crossIcon from '../public/crossBlack.svg';

// Context
import { AppContext } from '../lib/context';

// Stripe
import getStripe from '../lib/get-stripe';

export default function Cart() {
	// Context states
	const {
		cartLength,
		cartList,
		addBook,
		substractBook,
		removeBook,
		cartTotal,
	} = useContext(AppContext);

	const addQuantity = (e) => {
		const bookId = e.target.name;
		addBook(bookId);
	};

	const substractQuantity = (e) => {
		const bookId = e.target.name;
		substractBook(bookId);
	};

	const deleteBook = (e) => {
		const bookId = e.target.name;
		removeBook(bookId);
	};

	const [redirecting, setRedirecting] = useState(false);

	const redirectToCheckout = async () => {
		if (cartList.length > 0) {
			setRedirecting(true);
			// Create Stripe checkout
			const {
				data: { id },
			} = await axios.post('/api/checkout_sessions', {
				items: Object.entries(cartList).map(
					([_, { id, quantity }]) => ({
						price: id,
						quantity,
					})
				),
			});

			// Redirect to checkout
			const stripe = await getStripe();
			await stripe.redirectToCheckout({ sessionId: id });
		}
	};

	return (
		<>
			<Head>
				<title>Panier</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
				/>
				<meta name="description" content="¨Panier" />
				<meta name="robots" content="noindex" />
				<meta name="googlebot" content="noindex" />
			</Head>
			<Layout>
				<div className={styles.containerCart}>
					<div className={styles.contentCart}>
						<section className={styles.navBarCart}>
							<h2>Panier</h2>
							<Link href="/publications">
								<a>Retour</a>
							</Link>
						</section>

						<table className={styles.tableCart}>
							<span className={styles.thTableTitreCart}>
								Titre
							</span>
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
											display: 'block',
											position: 'relative',
											borderRadius: '6px',
											overflow: 'hidden',
										}}
									>
										<Image
											src={el.picture}
											layout="fill"
											objectFit="cover"
											alt={el.altText}
										/>
									</div>
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
									<Quantity
										add={addQuantity}
										remove={substractQuantity}
										quantity={el.quantity}
										name={el.id}
									/>
									<span
										key={el.id + 'total'}
										className={styles.totalTableCart}
									>
										{parseInt(el.price) *
											parseInt(el.quantity)}
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
						</table>
						<table className={styles.tableCartfooter}>
							<span className={styles.SumTableCart}>
								Quantity
							</span>
							<span className={styles.sumValueTableCart}>
								{cartList.reduce(function (acc, obj) {
									return acc + obj.quantity;
								}, 0)}
							</span>
							<div className={styles.sumTableCart}>
								<span>Total</span>
								<span className={styles.sumNoticeTableCart}>
									Frais de port inclus
								</span>
							</div>
							<span className={styles.sumValueTableCart}>
								{cartList.reduce(function (acc, obj) {
									return acc + obj.price * obj.quantity;
								}, 0)}
								.00 euros
							</span>
							<span className={styles.noticeTableCart}></span>
							{!redirecting ? (
								<Button
									text="Commander"
									onClick={redirectToCheckout}
									disabled={redirecting}
								/>
							) : (
								<div
									className={
										styles.redirectionStripeContainer
									}
								>
									<span>Redirection vers Stripe</span>
									<div className={styles.loaderButton}>
										<div
											className={styles.loaderIconButton}
										></div>
									</div>
								</div>
							)}
						</table>
					</div>
				</div>
			</Layout>
		</>
	);
}
