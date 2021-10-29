import { ClientError } from 'graphql-request';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
	slug,
}) {
	const router = useRouter();
	return (
		<div
			className={
				cardLargeType === 'cardLargeChroniques'
					? styles.cardLargeChroniques
					: styles.cardLargePodcasts
			}
			onClick={() => router.push(`/blog/${slug}`)}
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
