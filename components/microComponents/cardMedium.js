import Image from 'next/image';
import { useRouter } from 'next/router';

// Component
import Tag from './tag';
import DateCard from './dateCard';

// Styling
import styles from '../../styles/components/microComponents/CardMedium.module.scss';

export default function CardMedium({
	title,
	imageUrl,
	date,
	category,
	colorTag,
	textColor,
	slug,
	altText,
}) {
	const router = useRouter();
	return (
		<article
			className={styles.cardMedium}
			onClick={() => router.push(`/podcasts/${slug}`)}
		>
			<Tag text={category} color={colorTag} textColor={textColor} />
			<div
				className={styles.cardMediumPicture}
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
			<div className={styles.containerTextCardMedium}>
				<h2 className={styles.titleCardMedium}>{title}</h2>
				<DateCard date={date} />
			</div>
		</article>
	);
}
