// Components
import styles from '../../styles/components/microComponents/Filter.module.scss';

export default function Filter({ categories, onChangeCategory }) {
	return (
		<form type="get" className={styles.containerSelectFilter}>
			<select className={styles.selectFilter} onChange={onChangeCategory}>
				<option value={'all'} className={styles.optionFilter}>
					Toutes
				</option>
				{categories.nodes.map((el) => (
					<option
						key={el.categoryId}
						value={el.categoryId}
						className={styles.optionFilter}
					>
						{el.name}
					</option>
				))}
			</select>
		</form>
	);
}
