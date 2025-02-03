import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CardContext";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
  align-items: start;
`;
const ProductInfoBox = styled.div`
  background: var(--bg-green-100);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: 50vh;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 10px 0;
`;
const Price = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--bg-green-900);
  display: block;
`;
const DetailItem = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin: 8px 0;
  strong {
    font-weight: 700;
  }
`;
export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <ProductInfoBox>
            <Title>{product.title}</Title>
            <DetailItem><strong>Description:</strong> {product.description}</DetailItem>
            <DetailItem><strong>Category:</strong> {product.category?.name || "Unknown"}</DetailItem>
            {product.properties &&
              Object.entries(product.properties).map(([key, value]) => (
                <DetailItem key={key}>
                  <strong>{key}:</strong> {String(value)}
                </DetailItem>
              ))}
            <PriceRow>
              <Price>₹{product.price}</Price>
            </PriceRow>
              <Button primary onClick={() => addProduct(product._id)}>
                <CartIcon /> Add to cart
              </Button>
          </ProductInfoBox>
        </ColWrapper>
      </Center>
    </>
  );
}
export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id).populate("category");
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
