import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '../utils/paths';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../utils/store';

const CartButton: React.FC = observer(() => {
	const { cart, getItemInCartQuantity } = cartStore;

	const navigate = useNavigate();

	const redirectToCart = useCallback(() => {
		navigate(paths.cart);
	}, [navigate]);

	return (
		<Popover
			open={!!cart.length}
			content={getItemInCartQuantity()}
		>
			<Button
				onClick={redirectToCart}
				icon={<ShoppingCartOutlined style={{ scale: '1.25' }} />}
				size='large'
			></Button>
		</Popover>
	);
});

export default CartButton;
