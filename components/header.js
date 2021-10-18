import Link from 'next/link';
import styles from '../styles/components/Header.module.css';

export default function Header() {
	return (
		<header>
			<Link href="/">
				<a>Rouges jardins</a>
			</Link>
			<Link href="/blog">
				<a>Chroniques</a>
			</Link>
			<Link href="/publications">
				<a>Publications</a>
			</Link>
			<Link href="/about">
				<a>About</a>
			</Link>
		</header>
	);
}
