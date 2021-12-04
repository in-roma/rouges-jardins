import Image from 'next/image';

// Components
import styles from '../../styles/components/microComponents/Button.module.scss';

export default function Button({ onClick, text, name, style }) {
	return (
		<button
			className={styles.buttonCart}
			onClick={onClick}
			name={name}
			style={style}
		>
			{text}
		</button>
	);
}
