import styles from '../../styles/components/microComponents/Tag.module.scss';

export default function TagPost({ text, color, textColor = 'black' }) {
	return (
		<div
			style={{ backgroundColor: `${color}`, color: `${textColor}` }}
			className={styles.tagPost}
		>
			{text}
		</div>
	);
}
