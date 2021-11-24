import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Component
import Tag from './tag';
import DateCard from './dateCard';
import Button from '../microComponents/button';
import Quantity from './quantity.js';

// Styling
import styles from '../../styles/components/microComponents/CardPublication.module.scss';

// Context
import { AppContext } from '../../lib/context';

export default function CardPublication({
	title,
	text,
	imageUrl,
	imageAltText,
	date,
	category,
	colorTag,
	textColor,
	cardLargeType,
	slug,
	type,
	price = '20.00 euros',
	apiStripeID,
}) {
	const router = useRouter();

	// Context
	const { addBook, substractBook } = useContext(AppContext);

	const substractBookQuantity = (bookID) => {
		substractBook(bookID);
	};
	const addBookQuantity = (bookID) => {
		addBook(bookID);
	};

	return (
		<div type={type} className={styles.cardPublication}>
			<Tag text={category} color={colorTag} textColor={textColor} />
			<div
				className={styles.pictureCardPublication}
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
				onClick={() => router.push(`/${type}/${slug}`)}
			></div>
			<div className={styles.textContainerCardPublication}>
				<div
					className={styles.textCardPublication}
					onClick={() => router.push(`/${type}/${slug}`)}
				>
					<div className={styles.titleCardPublication}>{title}</div>
					<DateCard date={date} />
				</div>

				<div className={styles.actionContainerPublication}>
					<div className={styles.priceQuantityContainerPublication}>
						<span className={styles.pricePublication}>
							Prix: {price}
						</span>
						<Quantity
							substract={substractBookQuantity(apiStripeID)}
							add={addBookQuantity(apiStripeID)}
						/>
					</div>
					<Button
						text="Ajouter au panier"
						className={styles.buttonCardPublication}
					/>
				</div>
			</div>
		</div>
	);
}
