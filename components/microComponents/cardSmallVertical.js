import { ClientError } from 'graphql-request';
import Link from 'next/link';

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
}) {
	return (
		<div className={styles.cardSmallVertical}>
			<Tag text={category} color={colorTag} />
			<div
				className={styles.pictureCardVertical}
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			></div>
			<div className={styles.titleCardSmallVertical}>{title}</div>
			<DateCard date={date} />
		</div>
	);
}
