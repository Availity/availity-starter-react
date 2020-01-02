import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useAppStore } from '@/hooks';

// Motivation https://davidwalsh.name/css-flip
const FlipCard = styled.div`
  /* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
  .flip-card {
    height: 293px;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
  }

  /* This container is needed to position the front and back side */
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    transform: ${({ flip }) => (flip ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  }

  /* Position the front and back side */
  .flip-card-front,
  .flip-card-back {
    position: absolute;
    backface-visibility: hidden;
    height: 100%;
  }

  /* Style the back side */
  .flip-card-back {
    transform: rotateY(180deg);
  }
`;

const FlipCardComponent = ({ front: Front, back: Back }) => {
  const [flip, setFlip] = useState(false);
  const { isFlippable } = useAppStore(store => ({ isFlippable: store.isFlippable }));

  const toggle = () => setFlip(!flip);

  const Tag = isFlippable ? FlipCard : 'div';

  return (
    <Tag flip={isFlippable ? flip : undefined}>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Front toggle={toggle} />
          </div>
          <div
            className={classNames('flip-card-back', {
              'mt-3': !isFlippable,
            })}
          >
            <Back toggle={toggle} />
          </div>
        </div>
      </div>
    </Tag>
  );
};

FlipCardComponent.propTypes = {
  front: PropTypes.func,
  back: PropTypes.func,
};

export default FlipCardComponent;
