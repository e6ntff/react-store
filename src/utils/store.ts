import { makeAutoObservable } from 'mobx';
import { Category, Item, ItemInCart } from './interfaces';
import categories from './categories';

class ItemsStore {
	items: Item[] = [];
	currentItems: Item[] = [];
	currentItemId: number = 0;
	currentCategory: Category = categories[0];

	setItems = (items: Item[]) => {
		this.items = items;
	};

	setCurrentItemId = (id: number) => {
		this.currentItemId = id;
	};

	filterItemsByName = (name: string) => {
		if (name) {
			const filteredItems = this.items.filter((el: Item) =>
				el.title.toLowerCase().includes(name.toLowerCase())
			);
			this.currentItems = filteredItems;
		} else {
			this.setCurrentItemsByCategory(this.currentCategory);
		}
	};

	setCurrentCategory = (name: string) => {
		this.currentCategory =
			categories.find((el: Category) => el.name === name) || categories[0];
		localStorage.setItem('category', name);
		this.setCurrentItemsByCategory(this.currentCategory);
	};

	setCurrentItemsByCategory = (category: Category) => {
		const currentItems = this.items.filter(
			(el: Item) => el.category === category.name
		);
		this.currentItems = currentItems;
	};

	constructor() {
		makeAutoObservable(this);
	}
}

class CartStore {
	ItemsStore: ItemsStore;
	cart: ItemInCart[] = [];
	order: ItemInCart[] = [];
	total: number = 0;

	setCart = (cart: ItemInCart[]) => {
		this.cart = cart;
		localStorage.setItem('cart', JSON.stringify(this.cart));
		this.countTotal();
	};

	addItemToCart = (id: number) => {
		const itemToAdd = this.ItemsStore.items.find((el: Item) => el.id === id);

		if (itemToAdd) {
			this.setCart([{ item: itemToAdd, quantity: 1 }, ...this.cart]);
		}
	};

	removeItemFromCart = (id: number) => {
		this.setCart(this.cart.filter((el: ItemInCart) => el.item.id !== id));
	};

	changeItemInCartQuantity = (id: number, value: number) => {
		this.setCart(
			this.cart.map((el: ItemInCart) => {
				if (el.item.id === id && el.quantity + value !== 0) {
					return { ...el, quantity: el.quantity + value };
				}
				return el;
			})
		);
	};

	setOrder = () => {
		this.order = this.cart;
		const total = this.total;
		this.setCart([]);
		this.total = total;
	};

	countTotal = () => {
		this.total =
			Math.floor(
				this.cart.reduce(
					(acc: number, item: ItemInCart) =>
						acc + item.item.price * item.quantity,
					0
				) * 100
			) / 100;
	};

	constructor(itemsStore: ItemsStore) {
		this.ItemsStore = itemsStore;
		makeAutoObservable(this);
	}
}

export const itemsStore = new ItemsStore();

export const cartStore = new CartStore(itemsStore);
