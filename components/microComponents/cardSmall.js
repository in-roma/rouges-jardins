import { ClientError } from 'graphql-request';
import Link from 'next/link';
import Media from 'react-media';
import { useRouter } from 'next/router';

// Component
import Tag from './tag';
import DateCard from './dateCard';

// Styling
import styles from '../../styles/components/microComponents/CardSmall.module.scss';

export default function CardSmall({
	title,
	text,
	imageUrl,
	imageAltText,
	date,
	category,
	slug,
}) {
	const router = useRouter();
	return (
		<div
			className={styles.cardSmall}
			onClick={() => router.push(`/blog/${slug}`)}
		>
			<Tag text={category} color="#F6EEDF" />
			<div
				className={styles.pictureCardSmall}
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			></div>
			<div className={styles.titleCardSmall}>{title}</div>
			<DateCard date={date} />
		</div>
	);
}
