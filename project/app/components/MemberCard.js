import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
