import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import classNames from 'classnames';
import { SpacesLogo } from '@availity/spaces';
import { useQuery } from 'react-query';
import { useAppContext } from '@/context';
import MemberCard from './MemberCard';

const Item = ({ name, value, children, className, ...rest }) => (
  <div className={classNames('d-flex justify-content-between', className)} {...rest}>
    <span className="font-weight-bold text-uppercase">{name}</span>
    {children || <span>{value}</span>}
  </div>
);

Item.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

async function fetchMember({ memberId, zipCode }) {
  await stall();
  return {
    memberId,
    zipCode,
    name: 'John Doe',
  };
}

const MemberInfo = () => {
  const { form } = useAppContext();
  const { data: member } = useQuery(['member', form], fetchMember);

  return (
    <MemberCard
      front={() => (
        <Card style={{ height: 293 }}>
          <CardHeader className="d-flex align-items-center justify-content-between">
            <SpacesLogo
              style={{ height: 40 }}
              fallback="https://www.cmsimaging.com/assets/img/brands/authpal/availity.png"
            />
            Front
          </CardHeader>
          <Row tag={CardBody} style={{ height: '100%' }}>
            <Col xs={5} className="border-bottom mb-2 pb-2">
              <Item name="Name" value={member.name || 'N/A'} />
              <Item name="Member Number" value={member.memberId || 'N/A'} />
            </Col>
            <Col xs={{ size: 6, offset: 1 }} className="border-bottom mb-2 pb-2">
              <Item name="Group NO" value="MEDIRIX" />
              <Item name="Plan Code" value="455" />
              <Item name="CMS" value="H125353" />
            </Col>
            <Col xs={5}>
              <Item name="FHCP NPI" value="3351244245" />
              <Item name="Effective" value="14 May 2019" />
              <Item name="D.O.B" value="21 Dec 1960" />
            </Col>
            <Col xs={{ size: 6, offset: 1 }}>
              <Item name="RX Group" value="FHTP GS" />
              <Item name="RX ID" value="455" />
              <Item name="Rx BIN" value="31" />
              <Item name="Rx PCN" value="" />
            </Col>
          </Row>
        </Card>
      )}
      back={() => (
        <Card style={{ height: 293 }}>
          <CardHeader className="d-flex align-items-center justify-content-between">
            <SpacesLogo
              style={{ height: 40 }}
              fallback="https://www.cmsimaging.com/assets/img/brands/authpal/availity.png"
            />
            Back
          </CardHeader>
          <Row tag={CardBody} style={{ height: '100%' }}>
            <Col xs={8} className="mb-2 pb-2">
              <Item name="Members">
                <span className="pl-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </span>
              </Item>
            </Col>
            <Col xs={{ size: 3, offset: 1 }} className="mb-2 pb-2">
              <Item name="Group NO" value="MEDIRIX" />
              <Item name="Plan Code" value="455" />
              <Item name="CMS" value="H125353" />
            </Col>
            <Col xs={6} className="border-bottom" height="100" />
            <Col xs={{ size: 5, offset: 1 }} className="border-bottom" height="100" />
          </Row>
        </Card>
      )}
    />
  );
};

export default MemberInfo;
