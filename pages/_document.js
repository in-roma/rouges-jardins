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
					{/* <link
						href="https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Poppins:wght@200;300;400;500;600;700;800&display=swap"
						rel="stylesheet"
					/> */}
					<link
						rel="preload"
						href="/fonts/Lora/static/Lora-SemiBold.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Lora/static/Lora-Bold.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Poppins/Poppins-ExtraLight.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Poppins/Poppins-Light.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Poppins/Poppins-Regular.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Poppins/Poppins-Medium.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Poppins/Poppins-SemiBold.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Poppins/Poppins-Bold.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="manifest" href="/site.webmanifest" />
					<link
						rel="mask-icon"
						href="/safari-pinned-tab.svg"
						color="#5bbad5"
					/>
					<meta name="msapplication-TileColor" content="#da532c" />
					<meta name="theme-color" content="#ffffff" />
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
