import styled, {css} from "styled-components";

export const ButtonStyle = css`
  border:0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;


  svg{
    height: 16px;
    margin-right: 5px;
  }
  ${props => props.block && css`
    display: block;
    width: 100%;
  `}

  ${props => props.white && !props.outline && css`
    background-color: var(--bg-green-300);
    color: var(--bg-green-900);
    font-weight: bold;
    transition: all 1s;
    &:hover{
      background-color: var(--bg-green-100);
    }
  `}

  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
    transition: all 0.5s;
    font-size: small;
    &:hover{
      background-color: var(--bg-green-100);
      color: var(--bg-green-900);
    }
  `}

  ${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.primary && !props.outline && css`
    background-color: var(--bg-green-900);
    border: 1px solid var(--bg-green-900);
    color:#fff;
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    border: 2px solid var(--bg-green-900);
    color: var(--bg-green-900);
    width: auto;
    padding-left: 18px;
    transition: all 1s;

    &:hover{
      background-color: var(--bg-green-900);
      color: #fff;
    }

  `}
  ${props => props.size === 'l' && css`
    font-size:1.2rem;
    padding: 10px 20px;
    svg{
      height: 20px;
    }
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({children,...rest}) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  );
}