import Head from 'next/head';
import Link from 'next/link';

// Components
import Layout from '../components/layout';

// Styles
import styles from '../styles/Page404.module.scss';

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
				<div className={styles.container404}>
					<div className={styles.content404}>
						<div className={styles.text404}>
							<h2>- Page Introuvable - </h2>
							<span>
								La page que vous recherchez n existe pas.
							</span>
							<Link href="/">
								<a>Retour à la page d accueil</a>
							</Link>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}
