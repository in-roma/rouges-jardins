import Image from 'next/image';

// Components
import styles from '../../styles/components/microComponents/Button.module.scss';

export default function Button({ text, onClick, name }) {
	return (
		<button className={styles.buttonCart} onClick={onClick} name={name}>
			{text}
		</button>
	);
}
