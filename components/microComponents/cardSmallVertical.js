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
				style={{
					backgroundImage: `url(${imageUrl})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					width: '28rem',
					height: '28.6rem',
					borderRadius: '0.6rem',
				}}
			></div>
			<div className={styles.titleCardSmallVertical}>{title}</div>
			<DateCard date={date} />
		</div>
	);
}
