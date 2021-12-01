import Head from 'next/head';

// Components
import Layout from '../components/layout';

export default function Custom404() {
	return (
		<>
			<Head>
				<title>Page introuvable - erreur 404</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta
					name="description"
					content="Page introuvable - erreur 404"
				/>
				<meta name="robots" content="noindex" />
				<meta name="googlebot" content="noindex" />
			</Head>
			<Layout>
				<div>
					<h3>Page introuvable</h3>
				</div>
			</Layout>
		</>
	);
}
