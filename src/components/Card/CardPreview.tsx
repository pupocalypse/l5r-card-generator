import { useContext } from 'react';
import classNames from 'classnames';
import NameBanner from './NameBanner';
import ScrollSummary from './ScrollSummary';
import { CardContext } from './CardBuilder';

import styles from './CardPreview.module.scss';

const CardPreview = () => {
	const { selectedClan } = useContext(CardContext);

	const cardStyles = classNames(styles.card, { [styles[selectedClan]]: !!selectedClan });

	return (
		<div className={cardStyles}>
			<NameBanner />
			<div className={styles.image} />
			<ScrollSummary />
		</div>
	);
};

export default CardPreview;
