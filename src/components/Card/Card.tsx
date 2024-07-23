import NameBanner from './NameBanner';
import ScrollSummary from './ScrollSummary';

import styles from './Card.module.scss';

const Card = () => {
	const cardStyles = [styles.card];
	// tODO: push current selected clan class to `cardStyles`

	return (
		<div className={cardStyles.join(' ')}>
			<NameBanner />
			<div className={styles.image} />
			<ScrollSummary />
		</div>
	);
};

export default Card;
