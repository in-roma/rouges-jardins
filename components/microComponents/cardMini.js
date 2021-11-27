import Image from 'next/image';
import Link from 'next/link';
import Media from 'react-media';
import { useRouter } from 'next/router';

// Component
import Tag from './tag';
import DateCard from './dateCard';

// Styling
import styles from '../../styles/components/microComponents/CardMini.module.scss';

export default function CardMini({
	title,
	text,
	imageUrl,
	imageAltText,
	date,
	category,
	slug,
	color,
	textColor,
}) {
	const router = useRouter();
	return (
		<div
			className={styles.cardMini}
			onClick={() => router.push(`/blog/${slug}`)}
		>
			<Tag text={category} color={color} textColor={textColor} />
			<div
				className={styles.pictureCardMini}
				style={{
					display: 'block',
					position: 'relative',
					borderRadius: '6px',
					overflow: 'hidden',
				}}
			>
				<Image src={imageUrl} layout="fill" objectFit="cover" />
			</div>
			<div className={styles.titleCardMini}>
				{title.length > 60 ? title.slice(0, 60) + '...' : title}
			</div>
			{/* <DateCard date={date} /> */}
		</div>
	);
}
