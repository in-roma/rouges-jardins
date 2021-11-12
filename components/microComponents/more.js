import Link from 'next/link';

// Components
import CardMini from '../../components/microComponents/cardMini';

// Layout
import styles from '../../styles/components/microComponents/More.module.scss';

export default function More({
	slug,
	linkText,
	titleCard,
	imageUrlCard,
	dateCard,
	categoryCard,
	colorCard,
	textColorCard,
}) {
	return (
		<div className={styles.containerMore}>
			<div className={styles.headerMore}>
				<h1 className={styles.titleMore}>Suggestions</h1>
				<Link href={slug}>
					<a className={styles.linkMore}>{linkText}</a>
				</Link>
			</div>
			<div className={styles.contentMore}>
				<CardMini
					title={titleCard}
					imageUrl={imageUrlCard}
					date={dateCard}
					category={categoryCard}
					color={colorCard}
					textColor={textColorCard}
				/>
				<CardMini
					title={titleCard}
					imageUrl={imageUrlCard}
					date={dateCard}
					category={categoryCard}
					color={colorCard}
					textColor={textColorCard}
				/>
				<CardMini
					title={titleCard}
					imageUrl={imageUrlCard}
					date={dateCard}
					category={categoryCard}
					color={colorCard}
					textColor={textColorCard}
				/>
			</div>
		</div>
	);
}
