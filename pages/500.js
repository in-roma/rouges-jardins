import Head from 'next/head';

// Components
import Layout from '../components/layout';

// Styles
import styles from '../styles/Page500.module.scss';

export default function Custom500() {
	return (
		<>
			<Head>
				<title>Problème serveur - erreur 500</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta
					name="description"
					content="Problème serveur - erreur 500"
				/>
				<meta name="robots" content="noindex" />
				<meta name="googlebot" content="noindex" />
			</Head>
			<Layout>
				<div className={styles.container500}>
					<div className={styles.content500}>
						<div className={styles.text500}>
							<h2>- Problème serveur - </h2>
							<span>
								Le serveur du site rencontre un problème
								momentané.
							</span>
							<span>
								Nous vous invitons à vous reconnecter
								ultérieurement.
							</span>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}
