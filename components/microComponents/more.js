import Link from 'next/link';

// Components
import CardMini from '../../components/microComponents/cardMini';

// Layout
import styles from '../../styles/components/microComponents/More.module.scss';

export default function More({
	data,
	slug,
	linkText,
	titleCard,
	imageUrlCard,
	dateCard,
	categoryCard,
	colorCard,
	textColorCard,
}) {
	console.log('this is data (more)', data);
	return (
		<div className={styles.containerMore}>
			<div className={styles.headerMore}>
				<h1 className={styles.titleMore}>Suggestions</h1>
				<Link href={slug}>
					<a className={styles.linkMore}>{linkText}</a>
				</Link>
			</div>

			<div className={styles.contentMore}>
				data.map(el =>(
				<CardMini
					title={el.node.title}
					imageUrl={el.node.featuredImage.node.sourceUrl}
					date={el.node.date}
					category={el.node.categories.nodes[0].name}
					color={colorCard}
					textColor={textColorCard}
				/>
				)
			</div>
		</div>
	);
}
