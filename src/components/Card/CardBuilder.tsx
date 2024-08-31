import { createContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { MajorClan } from '../../constants/Constants';
import CardDetails from './CardDetails';
import CardPreview from './CardPreview';

import styles from './CardBuilder.module.scss';

type CardContextValues = {
	selectedClan: '' | MajorClan;
	setSelectedClan: Dispatch<SetStateAction<'' | MajorClan>>;
};

export const CardContext = createContext<CardContextValues>({ selectedClan: '', setSelectedClan: () => {} });

const CardBuilder = () => {
	const [selectedClan, setSelectedClan] = useState<MajorClan | ''>('');

	return (
		<CardContext.Provider value={{ selectedClan, setSelectedClan }}>
			<div className={styles.wrapper}>
				<CardPreview />
				<CardDetails />
			</div>
		</CardContext.Provider>
	);
};

export default CardBuilder;
