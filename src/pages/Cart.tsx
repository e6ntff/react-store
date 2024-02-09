import { Empty, Flex, Image, List, Typography } from 'antd';
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
	const { cart, total, changeItemInCartQuantity, removeItemFromCart } =
		cartStore;

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
								<Flex
									gap={16}
									align='center'
								>
									<MinusOutlined
										onClick={() => changeItemInCartQuantity(item.item.id, -1)}
									/>
									<Typography.Text
										strong
										style={{ fontSize: '1.5rem' }}
									>
										{item.quantity}
									</Typography.Text>
									<PlusOutlined
										onClick={() => changeItemInCartQuantity(item.item.id, 1)}
									/>
								</Flex>,
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
