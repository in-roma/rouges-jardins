import Image from 'next/image';

// Components
import styles from '../../styles/components/microComponents/Button.module.scss';

export default function Button({ text, onClick }) {
	return (
		<button className={styles.button} onClick={onClick}>
			{text}
		</button>
	);
}
