/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";

const Bg = styled.div`
  background-color: var(--bg-green-900);
  color: #fff;
  padding: 20px 0;
  text-align: center;
  margin-top: 103px;
`;

const FooterText = styled.p`
  color: #aaa;
  font-size: 0.9rem;
`;

export default function Footer() {
  return (
    <Bg>
      <FooterText>© 2025 EcoCart. All rights reserved | Designed for a sustainable future | Designed as a part of mini project.</FooterText>
    </Bg>
  );
}
