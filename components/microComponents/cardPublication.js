import { useRouter } from 'next/router';
import Image from 'next/image';

// Component
import Tag from './tag';
import DateCard from './dateCard';
import Button from '../microComponents/button';

// Styles
import styles from '../../styles/components/microComponents/CardPublication.module.scss';

export default function CardPublication({
	name,
	title,
	imageUrl,
	date,
	category,
	colorTag,
	textColor,
	slug,
	type,
	price,
	addBook,
	altText,
}) {
	const router = useRouter();

	return (
		<article type={type} className={styles.cardPublication} name={name}>
			<Tag text={category} color={colorTag} textColor={textColor} />
			<picture
				className={styles.pictureCardPublication}
				style={{
					display: 'block',
					position: 'relative',
					borderRadius: '6px',
					overflow: 'hidden',
				}}
				onClick={() => router.push(`/${type}/${slug}`)}
			>
				<Image
					src={imageUrl}
					layout="fill"
					objectFit="cover"
					alt={altText}
				/>
			</picture>
			<div className={styles.textContainerCardPublication}>
				<div
					className={styles.textCardPublication}
					onClick={() => router.push(`/${type}/${slug}`)}
				>
					<h2 className={styles.titleCardPublication}>{title}</h2>
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
					</div>
				</div>
			</div>
		</article>
	);
}
