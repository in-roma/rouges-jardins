import { ClientError } from 'graphql-request';
import Link from 'next/link';
import Media from 'react-media';

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
