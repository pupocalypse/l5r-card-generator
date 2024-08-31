export enum MajorClan {
	crab = 'Crab',
	crane = 'Crane',
	dragon = 'Dragon',
	lion = 'Lion',
	mantis = 'Mantis',
	phoenix = 'Phoenix',
	scorpion = 'Scorpion',
	spider = 'Spider',
	unicorn = 'Unicorn',
}

const CLANS = Object.keys(MajorClan);

const FAMILIES = {
	crab: ['Hida', 'Hiruma', 'Kaiu', 'Kuni', 'Toritaka', 'Yasuki'] as const,
	crane: ['Asahina', 'Daidoji', 'Doji', 'Kakita'] as const,
	dragon: ['Kitsuki', 'Mirumoto', 'Tamori', 'Togashi'] as const,
	lion: ['Akodo', 'Ikoma', 'Kitsu', 'Matsu'] as const,
	mantis: ['Kitsune', 'Moshi', 'Tsuruchi', 'Yoritomo'] as const,
	phoenix: ['Agasha', 'Asako', 'Isawa', 'Shiba'] as const,
	scorpion: ['Bayushi', 'Shosuro', 'Soshi', 'Yogo'] as const,
	spider: [] as const,
	unicorn: ['Horiuchi', 'Ide', 'Iuchi', 'Moto', 'Shinjo', 'Utaku'] as const,
} satisfies Record<keyof typeof MajorClan, string[]>;

export enum Class {
	Bushi = 'Bushi',
	Courtier = 'Courtier',
	Shugenja = 'Shugenja',
	Monk = 'Monk',
}

const CLASSES = Object.keys(Class);

export enum Job {
	Yojimbo = 'Yojimbo',
	Magistrate = 'Magistrate',
	Scout = 'Scout',
	Ronin = 'Ronin',
	Merchant = 'Merchant',
	Craftsman = 'Craftsman',
	Artisan = 'Artisan',
	Abbot = 'Abbot',
	Diplomat = 'Diplomat',
	Advisor = 'Advisor',
	Chancellor = 'Chancellor',
}

export enum EliteJob {
	Daimyo = 'Daimyo',
	Shogun = 'Shogun',
	'Jade Champion' = 'Jade Champion',
	'Emerald Champion' = 'Emerald Champion',
	Empress = 'Empress',
	Emperor = 'Emperor',
}

export default {
	CLANS,
	FAMILIES,
	CLASSES,
};
