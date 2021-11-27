import Link from 'next/link';
import Image from 'next/image';
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
	type,
}) {
	const router = useRouter();
	return (
		<div
			type={type}
			className={
				cardLargeType === 'cardLargeChroniques'
					? styles.cardLargeChroniques
					: styles.cardLargePodcasts
			}
			onClick={() => router.push(`/${type}/${slug}`)}
		>
			<Tag
				text={category}
				color={colorTag}
				textColor={textColor}
				style={{ zIndex: 10 }}
			/>
			<div
				className={styles.cardLargePicture}
				style={{
					display: 'block',
					position: 'relative',
					borderRadius: '6px',
					overflow: 'hidden',
				}}
			>
				<Image src={imageUrl} layout="fill" objectFit="cover" />
			</div>
			<div className={styles.titleCardLarge}>{title}</div>
			<div className={styles.textCardLarge}>{text}</div>
			<DateCard date={date} />
		</div>
	);
}
