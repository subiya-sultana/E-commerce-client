// Header of he homepage
import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import BarsIcon from "./icons/Bars";
import { useContext, useState } from "react";
import { CartContext } from "./CardContext";

const StyledHeader = styled.header`
  background-color: var(--bg-green-900);
  width: 100vw;
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
  /* border:2px solid yellow; */
`;

const LogoIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  /* border:2px solid hotpink; */
`;

const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
    background: var(--bg-green-900);
    font-size: 30px
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
    display: block;
    text-decoration:none;
    margin: 0 10px;
    padding: 0;
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s ease, opacity 0.3s ease;
    /* border:1px solid lavender; */

    &:hover {
        color: white;
        opacity: 1;
    }

    @media screen and (max-width: 968px) {
    padding: 0;
    margin: 0;
    }
    @media screen and (max-width: 768px) {
        padding: 10px;
    }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;


export default function Header() {
    const {cartProducts} = useContext(CartContext);
    const [mobileNavActive,setMobileNavActive] = useState(false);
    return(
        <StyledHeader>
            <Center>
                <Wrapper data-aos="fade-down">
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
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                    </StyledNav>
                    <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                      <BarsIcon />
                    </NavButton>
                </Wrapper>
            </Center>
        </StyledHeader>
    )
}