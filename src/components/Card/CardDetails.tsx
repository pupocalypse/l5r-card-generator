import { useContext } from 'react';
import Constants, { MajorClan } from '../../constants/Constants';
import styles from './CardDetails.module.scss';
import { CardContext } from './CardBuilder';

const CardDetails = () => {
	const { selectedClan, setSelectedClan } = useContext(CardContext);

	return (
		<div className={styles.wrapper}>
			<select
				className={styles['clan-dropdown']}
				value={selectedClan}
				onChange={(e) => setSelectedClan(e.target.value as '' | MajorClan)}
			>
				<option value=''>Select clan...</option>
				{Constants.CLANS.map((clan) => (
					<option key={clan} value={clan}>
						{MajorClan[clan as keyof typeof MajorClan]}
					</option>
				))}
			</select>
		</div>
	);
};

export default CardDetails;
