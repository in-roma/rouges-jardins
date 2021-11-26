import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Component
import Tag from './tag';
import DateCard from './dateCard';

// Styling
import styles from '../../styles/components/microComponents/cardMedium.module.scss';

export default function CardMedium({
	title,
	text,
	imageUrl,
	imageAltText,
	date,
	category,
	colorTag,
	textColor,
	slug,
}) {
	const router = useRouter();
	return (
		<div
			className={styles.cardMedium}
			onClick={() => router.push(`/podcasts/${slug}`)}
		>
			<Tag text={category} color={colorTag} textColor={textColor} />
			<div className={styles.cardMediumPicture}>
				<img src={imageUrl} alt={imageAltText} />
			</div>

			{/* <div
				style={{
					backgroundImage: `url(${imageUrl})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					width: '29.1rem',
					height: '16.8rem',
					borderRadius: '0.6rem',
				}}
			></div> */}
			<div className={styles.containerTextCardMedium}>
				<div className={styles.titleCardMedium}>{title}</div>
				<DateCard date={date} />
			</div>
		</div>
	);
}
