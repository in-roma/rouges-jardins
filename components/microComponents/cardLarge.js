import { ClientError } from 'graphql-request';
import Link from 'next/link';

// Component
import Tag from './tag';
import DateCard from './dateCard';

// Styling
import styles from '../../styles/components/microComponents/CardLarge.module.scss';

export default function CardLarge({
	title,
	text,
	imageUrl,
	imageAltText,
	date,
	category,
	colorTag,
	textColor,
	cardLargeType,
}) {
	return (
		<div
			className={
				cardLargeType === 'cardLargeChroniques'
					? styles.cardLargeChroniques
					: styles.cardLargePodcasts
			}
		>
			<Tag text={category} color={colorTag} textColor={textColor} />
			<div
				className={styles.cardLargePicture}
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			></div>
			<div className={styles.titleCardLarge}>{title}</div>
			<div className={styles.textCardLarge}>{text}</div>
			<DateCard date={date} />
		</div>
	);
}
