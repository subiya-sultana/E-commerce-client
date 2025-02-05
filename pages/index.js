import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import CategoriesPage from "./categories";
import Footer from "@/components/Footer";


export default function HomePage({featuredProduct, newProducts, bestProducts}){
  return(
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <br></br>
      <NewProducts title="New Arrivals" products={newProducts} />
      <br></br>
      <br></br>
      <NewProducts title="Best selling" products={bestProducts} />
      
      <Footer />
    </div>
    
  )
}

export async function getServerSideProps() {
  const featuredProductId = '67a341de05e4be189affd501';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit:10});
  const bestProducts = await Product.find({}, null, {sort: {'_id': 1}, limit:10});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      bestProducts: JSON.parse(JSON.stringify(bestProducts)),
    },
  };
}