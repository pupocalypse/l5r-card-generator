import classNames from 'classnames';
import NameBanner from './NameBanner';
import ScrollSummary from './ScrollSummary';
import { useFormContext } from 'react-hook-form';
import type { CardBuilderFormValues } from '../../validators/schemas/CardBuilderSchemas';

import styles from './CardPreview.module.scss';

const CardPreview = () => {
	const { watch } = useFormContext<CardBuilderFormValues>();
	const selectedClan = watch('clan');

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
