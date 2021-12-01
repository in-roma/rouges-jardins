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
	altText,
}) {
	const router = useRouter();
	return (
		<article
			className={styles.cardMini}
			onClick={() => router.push(`/blog/${slug}`)}
		>
			<Tag text={category} color={color} textColor={textColor} />
			<picture
				className={styles.pictureCardMini}
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
			<h2 className={styles.titleCardMini}>
				{title.length > 60 ? title.slice(0, 60) + '...' : title}
			</h2>
		</article>
	);
}
