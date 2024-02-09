import { Empty, Image, List } from 'antd';
import Item from 'antd/es/list/Item';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ItemInCart } from '../utils/interfaces';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import CatalogButton from '../components/CatalogButton';
import OrderButton from '../components/OrderButton';
import { cartStore } from '../utils/store';
import Title from 'antd/es/typography/Title';

const Cart: React.FC = observer(() => {
	const {
		cart,
		total,
		getItemInCartQuantity,
		changeItemInCartQuantity,
		removeItemFromCart,
	} = cartStore;

	return (
		<>
			<CatalogButton />
			<List
				size='small'
				itemLayout='vertical'
			>
				{cart.length ? (
					cart.map((item: ItemInCart) => (
						<Item
							key={item.item.id}
							actions={[
								<MinusOutlined
									onClick={() => changeItemInCartQuantity(item.item.id, -1)}
								/>,
								<Title level={3}>{getItemInCartQuantity(item.item.id)}</Title>,
								<PlusOutlined
									onClick={() => changeItemInCartQuantity(item.item.id, 1)}
								/>,
								<DeleteOutlined
									onClick={() => removeItemFromCart(item.item.id)}
								/>,
								<Title level={3}>${item.item.price * item.quantity}</Title>,
							]}
							extra={
								<Image
									style={{ blockSize: '5rem' }}
									src={item.item.image}
								/>
							}
						>
							<Title level={3}>{item.item.title}</Title>
						</Item>
					))
				) : (
					<Empty description='No items in cart' />
				)}
			</List>
			{cart.length ? (
				<>
					<Title level={2}>Total: ${total}</Title>
					<OrderButton />
				</>
			) : (
				<></>
			)}
		</>
	);
});

export default Cart;
