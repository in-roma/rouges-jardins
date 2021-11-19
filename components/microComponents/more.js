import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'nuka-carousel';

// Components
import CardMini from '../../components/microComponents/cardMini';
import leftArrow from '../../public/arrow-left.svg';
import rightArrow from '../../public/arrow-right.svg';

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
	const settings = {
		cellAlign: 'left',
		slidesToShow: 3,
		wrapAround: true,
	};
	return (
		<div className={styles.containerMore}>
			<div className={styles.headerMore}>
				<h1 className={styles.titleMore}>Suggestions</h1>
				<Link href={slug}>
					<a className={styles.linkMore}>{linkText}</a>
				</Link>
			</div>
			<div className={styles.contentMore}>
				<Carousel
					{...settings}
					defaultControlsConfig={{
						prevButtonStyle: {
							marginRight: '28px',
						},

						pagingDotsStyle: {
							display: 'none',
						},
					}}
					renderCenterLeftControls={({ previousSlide }) => (
						<button
							onClick={previousSlide}
							className={styles.iconLeftMore}
						>
							<Image src={leftArrow} alt="left arrow icon" />
						</button>
					)}
					renderCenterRightControls={({ nextSlide }) => (
						<button
							onClick={nextSlide}
							className={styles.iconRightMore}
						>
							<Image src={rightArrow} alt="right arrow icon" />
						</button>
					)}
				>
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
				</Carousel>
			</div>
		</div>
	);
}
