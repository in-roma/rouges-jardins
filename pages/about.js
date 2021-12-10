import Image from 'next/image';
import Head from 'next/head';

// Components
import Layout from '../components/layout';

// Layout
import styles from '../styles/About.module.scss';

export default function About() {
	return (
		<>
			<Head>
				<title>À propos</title>

				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
				/>
				<meta name="description" content="Section Guy Grandjean" />
				<meta name="robots" />
				<meta name="googlebot" />
			</Head>
			<Layout>
				<section className={styles.containerAbout}>
					<div className={styles.navBarAbout}>
						<h1 className={styles.titreAbout}>À propos</h1>
					</div>
					<article className={styles.contentAbout}>
						<p className={styles.textAbout}>
							<strong>
								Guy est né en 1951 dans la région parisienne.
							</strong>
							&nbsp;L’été, il passe ses vacances à Scaër en
							Bretagne où il travaille dans la ferme familiale.
							C’est au travers de cette confrontation avec une
							campagne “brute” que naît sa fascination pour la
							nature.
						</p>

						<p className={styles.textAbout}>
							Après un cycle universitaire en biologie, il quitte
							paris et part vivre dans la région nantaise. Pendant
							un temps il est professeur de travaux manuels puis
							reprend ses études sur le tard, d’abord pharma, puis
							internat de biologie. Il ouvre en 1989 un
							laboratoire d’analyses médicales dans la commune du
							Loroux Bottereaux.
						</p>
						<picture
							className={styles.pictureAbout}
							style={{
								display: 'block',
								position: 'relative',
								borderRadius: '6px',
								overflow: 'hidden',
							}}
						>
							<Image
								src={
									'http://www.jcou8054.odns.fr/wp-content/uploads/2021/11/DSC_3695-1.jpeg'
								}
								alt=""
								layout="fill"
								objectFit="cover"
							/>
						</picture>
						<p className={styles.textAbout}>
							Il exerce pendant 32 ans. Féru de bactériologie, il
							essaie tout au long des ces années de faire vivre un
							laboratoire à l’excellence médicale. Au quotidien,
							il affectionne particulièrement les prises de sang,
							moment de partage.
						</p>
						<p className={styles.textAbout}>
							Parallèlement à ses activités professionnelles, il
							écrit des chroniques sur les relations entre l’homme
							et la nature, d’abord dans les 1990 sous la forme
							d’un fanzine informel envoyé par courrier à ses
							proches, plus tard avec sa première publication en
							2004&nbsp;
							<em>NZO ou les grimoires d’un vieux singe</em>. Elle
							sera suivie d’autres livres dont&nbsp;
							<em>De nature Clandestine</em> en 2015, une
							collaboration avec la plasticienne&nbsp;
							<a
								href="https://christinelaquet.com/"
								target="_blank"
								rel="noreferrer"
							>
								Christine Laquet
							</a>
							. En 2009, il commence à publier ses chroniques sur
							ce blog, puis plus récemment sous forme de podcasts
							diffusés sur&nbsp;
							<a
								href="https://radio-chateaubriant.com/category/rouges-jardins/"
								target="_blank"
								rel="noreferrer"
							>
								Radio Châteaubriant.
							</a>
						</p>
						<p className={styles.textAbout}>
							Aujourd’hui Guy est un jeune retraité, continue à
							partager ses histoires...
						</p>
						<p className={styles.emailTextAbout}>
							Vous pouvez le contacter avec cet&nbsp;
							<a
								href="mailto: guygrandjean@icloud.com"
								className={styles.emailAbout}
							>
								email
							</a>
							.
						</p>
					</article>
				</section>
			</Layout>
		</>
	);
}
