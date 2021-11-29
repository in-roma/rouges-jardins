import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Component
import Tag from './tag';
import DateCard from './dateCard';

// Styling
import styles from '../../styles/components/microComponents/CardSmallVertical.module.scss';

export default function CardSmallVertical({
	title,
	text,
	imageUrl,
	imageAltText,
	date,
	category,
	colorTag,
	slug,
	altText,
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
			</div>
			<div className={styles.titleCardSmallVertical}>{title}</div>
			<DateCard date={date} />
		</div>
	);
}
