import { Image, List } from 'antd';
import Item from 'antd/es/list/Item';
import { observer } from 'mobx-react-lite';
import React from 'react';
import store from '../utils/store';
import { ItemInCart } from '../utils/interfaces';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import CatalogButton from '../components/CatalogButton';

const Cart: React.FC = observer(() => {
	const { cart, getItemInCartQuantity, changeItemInCartQuantity } = store;

	return (
		<>
			<CatalogButton />
			<List
				size='small'
				itemLayout='vertical'
			>
				{cart.map(({ item }: ItemInCart) => (
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
						]}
						extra={
							<Image
								style={{ blockSize: '10rem' }}
								src={item.image}
							/>
						}
						style={{ fontWeight: 700 }}
					>
						{item.title}
					</Item>
				))}
			</List>
		</>
	);
});

export default Cart;
