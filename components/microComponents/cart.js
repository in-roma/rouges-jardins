import Image from 'next/image';

// Components
import styles from '../../styles/components/microComponents/Cart.module.scss';

export default function Cart({ onSubmitCart, products = 1 }) {
	return (
		<button className={styles.buttonCart} onClick={onSubmitCart}>
			<span>Panier</span>
			{products && (
				<div className={styles.productCountCart}>
					<span>{products}</span>
				</div>
			)}
		</button>
	);
}
