import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import BarsIcon from "./icons/Bars";
import { useContext, useState } from "react";
import { CartContext } from "./CardContext";

const StyledHeader = styled.header`
  background-color: var(--bg-green-900);
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 10px 0;
`;

const LogoContainer = styled(Link)`
  display: flex;
  gap: 2px;
  color: white;
  line-height: 1.375;
  font-family: 'Monaco', monospace;
  font-weight: bold;
  font-size: 1.25rem;
  text-decoration: none;
`;

const LogoIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  position: relative;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: ${({ mobileNavActive }) => (mobileNavActive ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: var(--bg-green-900);
    padding: 20px 0;
    z-index: 999;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  color: white;
  cursor: pointer;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  min-width: 300px;
  border: 2px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  background: white;
  margin: 0 auto; /* Centers the search bar */
`;

const CategorySelect = styled.select`
  background: #f0f0f0;
  border: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  font-size: 16px;
  outline: none;
`;

const SearchButton = styled.button`
  background: #febd69;
  border: none;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background: #f3a847;
  }
`;

const PageContent = styled.div`
  padding-top: 60px; /* Prevents content from moving up under the fixed navbar */
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <>
      <StyledHeader>
        <Center>
          <Wrapper>
            <LogoContainer href="/">
              <LogoIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </LogoIcon>
              <span>EcoCart</span>
            </LogoContainer>



            <StyledNav mobileNavActive={mobileNavActive}>
              <NavLink href={'/'}>Home</NavLink>
              <NavLink href={'/products'}>All products</NavLink>
              <NavLink href={'/categories'}>Categories</NavLink>
              {/* <NavLink href={'/account'}>Account</NavLink> */}
              <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
            </StyledNav>

            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
              <BarsIcon />
            </NavButton>
          </Wrapper>
        </Center>


        {/* <SearchBarContainer>
          <CategorySelect>
            <option>Books</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home & Kitchen</option>
          </CategorySelect>
          <SearchInput type="text" placeholder="Search Amazon.in" />
          <SearchButton>
            <BarsIcon />
          </SearchButton>
        </SearchBarContainer> */}

      </StyledHeader>

      <PageContent>
        {/* This ensures content does not overlap the fixed navbar */}
      </PageContent>
    </>
  );
}
