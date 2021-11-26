// Styling
import styles from '../../styles/components/microComponents/Quantity.module.scss';

export default function Quantity({ add, remove, quantity = 0, name }) {
	return (
		<div className={styles.quantityContainer}>
			<button
				className={styles.quantityButton}
				onClick={remove}
				name={name}
			>
				-
			</button>
			<span className={styles.quantityValue}>{quantity}</span>
			<button className={styles.quantityButton} onClick={add} name={name}>
				+
			</button>
		</div>
	);
}
