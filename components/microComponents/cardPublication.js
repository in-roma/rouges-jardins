import Link from 'next/link';
import { useRouter } from 'next/router';

// Component
import Tag from './tag';
import DateCard from './dateCard';
import Button from '../microComponents/button';

// Styling
import styles from '../../styles/components/microComponents/CardPublication.module.scss';

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
}) {
	const router = useRouter();
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
					<span className={styles.pricePublication}>
						Prix: {price}
					</span>
					<Button
						text="Ajouter au panier"
						className={styles.buttonCardPublication}
					/>
				</div>
			</div>
		</div>
	);
}
