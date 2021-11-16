import Link from 'next/link';

// Components
import CardMini from '../../components/microComponents/cardMini';

// Layout
import styles from '../../styles/components/microComponents/More.module.scss';

export default function More({
	dataMore,
	slug,
	linkText,
	titleCard,
	imageUrlCard,
	dateCard,
	categoryCard,
	colorCard,
	textColorCard,
}) {
	// console.log('this is dataMore', dataMore);
	return (
		<div className={styles.containerMore}>
			<div className={styles.headerMore}>
				<h1 className={styles.titleMore}>Suggestions</h1>
				<Link href={slug}>
					<a className={styles.linkMore}>{linkText}</a>
				</Link>
			</div>

			<div className={styles.contentMore}>
				{dataMore.map((el) => (
					<CardMini
						key={el.node.id}
						color={colorCard}
						textColor={textColorCard}
						title={el.node.title}
						imageUrl={el.node.featuredImage.node.sourceUrl}
						slug={el.node.slug}
						category={el.node.categories.nodes[0].name}
					/>
				))}
			</div>
		</div>
	);
}
