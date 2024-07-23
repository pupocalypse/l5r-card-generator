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

export default NameBanner;

const BannerEnd = ({ placement }: { placement: 'left' | 'right' }) => {
	const classes = [styles.end, styles[`end--${placement}`]].join(' ');

	return <div className={classes} />;
};
