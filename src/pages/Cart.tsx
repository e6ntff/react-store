import { Descriptions, Empty, Image, List } from 'antd';
import Item from 'antd/es/list/Item';
import { observer } from 'mobx-react-lite';
import React from 'react';
import store from '../utils/store';
import { ItemInCart } from '../utils/interfaces';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import CatalogButton from '../components/CatalogButton';
import OrderButton from '../components/OrderButton';

const Cart: React.FC = observer(() => {
	const {
		cart,
		getItemInCartQuantity,
		changeItemInCartQuantity,
		removeItemFromCart,
	} = store;

	return (
		<>
			<CatalogButton />
			<List
				size='small'
				itemLayout='vertical'
			>
				{cart.length ? (
					cart.map(({ item }: ItemInCart) => (
						<Item
							key={item.id}
							actions={[
								<MinusOutlined
									onClick={() => changeItemInCartQuantity(item.id, -1)}
								/>,
								<span>{getItemInCartQuantity(item.id)}</span>,
								<PlusOutlined
									onClick={() => changeItemInCartQuantity(item.id, 1)}
								/>,
								<DeleteOutlined onClick={() => removeItemFromCart(item.id)} />,
							]}
							extra={
								<Image
									style={{ blockSize: '5rem' }}
									src={item.image}
								/>
							}
							style={{ fontWeight: 700 }}
						>
							{item.title}
						</Item>
					))
				) : (
					<Empty description='No items in cart' />
				)}
			</List>
			{cart.length ? <OrderButton /> : <></>}
		</>
	);
});

export default Cart;
