import classNames from 'classnames';

import styles from './Card.module.scss';

import NameBanner from './NameBanner';
import ScrollSummary from './ScrollSummary';

const Card = () => {
	const cardStyles = classNames(styles.card);
	// tODO: push current selected clan class to `cardStyles`

	return (
		<div className={cardStyles}>
			<NameBanner />
			<div className={styles.image} />
			<ScrollSummary />
		</div>
	);
};

export default Card;
