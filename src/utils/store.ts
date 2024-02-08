import { makeAutoObservable, set } from 'mobx';
import { Item, ItemInCart } from './interfaces';

class Store {
	items: Item[] = [];
	cart: ItemInCart[] = [];
	currentItem: Item | undefined;
	currentItems: Item[] = [];
	currentCategory: string = '';
	order: ItemInCart[] = [];

	setItems = (items: Item[]) => {
		this.items = items;
	};

	setCurrentCategory = (category: string) => {
		this.currentCategory = category;
		localStorage.setItem('category', category);
		this.setCurrentItemsByCategory(category);
	};

	setCurrentItemsByCategory = (name: string) => {
		const currentItems = this.items.filter(
			(el: Item) => el.category === name.slice(1)
		);
		this.currentItems = currentItems;
	};

	addItemToCart = (id: number) => {
		const itemToAdd = this.items.find((el: Item) => el.id === id);

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

	setCart = (cart: ItemInCart[]) => {
		this.cart = cart;
		localStorage.setItem('cart', JSON.stringify(this.cart));
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

	setCurrentItem = (id: number) => {
		this.currentItem = this.items.find((el: Item) => el.id === id);
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

	setOrder = () => {
		this.order = this.cart;
		this.setCart([]);
	};

	constructor() {
		makeAutoObservable(this);
	}
}

const store = new Store();

export default store;
