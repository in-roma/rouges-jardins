import styles from '../../styles/components/microComponents/Tag.module.scss';

export default function Tag({ text, color }) {
	return (
		<div style={{ backgroundColor: `${color}` }} className={styles.tagCard}>
			{text}
		</div>
	);
}
