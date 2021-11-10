import Image from 'next/image';

// Components
import styles from '../../styles/components/microComponents/Cart.module.scss';
import cartIcon from '../../public/shopping-cart.svg';

export default function Cart({ onSubmitCart, products = 1 }) {
	return (
		<button className={styles.buttonCart} onClick={onSubmitCart}>
			<span>Panier</span>
			{products && (
				<div className={styles.productCountCart}>{products}</div>
			)}
			{/* <Image
				className={styles.iconCart}
				src={cartIcon}
				alt="cross icon"
			/> */}
		</button>
	);
}
