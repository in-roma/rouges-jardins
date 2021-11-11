import Image from 'next/image';

// Components
import Layout from '../components/Layout';

// Layout
import styles from '../styles/About.module.scss';
import photoGuy from '../public/photoGuy.jpeg';

export default function About() {
	return (
		<Layout>
			<div className={styles.containerAbout}>
				<content className={styles.contentAbout}>
					<span className={styles.titreAbout}>À propos</span>

					<span className={styles.textAbout}>
						Guy est né en 1951 dans la région parisienne. L’été, il
						passe ses vacances à Skaer en Bretagne où il travaille
						dans la ferme familiale. C’est au travers de cette
						confrontation avec une campagne “brute” que naît sa
						fascination pour la nature.
					</span>
					<span className={styles.textAbout}>
						Après un cycle universitaire en biologie, il quitte
						paris et part vivre dans la région nantaise. Pendant un
						temps il est professeur de travaux manuels puis reprend
						ses études sur le tard, d’abord pharma, puis internat de
						biologie. Il ouvre en 1989 un laboratoire d’analyses
						médicales dans la commune du Loroux Bottereaux.
					</span>
					<div
						className={styles.pictureAbout}
						style={{
							backgroundImage: `url("http://www.jcou8054.odns.fr/wp-content/uploads/2021/11/DSC_3695-1.jpeg")`,
						}}
					></div>
					<span className={styles.textAbout}>
						Il exerce pendant 32 ans. Féru de bactériologie, il
						essaie tout au long des ces années de faire vivre un
						laboratoire d’excellence médicale et où il fait bon de
						consulter et de travailler. Au quotidien, il affectionne
						particulièrement les prises de sang, moment de rencontre
						avec l’autre et de partage.
					</span>
					<span className={styles.textAbout}>
						Parallèlement à ses activités professionnelles, il écrit
						des chroniques sur les relations entre l’homme et la
						nature, d’abord dans les 1990 sous la forme d’un fanzine
						informel envoyé par courrier à ses proches, plus tard
						avec sa première publication en 2004 “NZO ou les
						grimoires d’un vieux singe”. Elle sera suivie d’autres
						livres dont “De nature Clandestine” en 2015, une
						collaboration avec la plasticienne Christine Laquet. En
						2009, il commence à publier ses chroniques sur ce blog,
						puis plus récemment sous forme de podcasts diffusés sur
						Radio Châteaubriant avec Alain Moreau.
					</span>
					<span className={styles.textAbout}>
						Aujourd’hui Guy est un jeune retraité, continue à
						partager ses histoires et espère engager de nouveaux
						projets et collaborations.
					</span>
					<span className={styles.emailTextAbout}>
						Vous pouvez le contacter à cette adresse:
						<a
							href="mailto: guygrandjean@icloud.com"
							className={styles.emailAbout}
						>
							email
						</a>
						.
					</span>
				</content>
			</div>
		</Layout>
	);
}
