import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Component
import Tag from './tag';
import DateCard from './dateCard';
import Button from '../microComponents/button';
import Quantity from './quantity.js';

// Styling
import styles from '../../styles/components/microComponents/cardPublication.module.scss';

export default function CardPublication({
	name,
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
	price,
	addBook,
	removeBook,
	quantity,
}) {
	const router = useRouter();

	return (
		<div type={type} className={styles.cardPublication} name={name}>
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
							Prix: {price} euros
						</span>
						<Button
							text="Ajouter au panier"
							className={styles.buttonCardPublication}
							onClick={addBook}
							name={name}
						/>
						{/* <Quantity
							remove={removeBook}
							add={addBook}
							name={name}
							quantity={quantity}
						/> */}
					</div>
				</div>
			</div>
		</div>
	);
}
