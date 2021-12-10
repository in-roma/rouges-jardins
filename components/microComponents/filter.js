// Components
import styles from '../../styles/components/microComponents/Filter.module.scss';

export default function Filter({ categories, onChangeCategory }) {
	return (
		<form type="get" className={styles.containerSelectFilter}>
			<select className={styles.selectFilter} onChange={onChangeCategory}>
				<option value={[5, 6, 7, 11, 12, 13, 14, 15]}>Toutes</option>
				{categories.nodes.map((el) => (
					<option key={el.categoryId} value={[el.categoryId]}>
						{el.name}
					</option>
				))}
			</select>
		</form>
	);
}
