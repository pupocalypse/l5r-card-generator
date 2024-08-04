import { memo } from 'react';
import classNames from 'classnames';

import styles from './NameBanner.module.scss';

const NameBanner = () => {
	return (
		<div className={styles.banner}>
			<BannerEnd placement='left' />

			<div className={styles.backdrop}>
				<h2 className={styles.text}>Name</h2>
				<h3 className={styles.text}>Title (Optional)</h3>
			</div>

			<BannerEnd placement='right' />
		</div>
	);
};

export default memo(NameBanner);

const BannerEnd = ({ placement }: { placement: 'left' | 'right' }) => {
	const classes = classNames(styles.end, styles[`end--${placement}`]);

	return <div className={classes} />;
};
