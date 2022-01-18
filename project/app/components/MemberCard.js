import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MemberCard = ({ front: Front, back: Back }) => (
  <div>
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <Front />
        </div>
        <div className={classNames('flip-card-back', 'mt-3')}>
          <Back />
        </div>
      </div>
    </div>
  </div>
);

MemberCard.propTypes = {
  front: PropTypes.func,
  back: PropTypes.func,
};

export default MemberCard;
