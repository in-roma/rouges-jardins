// Components
import Header from '../components/header';
import Footer from '../components/footer';

export default function Layout({ children }) {
	return (
		<div>
			<Header />
			<div>{children}</div>
			<Footer />
		</div>
	);
}
