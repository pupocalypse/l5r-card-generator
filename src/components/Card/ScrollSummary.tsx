import { memo, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import styles from './ScrollSummary.module.scss';

const ScrollSummary = () => {
	return (
		<div className={styles.scroll}>
			<ScrollEnd placement='top' />

			<div className={styles.backdrop}>
				<div className={styles['inner-text']}>
					<h3 className={styles['heading-text']}>Experienced</h3>

					<ul className={styles.list}>
						<li>Keyword 1</li>
						<li>Keyword 2</li>
						<li>Keyword 3</li>
					</ul>

					<p className={styles.quote}>Something inspirational</p>
				</div>
			</div>

			<ScrollEnd placement='bottom' />
		</div>
	);
};

export default memo(ScrollSummary);

const ScrollEnd = ({ placement }: { placement: 'top' | 'bottom' }) => {
	const outerClasses = useMemo(() => classNames(styles.end, styles[`end--${placement}`]), [placement]);

	const wrapsClasses = useCallback((wrapPlacement: 'outer' | 'middle') => {
		return classNames(styles.wraps, styles[`wraps--${wrapPlacement}`]);
	}, []);

	const foilsClasses = useCallback((isSkinny = false) => {
		return classNames(styles.foil, { [styles['foil--skinny']]: isSkinny });
	}, []);

	return (
		<div className={outerClasses}>
			<div className={wrapsClasses('outer')} />
			<div className={foilsClasses(true)} />
			<div className={styles.underlay} />
			<div className={foilsClasses()} />
			<div className={wrapsClasses('middle')} />
			<div className={foilsClasses()} />
			<div className={styles.underlay} />
			<div className={foilsClasses(true)} />
			<div className={wrapsClasses('outer')} />
		</div>
	);
};

memo(ScrollEnd);
