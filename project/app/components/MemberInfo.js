import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Row, Col, Button } from 'reactstrap';
import classNames from 'classnames';
import { SpacesLogo } from '@availity/spaces';
import FlipCard from './FlipCard';

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
  className: PropTypes.string
}

export default () => (
  <FlipCard
    front={({ toggle }) => (
      <Card style={{ height: 293 }}>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <SpacesLogo
            style={{ height: 40 }}
            fallback="https://www.cmsimaging.com/assets/img/brands/authpal/availity.png"
          />
          <Button color="primary" onClick={toggle}>
            Go To Back
          </Button>
        </CardHeader>
        <Row tag={CardBody} style={{ height: '100%' }}>
          <Col xs={5} className="border-bottom mb-2 pb-2">
            <Item name="Name" value="John Doe" />
            <Item name="Member Number" value="1353252" />
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
    back={({ toggle }) => (
      <Card style={{ height: 293 }}>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <SpacesLogo
            style={{ height: 40 }}
            fallback="https://www.cmsimaging.com/assets/img/brands/authpal/availity.png"
          />
          <Button color="primary" onClick={toggle}>
            Go To Front
          </Button>
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