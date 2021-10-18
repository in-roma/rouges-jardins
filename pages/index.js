// Components
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home(props) {
	console.log(props.data);
	return (
		<Layout>
			{props.data.map((el) => (
				<div>
					<h3>{el.title.rendered}</h3>
					<h4>{el.excerpt.rendered}</h4>
				</div>
			))}
		</Layout>
	);
}
export async function getStaticProps() {
	const res = await fetch('http://www.jcou8054.odns.fr/wp-json/wp/v2/posts');
	const data = await res.json();

	return {
		props: { data },
	};
}
