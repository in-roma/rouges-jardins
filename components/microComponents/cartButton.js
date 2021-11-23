import Link from 'next/link';
import Image from 'next/image';

// Components
import styles from '../../styles/components/microComponents/CartButton.module.scss';

export default function CartButton({ products = 1 }) {
	return (
		<button className={styles.buttonCart}>
			<Link href="/cart">
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
