import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';

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
		<div>
			<h3>Payment OK - Success Page</h3>
		</div>
	);
}
