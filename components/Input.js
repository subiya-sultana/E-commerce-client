import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid var(--bg-green-300);
  border-radius: 5px;
  box-sizing:border-box;
  background-color: var(--bg-green-100);
`;

export default function Input(props) {
  return <StyledInput {...props} />
}