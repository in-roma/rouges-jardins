import { ClientError } from 'graphql-request';
import Link from 'next/link';

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
}) {
	return (
		<div className={styles.cardLarge}>
			<Tag text={category} color="#F6EEDF" />
			<div
				style={{
					backgroundImage: `url(${imageUrl})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					width: '58.2rem',
					height: '35.2rem',
					borderRadius: '0.6rem',
				}}
			></div>
			<div className={styles.titleCardLarge}>{title}</div>
			<div className={styles.textCardLarge}>{text}</div>
			<DateCard date={date} />
		</div>
	);
}
