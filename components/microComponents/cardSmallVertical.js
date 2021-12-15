import Image from 'next/image';
import { useRouter } from 'next/router';

// Component
import Tag from './tag';
import DateCard from './dateCard';

// Styling
import styles from '../../styles/components/microComponents/CardSmallVertical.module.scss';

export default function CardSmallVertical({
	title,
	imageUrl,
	date,
	category,
	colorTag,
	slug,
	altText,
}) {
	const router = useRouter();
	return (
		<article
			className={styles.cardSmallVertical}
			onClick={() => router.push(`/publications/${slug}`)}
		>
			<Tag text={category} color={colorTag} />
			<picture
				className={styles.pictureCardVertical}
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
			<h2 className={styles.titleCardSmallVertical}>{title}</h2>
			<DateCard date={date} />
		</article>
	);
}
