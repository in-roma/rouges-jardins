import Link from 'next/link';
import { useRouter } from 'next/router';

// Component
import Tag from './tag';
import DateCard from './dateCard';

// Styling
import styles from '../../styles/components/microComponents/cardSmallVertical.module.scss';

export default function CardSmallVertical({
	title,
	text,
	imageUrl,
	imageAltText,
	date,
	category,
	colorTag,
	slug,
}) {
	const router = useRouter();
	return (
		<div
			className={styles.cardSmallVertical}
			onClick={() => router.push(`/publications/${slug}`)}
		>
			<Tag text={category} color={colorTag} />
			<div
				className={styles.pictureCardVertical}
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			></div>
			<div className={styles.titleCardSmallVertical}>{title}</div>
			<DateCard date={date} />
		</div>
	);
}
