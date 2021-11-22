import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'nuka-carousel';
import useMediaQuery from '@mui/material/useMediaQuery';

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
	color,
	colorCard,
	textColorCard,
}) {
	const breakPoint1000 = useMediaQuery('(max-width:950px)');
	const breakPoint700 = useMediaQuery('(max-width:500px)');

	let SlideToShowNumber = 3;
	if (breakPoint1000) {
		SlideToShowNumber = 2;
	}
	if (breakPoint700) {
		SlideToShowNumber = 1;
	}

	const settings = {
		cellAlign: 'left',
		slidesToShow: SlideToShowNumber,
		wrapAround: true,
		cellAlign: 'center',
		framePadding: '24px',
		// transitionMode: 'fade',
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

						prevButtonClassName: 'iconLeftMore',

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
