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
					<link
						href="https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Poppins:wght@200;300;400;500;600;700;800&display=swap"
						rel="stylesheet"
					/>
					<script
						defer
						data-domain="rouges-jardins-8yzlk.ondigitalocean.app"
						src="https://plausible.io/js/plausible.js"
					></script>
					<script
						type="text/javascript"
						dangerouslySetInnerHTML={{
							__html: `
						!function(a,b,c,d,e,f,g,h){a.RaygunObject=e,a[e]=a[e]||function(){
						(a[e].o=a[e].o||[]).push(arguments)},f=b.createElement(c),g=b.getElementsByTagName(c)[0],
						f.async=1,f.src=d,g.parentNode.insertBefore(f,g),h=a.onerror,a.onerror=function(b,c,d,f,g){
						h&&h(b,c,d,f,g),g||(g=new Error(b)),a[e].q=a[e].q||[],a[e].q.push({
						e:g})}}(window,document,"script","//cdn.raygun.io/raygun4js/raygun.min.js","rg4js");

						rg4js('apiKey', '${process.env.RAYGUN_API_KEY}');
						rg4js('enableCrashReporting', true);`,
						}}
					/>
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
