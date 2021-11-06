import Link from 'next/link';
import { useRouter } from 'next/router';

// Component
import Tag from './tag';
import DateCard from './dateCard';

// Styling
import styles from '../../styles/components/microComponents/CardPodcast.module.scss';

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
	type,
}) {
	const router = useRouter();
	return (
		<div
			type={type}
			className={styles.cardPodcast}
			onClick={() => router.push(`/${type}/${slug}`)}
		>
			<Tag text={category} color={colorTag} textColor={textColor} />
			<div
				className={styles.pictureCardPodcast}
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			></div>
			<div className={styles.titleCardPodcast}>{title}</div>
			<div className={styles.textCardPodcast}>{text}</div>
			<DateCard date={date} />
		</div>
	);
}
