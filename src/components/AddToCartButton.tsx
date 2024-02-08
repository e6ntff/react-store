import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo } from 'react';
import { ItemInCart } from '../utils/interfaces';
import { cartStore } from '../utils/store';

interface Props {
	id: number;
}

const AddToCartButton: React.FC<Props> = observer(({ id }) => {
	const { addItemToCart, removeItemFromCart, cart } = cartStore;

	const isItemInCart = useMemo(
		() => cart.some((el: ItemInCart) => el.item.id === id),
		[cart, id]
	);

	const toggleItemInCart = useCallback(() => {
		if (isItemInCart) {
			removeItemFromCart(id);
		} else {
			addItemToCart(id);
		}
	}, [removeItemFromCart, addItemToCart, isItemInCart, id]);

	return (
		<Button
			onClick={toggleItemInCart}
			type={isItemInCart ? 'primary' : 'default'}
		>
			<ShoppingCartOutlined />
		</Button>
	);
});

export default AddToCartButton;
