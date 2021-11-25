export default function Success() {
	// const {
	// 	query: { session_id },
	// } = useRouter();

	// const { data, error } = useSWR(
	// 	() => `/api/checkout_sessions/${session_id}`,
	// 	fetcher
	// );

	// useEffect(() => {
	// 	if (data) {
	// 		shootFireworks();
	// 		clearCart();
	// 	}
	// }, [data]);

	return (
		<div>
			<h3>Payment OK - Success Page</h3>
		</div>
	);
}
