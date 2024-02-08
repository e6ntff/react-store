import { makeAutoObservable } from 'mobx';
import { Category, Item, ItemInCart } from './interfaces';
import categories from './categories';

class ItemsStore {
	items: Item[] = [];
	currentItems: Item[] = [];
	currentItem: Item = this.items[0];
	currentCategory: Category = categories[0];

	setItems = (items: Item[]) => {
		this.items = items;
	};

	setCurrentItem = (id: number) => {
		this.currentItem =
			this.items.find((el: Item) => el.id === id) || this.items[0];
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

	setCart = (cart: ItemInCart[]) => {
		this.cart = cart;
		localStorage.setItem('cart', JSON.stringify(this.cart));
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

	clearCart = () => {
		this.setCart([]);
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

	getItemInCartQuantity = (id?: number) => {
		if (id) {
			return this.cart.reduce(
				(acc: number, item: ItemInCart) =>
					acc + (item.item.id === id ? item.quantity : 0),
				0
			);
		} else {
			return this.cart.reduce(
				(acc: number, item: ItemInCart) => acc + item.quantity,
				0
			);
		}
	};

	setOrder = () => {
		this.order = this.cart;
		this.setCart([]);
	};

	constructor(itemsStore: ItemsStore) {
		this.ItemsStore = itemsStore;
		makeAutoObservable(this);
	}
}

export const itemsStore = new ItemsStore();

export const cartStore = new CartStore(itemsStore);
