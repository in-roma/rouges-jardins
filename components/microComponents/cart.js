import Link from 'next/link';
import Image from 'next/image';

// Components
import styles from '../../styles/components/microComponents/Cart.module.scss';

export default function Cart({ products = 1 }) {
	return (
		<button className={styles.buttonCart}>
			<Link href="/checkout">
				<a>Panier</a>
			</Link>
			{products && (
				<div className={styles.productCountCart}>
					<span>{products}</span>
				</div>
			)}
		</button>
	);
}
