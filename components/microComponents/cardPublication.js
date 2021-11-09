import Link from 'next/link';
import { useRouter } from 'next/router';

// Component
import Tag from './tag';
import DateCard from './dateCard';

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
}) {
	const router = useRouter();
	return (
		<div
			type={type}
			className={styles.cardPublication}
			onClick={() => router.push(`/${type}/${slug}`)}
		>
			<Tag text={category} color={colorTag} textColor={textColor} />
			<div
				className={styles.pictureCardPublication}
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			></div>
			<div className={styles.textContainerCardPublication}>
				<div className={styles.titleCardPublication}>{title}</div>
				<div className={styles.textCardPublication}>{text}</div>
				<DateCard date={date} />
			</div>
		</div>
	);
}
