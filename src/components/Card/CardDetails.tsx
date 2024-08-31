import { Controller, useFormContext } from 'react-hook-form';
import Constants, { MajorClan } from '../../constants/Constants';
import type { CardBuilderFormValues } from '../../validators/schemas/CardBuilderSchemas';

import styles from './CardDetails.module.scss';

const CardDetails = () => {
	const { control } = useFormContext<CardBuilderFormValues>();

	return (
		<div className={styles.wrapper}>
			<Controller
				control={control}
				name='clan'
				render={({ field: { value, onChange } }) => (
					<select className={styles['clan-dropdown']} value={value} onChange={onChange}>
						<option value=''>Minor/No Clan</option>
						{Constants.CLANS.map((clan) => (
							<option key={clan} value={clan}>
								{MajorClan[clan as keyof typeof MajorClan]}
							</option>
						))}
					</select>
				)}
			/>
		</div>
	);
};

export default CardDetails;
