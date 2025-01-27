/* eslint-disable @next/next/no-img-element */
import Center from "@/components/Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import {useContext} from "react";
import { CartContext } from "./CardContext";

const Bg = styled.div`
  background-color: var(--bg-green-900);
  color:#fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin:0;
  font-weight:normal;
  font-size:1rem;
  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Desc = styled.p`
  color:#aaa;
  font-size:.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img{
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img{
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
`;

export default function Featured({ product }) {

  const {addProduct} = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column data-aos="fade-right">
            <div>
              <Title data-aos="flip-down" >{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={'/product/'+product._id} outline={1} white={1}>Read More</ButtonLink>
                <Button white onClick={addFeaturedToCart}><CartIcon />Add to cart</Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column data-aos="fade-right">
            <img src="https://firebasestorage.googleapis.com/v0/b/weblog-s.appspot.com/o/EcoCart-images%2FAboutBanner.PNG?alt=media&token=d4cdd1ff-dfbf-40b6-8648-17a9c0b803e1" alt="" />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}