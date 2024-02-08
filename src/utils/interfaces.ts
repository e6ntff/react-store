export interface Item {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}
export interface ItemInCart {
	item: Item;
	quantity: number;
}

export interface Category {
	name: string;
	title: string;
}
