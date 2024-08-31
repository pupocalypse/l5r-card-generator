import { z } from 'zod';
import Constants from '../../constants/Constants';

export type CardBuilderFormValues = z.infer<typeof schemaCardBuilderForm>;

const schemaCardBuilderForm = z.object({
	clan: z.enum(Constants.CLANS as [string, ...string[]]),
	family: z.string(),
	name: z.string(),
	displayName: z.string(),
	useDisplayName: z.boolean(),
	moniker: z.string(),
	class: z.string(), // TODO: enum
	job: z.string(), // TODO: enum (tied to job?)
	title: z.string(),
	keywords: z.array(z.string()), // TODO: could include enum of ads/disads? in addition to custom string
	quote: z.string(),
});

export default {
	schemaCardBuilderForm,
};
