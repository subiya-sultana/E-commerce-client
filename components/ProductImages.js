/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { useState } from "react";

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${props => props.active ? `
    border-color: var(--bg-green-900);
  ` : `
    border-color: transparent;
  `}
  height: 50px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
`;

const BigImageWrapper = styled.div`
  text-align: center;
  overflow: hidden;
  border-radius: 10px;
`;

const NoImagesMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin: 60px 0;
  font-weight: bold;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      {
        (images.length === 0) ? (
          <NoImagesMessage>No images available to preview this product :(</NoImagesMessage>
        ) : (
          <>
            <BigImageWrapper>
              <img
                src={activeImage}
                alt="Product"
                style={{ width: '100%', borderRadius: '10px' }} // Ensure full-width image
              />
            </BigImageWrapper>
            <ImageButtons>
              {images.map(image => (
                <ImageButton
                  key={image}
                  active={image === activeImage}
                  onClick={() => setActiveImage(image)}>
                  <img src={image} alt="" style={{ maxWidth: '100%', height: '100%', borderRadius: '5px' }} />
                </ImageButton>
              ))}
            </ImageButtons>
          </>
        )
      }
    </>
  );
}
