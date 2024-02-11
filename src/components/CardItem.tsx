import {
	Card,
	CardProps,
	Flex,
	Image,
	Popover,
	Rate,
	Tag,
	Typography,
} from 'antd';
import React, { useCallback } from 'react';
import { Item } from '../utils/interfaces';
import { useNavigate } from 'react-router-dom';
import { itemsStore } from '../utils/store';
import paths from '../utils/paths';
import AddToCartButton from './AddToCartButton';
import Title from 'antd/es/typography/Title';

const CardStyles: CardProps['styles'] = {
	header: { inlineSize: '20rem', paddingBlock: '0', paddingInline: '1rem' },
	body: { padding: '1rem', inlineSize: '20rem', textAlign: 'right' },
	cover: {
		inlineSize: '20rem',
		blockSize: '20rem',
		overflow: 'hidden',
	},
};

interface Props {
	item: Item;
}

const CardItem: React.FC<Props> = ({ item }) => {
	const { setCurrentItemId } = itemsStore;

	const navigate = useNavigate();

	const updateItem = useCallback(
		(id: number) => {
			setCurrentItemId(id);
			navigate(paths.product);
		},
		[setCurrentItemId, navigate]
	);

	const { id, title, description, image, rating, category, price } = item;

	return (
		<Card
			title={
				<Popover
					key={id}
					title={title}
					content={description}
				>
					{title}
				</Popover>
			}
			cover={
				<Image
					onClick={() => updateItem(item.id)}
					src={image}
					alt={title}
				/>
			}
			styles={CardStyles}
			hoverable
			type='inner'
			extra={[
				<AddToCartButton
					key={`add-to-cart-${id}`}
					id={id}
				/>,
			]}
			actions={[
				<Flex
					align='center'
					justify='space-between'
				>
					<Flex gap={8}>
						<Rate
							disabled
							value={rating.rate}
							allowClear
							allowHalf
						/>
						<Typography.Text type='secondary'>{rating.count}</Typography.Text>
					</Flex>
					<Tag bordered>{category}</Tag>
				</Flex>,
			]}
		>
			<Title level={3}>${price}</Title>
		</Card>
	);
};

export default CardItem;
