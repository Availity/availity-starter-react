import PropTypes from 'prop-types';

const MemberCard = ({ front, back }) => (
  <div>
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">{front}</div>
        <div className="flip-card-back" style={{ marginTop: 16 }}>
          {back}
        </div>
      </div>
    </div>
  </div>
);

MemberCard.propTypes = {
  front: PropTypes.node,
  back: PropTypes.node,
};

export default MemberCard;
