// Components
import styles from '../../styles/components/microComponents/Filter.module.scss';

export default function Filter({ categories, onChangeCategory }) {
	return (
		<form>
			<select className={styles.selectFilter} onChange={onChangeCategory}>
				<option key="0" value="Toutes" default>
					Toutes
				</option>
				{categories.nodes.map((el) => (
					<option key={el.categoryId} value={el.name}>
						{el.name}
					</option>
				))}
			</select>
		</form>
	);
}
