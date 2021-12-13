import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';

// Components
import Layout from '../components/layout';

// Styles
import styles from '../styles/Success.module.scss';

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
			// console.log('succes data');
		}
	}, [data]);

	return (
		<>
			<Head>
				<title>Commande effectuée</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
				/>
				<meta
					name="description"
					content="Page Paiement enregistré - Blog par Guy Grandjean"
				/>
				<meta name="robots" content="noindex" />
				<meta name="googlebot" content="noindex" />
			</Head>

			<Layout>
				<div className={styles.containerSuccess}>
					<div className={styles.contentSuccess}>
						<div className={styles.textSuccess}>
							<h2>- Succès de votre commmande - </h2>
							<div
								className={styles.pictureSuccess}
								style={{
									display: 'block',
									position: 'relative',
									borderRadius: '6px',
									overflow: 'hidden',
								}}
							>
								<Image
									src={
										'http://www.jcou8054.odns.fr/wp-content/uploads/2015/10/SINGE-SANS-NEZ-scaled.jpg'
									}
									layout="fill"
									objectFit="cover"
									alt={'image de signes pour dire merci'}
								/>
							</div>
							<span>
								Votre commande a bien été enregistrée, merci !!!
							</span>
							<span>
								Vous allez recevoir un email de confirmation
								sous peu.
							</span>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}
