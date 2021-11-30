import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const session = await stripe.checkout.sessions.create({
				mode: 'payment',
				payment_method_types: ['card'],
				line_items: req?.body?.items ?? [],
				success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/cart`,
				shipping_address_collection: {
					allowed_countries: ['FR'],
				},
			});

			res.status(200).json(session);
			console.log('Sucessful API request - handler function');
		} catch (err) {
			res.status(500).json({ statusCode: 500, message: err.message });
			console.log('issue with API request - handler function');
			console.log('error message:', err.message);
			console.log('these are items:', req.body.items);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
