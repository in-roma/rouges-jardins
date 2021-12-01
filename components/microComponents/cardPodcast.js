import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
	altText,
}) {
	const router = useRouter();
	return (
		<article
			type={type}
			className={styles.cardPodcast}
			onClick={() => router.push(`/${type}/${slug}`)}
		>
			<Tag text={category} color={colorTag} textColor={textColor} />
			<picture
				className={styles.pictureCardPodcast}
				style={{
					display: 'block',
					position: 'relative',
					borderRadius: '6px',
					overflow: 'hidden',
				}}
			>
				<Image
					src={imageUrl}
					layout="fill"
					objectFit="cover"
					alt={altText}
				/>
			</picture>
			<div className={styles.textContainerCardPodcast}>
				<h3 className={styles.titleCardPodcast}>{title}</h3>

				<DateCard date={date} className={styles.dateCardPodcast} />
			</div>
		</article>
	);
}
