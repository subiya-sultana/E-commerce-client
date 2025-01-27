/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CardContext";

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--bg-green-300);
  border-radius: 8px;
  background-color: var(--bg-green-100);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%; /* Ensures consistent height for all product boxes */

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const WhiteBox = styled(Link)`
  background-color: var(--bg-green-100);
  padding: 15px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  img {
    max-width: 100%;
    max-height: 120px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const Title = styled(Link)`
  font-weight: 600;
  font-size: 1rem;
  color: var(--bg-green-900);
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;

  &:hover {
    color: var(--bg-green-500);
  }
`;

const ProductInfoBox = styled.div`
  padding: 5px 15px;
  padding-bottom: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: auto; 

  & > * {
    flex: 1;
    text-align: center;
  }
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--bg-green-900);

  @media screen and (max-width: 400px) {
    font-size: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  flex: 1; /* Ensures button adjusts flexibly */
  text-align: center;
  display: flex;
  justify-content: center;
  padding-top: 5px;
  
`;

export default function ProductBox({_id, title, description, price, images}) {
  const {addProduct} = useContext(CartContext);
  const url = '/product/' + _id;
  return (
    <ProductWrapper data-aos="flip-down">
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>₹{price}</Price>
          <ButtonWrapper>
            <Button primary outline block onClick={() => addProduct(_id)}>
              <CartIcon />
            </Button>
          </ButtonWrapper>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
