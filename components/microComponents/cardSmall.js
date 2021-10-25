import { ClientError } from 'graphql-request';
import Link from 'next/link';

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
}) {
	return (
		<div className={styles.cardSmall}>
			<Tag text={category} color="#F6EEDF" />
			<div
				style={{
					backgroundImage: `url(${imageUrl})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					width: '28rem',
					height: '16.8rem',
					borderRadius: '0.6rem',
				}}
			></div>
			<div className={styles.titleCardSmall}>{title}</div>
			<DateCard date={date} />
		</div>
	);
}
