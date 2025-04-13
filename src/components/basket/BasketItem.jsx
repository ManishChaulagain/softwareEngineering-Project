import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

import { BasketItemControl } from '@/components/basket';
import { ImageLoader } from '@/components/common';
import { displayMoney } from '@/helpers/utils';
import { removeFromBasket } from '@/redux/actions/basketActions';

const BasketItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemove = () => dispatch(removeFromBasket(product.id));
  const {
    id, name, quantity, selectedSize, selectedColor,
    availableColors, price, image
  } = product;

  return (
    <div className="basket-item">
      <BasketItemControl product={product} />
      <div className="basket-item-wrapper">
        <div className="basket-item-img-wrapper">
          <ImageLoader
            alt={name}
            className="basket-item-img"
            src={image}
          />
        </div>

        <div className="basket-item-details">
          <Link
            to={`/product/${id}`}
            onClick={() => document.body.classList.remove('is-basket-open')}
          >
            <h4 className="underline basket-item-name">{name}</h4>
          </Link>

          <div className="basket-item-specs">
            <div>
              <span className="spec-title">Quantity</span>
              <h5 className="my-0">{quantity}</h5>
            </div>
            <div>
              <span className="spec-title">Size</span>
              <h5 className="my-0">{selectedSize || 'N/A'} mm</h5>
            </div>
            <div>
              <span className="spec-title">Color</span>
              <div
                style={{
                  backgroundColor: selectedColor || availableColors?.[0] || '#000',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%'
                }}
              />
            </div>
          </div>
        </div>

        <div className="basket-item-price">
          <h4 className="my-0">{displayMoney(price * quantity)}</h4>
        </div>

        <button
          className="basket-item-remove button button-border button-border-gray button-small"
          onClick={handleRemove}
          type="button"
          aria-label="Remove item"
        >
          <CloseOutlined />
        </button>
      </div>
    </div>
  );
};

BasketItem.propTypes = {
  product: PropType.shape({
    id: PropType.string.isRequired,
    name: PropType.string.isRequired,
    brand: PropType.string,
    price: PropType.number.isRequired,
    quantity: PropType.number.isRequired,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    selectedSize: PropType.string,
    selectedColor: PropType.string,
    imageCollection: PropType.arrayOf(PropType.string),
    sizes: PropType.arrayOf(PropType.number),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    availableColors: PropType.arrayOf(PropType.string)
  }).isRequired
};

export default BasketItem;
