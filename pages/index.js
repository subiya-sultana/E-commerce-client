import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";


export default function HomePage({featuredProduct, newProducts}){
  console.log(featuredProduct)
  return(
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts} />
    </div>
    
  )
}

export async function getServerSideProps() {
  const featuredProductId = '67507c3f62b2239a47246379';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}