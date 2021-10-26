import { ClientError } from 'graphql-request';
import Link from 'next/link';

// Component
import Tag from './tag';
import DateCard from './dateCard';

// Styling
import styles from '../../styles/components/microComponents/CardMedium.module.scss';

export default function CardMedium({
	title,
	text,
	imageUrl,
	imageAltText,
	date,
	category,
	colorTag,
	textColor,
}) {
	return (
		<div className={styles.cardMedium}>
			<Tag text={category} color={colorTag} textColor={textColor} />
			<div className={styles.cardMediumPicture}>
				<img src={imageUrl}></img>
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
			<div className={styles.titleCardMedium}>
				{title} <DateCard date={date} />
			</div>
		</div>
	);
}
