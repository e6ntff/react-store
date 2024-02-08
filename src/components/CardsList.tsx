import React, { useCallback } from 'react';
import store from '../utils/store';
import styled from 'styled-components';
import { Item } from '../utils/interfaces';
import { Card, CardProps, Empty, Image, Popover, Rate } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import paths from '../utils/paths';
import AddToCartButton from './AddToCartButton';

const StyledList = styled.li`
	display: flex;
	justify-content: space-between;
	gap: 1.5rem;
	flex-wrap: wrap;
`;

const CardStyles: CardProps['styles'] = {
	header: { inlineSize: '15rem', paddingBlock: '0', paddingInline: '0.5rem' },
	body: { padding: '0.5rem', inlineSize: '15rem' },
	extra: {},
	title: {},
	actions: {},
	cover: {
		inlineSize: '15rem',
		blockSize: '15rem',
		overflow: 'hidden',
	},
};

const CardsList: React.FC = observer(() => {
	const { currentItems, setCurrentItem } = store;
	const navigate = useNavigate();

	const updateItem = useCallback(
		(id: number) => {
			setCurrentItem(id);
			navigate(paths.product);
		},
		[setCurrentItem, navigate]
	);

	return (
		<StyledList>
			{currentItems.length ? (
				currentItems.map((item: Item) => (
					<Card
						key={item.id}
						title={item.title}
						cover={
							<Popover
								key={item.id}
								title={item.title}
								content={item.description}
								style={{ maxInlineSize: '2rem' }}
							>
								<Image
									onClick={() => updateItem(item.id)}
									src={item.image}
									alt={item.title}
								/>
							</Popover>
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
								key={`rate-${item.id}`}
								disabled
								value={item.rating.rate}
								allowClear
								allowHalf
							/>,
						]}
					></Card>
				))
			) : (
				<Empty description='No items matched' />
			)}
		</StyledList>
	);
});

export default CardsList;
