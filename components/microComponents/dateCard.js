import Moment from 'react-moment';
import 'moment/locale/fr';
// Styling
import styles from '../../styles/components/microComponents/DateCard.module.scss';

export default function DateCard({ date }) {
	return (
		<div className={styles.dateCard}>
			<Moment format="LL">{date}</Moment>
		</div>
	);
}
