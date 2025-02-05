import Header from "@/components/Header";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Link from "next/link";
import mongoose from "mongoose";
import styled from "styled-components";
import Footer from "@/components/Footer";

const CategoryButton = styled.button`
  padding: 14px 24px;
  font-size: 1rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  text-decoration: none;
  display: inline-block;
  border: 2px solid transparent;

  background-color: ${({ active }) => (active ? "var(--bg-green-900)" : "var(--bg-green-100)")};
  color: ${({ active }) => (active ? "#ffffff" : "#14532D")};
  box-shadow: ${({ active }) => (active ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none")};

  &:hover {
    border-color: ${({ active }) => (active ? "var(--bg-green-500)" : "var(--bg-green-300)")};
    border: 2px solid;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin: 30px 0;
`;


export default function CategoriesPage({ categories, products, selectedCategory }) {
  return (
    <>
      <Header />
      <Center>
        <br />
        <Title>Products by Categories</Title>

        {/* Category Selection */}
        <CategoryContainer>
          <Link href="/categories" passHref>
            <CategoryButton as="a" active={!selectedCategory}>
              All
            </CategoryButton>
          </Link>
          {categories.map(category => (
            <Link key={category._id} href={`/categories?category=${category._id}`} passHref>
              <CategoryButton as="a" active={selectedCategory === category._id.toString()}>
                {category.name}
              </CategoryButton>
            </Link>
          ))}
        </CategoryContainer>

        {/* Products Grid */}
        <ProductsGrid products={products} />
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { category } = context.query;

  // Fetch all categories
  const allCategories = await Category.find();

  // Find categories that have at least one product
  const categoriesWithProducts = new Set();
  
  for (let cat of allCategories) {
    // Check if the category itself has products
    const count = await Product.countDocuments({ category: cat._id });
    if (count > 0) {
      categoriesWithProducts.add(cat._id.toString());
    }

    // Check if any of its subcategories have products
    const subCategories = await Category.find({ parent: cat._id });
    for (let sub of subCategories) {
      const subCount = await Product.countDocuments({ category: sub._id });
      if (subCount > 0) {
        categoriesWithProducts.add(cat._id.toString()); // Include parent category
        categoriesWithProducts.add(sub._id.toString()); // Include subcategory
      }
    }
  }

  // Filter only the categories that have products or their subcategories have products
  const filteredCategories = allCategories.filter(cat => categoriesWithProducts.has(cat._id.toString()));

  // Fetch products for the selected category (including subcategories)
  let products = [];
  if (category && mongoose.Types.ObjectId.isValid(category)) {
    const selectedCategoryId = new mongoose.Types.ObjectId(category);

    // Find subcategories of the selected category
    const subcategories = await Category.find({ parent: selectedCategoryId }).select("_id");
    const subcategoryIds = subcategories.map(sub => sub._id);

    // Get products for both parent and subcategories
    products = await Product.find({
      category: { $in: [selectedCategoryId, ...subcategoryIds] }
    }).sort({ _id: -1 }).lean();
  } else {
    products = await Product.find().sort({ _id: -1 }).lean();
  }

  return {
    props: {
      categories: JSON.parse(JSON.stringify(filteredCategories)), // Only categories (and parents) with products
      products: JSON.parse(JSON.stringify(products)),
      selectedCategory: category || null,
    },
  };
}
