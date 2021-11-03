// Components
import styles from '../../styles/components/microComponents/Filter.module.scss';

export default function Filter() {
	return (
		<form>
			<select className={styles.selectFilter}>
				<option value="toutes">Toutes</option>
				<option value="medecine">Médecine</option>
				<option selected value="ecologie">
					Écologie
				</option>
				<option value="nature">Nature</option>
			</select>
		</form>
	);
}
