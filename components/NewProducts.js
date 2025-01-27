import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
  color: var(--bg-green-900);
`;

export default function NewProducts({products}) {
  return (
    <Center>
      <Title data-aos="fade-right">New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}