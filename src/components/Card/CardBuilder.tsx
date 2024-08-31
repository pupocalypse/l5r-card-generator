import CardDetails from './CardDetails';
import CardPreview from './CardPreview';
import { FormProvider, useForm } from 'react-hook-form';
import type { CardBuilderFormValues } from '../../validators/schemas/CardBuilderSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Validators from '../../validators/Validators';

import styles from './CardBuilder.module.scss';

const CardBuilder = () => {
	const formMethods = useForm<CardBuilderFormValues>({
		resolver: zodResolver(Validators.SCHEMAS.schemaCardBuilderForm),
		defaultValues: {
			clan: '',
			family: '',
			name: '',
			displayName: '',
			useDisplayName: false,
			moniker: '',
			class: '',
			job: '',
			title: '',
			keywords: [],
			quote: '',
		},
	});

	return (
		<FormProvider {...formMethods}>
			<div className={styles.wrapper}>
				<CardPreview />
				<CardDetails />
			</div>
		</FormProvider>
	);
};

export default CardBuilder;
