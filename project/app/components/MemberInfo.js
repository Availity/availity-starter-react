/* eslint react/no-unstable-nested-components: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@availity/element';
import { useQuery } from '@tanstack/react-query';

import { useAppContext } from '@/context';

import MemberCard from './MemberCard';

const Item = ({ name, value, children, className, ...rest }) => (
  <Grid container justifyContent="space-between" {...rest}>
    <Typography fontWeight="bold" textTransform="uppercase" >{name}</Typography>
    {children || <span>{value}</span>}
  </Grid>
);

Item.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

async function stall(stallTime = 3000) {
  await new Promise((resolve) => { setTimeout(resolve, stallTime) });
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
        <Card style={{ height: 293, maxWidth: 600 }}>
          <CardHeader title="Front" />
          <CardContent>
            <Grid container  style={{ height: '100%' }} justifyContent='space-between'>
              <Grid direction="column" xs={5}>
                <Item name="Name" value={member.name || 'N/A'} />
                <Item name="Member Number" value={member.memberId || 'N/A'} />
                <Divider sx={{marginTop: '24px'}} />
              </Grid>
              <Grid direction="column" xs={6}>
                <Item name="Group NO" value="MEDIRIX" />
                <Item name="Plan Code" value="455" />
                <Item name="CMS" value="H125353" />
                <Divider />
              </Grid>
              <Grid direction="column" xs={5}>
                <Item name="FHCP NPI" value="3351244245" />
                <Item name="Effective" value="14 May 2019" />
                <Item name="D.O.B" value="21 Dec 1960" />
              </Grid>
              <Grid direction="column" xs={6}>
                <Item name="RX Group" value="FHTP GS" />
                <Item name="RX ID" value="455" />
                <Item name="Rx BIN" value="31" />
                <Item name="Rx PCN" value="" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      back={() => (
        <Card style={{ height: 293, maxWidth: 600 }}>
          <CardHeader title="Back"  />
          <CardContent>
            <Grid container style={{ height: '100%' }} justifyContent="space-between">
              <Grid direction="column" xs={7} className="mb-2 pb-2">
                <Item name="Members">
                  <span className="pl-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.
                  </span>
                </Item>
              </Grid>
              <Grid direction="column" xs={4} className="mb-2 pb-2">
                <Item name="Group NO" value="MEDIRIX" />
                <Item name="Plan Code" value="455" />
                <Item name="CMS" value="H125353" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    />
  );
};

export default MemberInfo;
