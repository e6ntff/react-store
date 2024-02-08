import React, { useCallback } from 'react';
import { itemsStore } from '../utils/store';
import { Item } from '../utils/interfaces';
import { Card, CardProps, Empty, Flex, Image, Popover, Rate, Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import paths from '../utils/paths';
import AddToCartButton from './AddToCartButton';
import Title from 'antd/es/typography/Title';

const CardStyles: CardProps['styles'] = {
	header: { inlineSize: '20rem', paddingBlock: '0', paddingInline: '1rem' },
	body: { padding: '1rem', inlineSize: '20rem', textAlign: 'right' },
	extra: {},
	title: {},
	actions: {},
	cover: {
		inlineSize: '20rem',
		blockSize: '20rem',
		overflow: 'hidden',
	},
};

const CardsList: React.FC = observer(() => {
	const { currentItems, setCurrentItem } = itemsStore;
	const navigate = useNavigate();

	const updateItem = useCallback(
		(id: number) => {
			setCurrentItem(id);
			navigate(paths.product);
		},
		[setCurrentItem, navigate]
	);

	return (
		<Flex
			wrap='wrap'
			justify='space-around'
			gap='1.5rem'
		>
			{currentItems.length ? (
				currentItems.map((item: Item) => (
					<Card
						key={item.id}
						title={
							<Popover
								key={item.id}
								title={item.title}
								content={item.description}
								style={{ inlineSize: '2rem' }}
							>
								{item.title}
							</Popover>
						}
						cover={
							<Image
								onClick={() => updateItem(item.id)}
								src={item.image}
								alt={item.title}
							/>
						}
						styles={CardStyles}
						hoverable
						type='inner'
						extra={[
							<AddToCartButton
								key={`add-to-cart-${item.id}`}
								id={item.id}
							/>,
						]}
						actions={[
							<Rate
								disabled
								value={item.rating.rate}
								allowClear
								allowHalf
							/>,
							<Tag bordered>{item.category}</Tag>,
						]}
					>
						<Title level={3}>${item.price}</Title>
					</Card>
				))
			) : (
				<Empty description='No items matched' />
			)}
		</Flex>
	);
});

export default CardsList;
