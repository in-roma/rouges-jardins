import styles from '../styles/Home.module.css';

export default function Home(props) {
	console.log(props.data);
	return <div className={styles.container}></div>;
}
export async function getStaticProps() {
	const res = await fetch('http://www.jcou8054.odns.fr/wp-json/wp/v2/posts');
	const data = await res.json();

	return {
		props: { data },
	};
}
