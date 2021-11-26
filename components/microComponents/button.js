import Image from 'next/image';

// Components
import styles from '../../styles/components/microComponents/button.module.scss';

export default function Button({ onClick, text, name }) {
	return (
		<button className={styles.buttonCart} onClick={onClick} name={name}>
			{text}
		</button>
	);
}
