// Styling
import styles from '../../styles/components/microComponents/Quantity.module.scss';

export default function Quantity({ substract, quantity = 0, add }) {
	return (
		<div className={styles.quantityContainer}>
			<button className={styles.quantityButton} onClick={substract}>
				-
			</button>
			<span className={styles.quantityValue}>{quantity}</span>
			<button className={styles.quantityButton} onClick={add}>
				+
			</button>
		</div>
	);
}
