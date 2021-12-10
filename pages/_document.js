import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="fr">
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, maximal-scale=1"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Poppins:wght@200;300;400;500;600;700;800&display=swap"
						rel="stylesheet"
					/>
					<script
						defer
						data-domain="rouges-jardins-8yzlk.ondigitalocean.app"
						src="https://plausible.io/js/plausible.js"
					></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
