import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import Head from 'next/head';

// Components
import Layout from '../components/layout';

export default function Success() {
	const fetcher = (url) => axios.get(url).then((res) => res.data);

	const {
		query: { session_id },
	} = useRouter();

	const { data, error } = useSWR(
		() => `/api/checkout_sessions/${session_id}`,
		fetcher
	);

	useEffect(() => {
		if (data) {
			console.log('succes data');
		}
	}, [data]);

	return (
		<>
			<Head>
				<title>Paiement enregistré</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta
					name="description"
					content="Page Paiement enregistré - Blog par Guy Grandjean"
				/>
			</Head>
			<Layout>
				<div>
					<h3>Payment OK - Success Page</h3>
				</div>
			</Layout>
		</>
	);
}
