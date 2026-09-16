import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@availity/element';
import { useQuery } from '@tanstack/react-query';

import { fetchMember } from '@/api/member';
import { useAppContext } from '@/context';

import MemberCard from './MemberCard';

const Item = ({ name, value, children, ...rest }) => (
  <Grid container justifyContent="space-between" {...rest}>
    <Typography fontWeight="bold" textTransform="uppercase">
      {name}
    </Typography>
    {children || <span>{value}</span>}
  </Grid>
);

Item.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
};

const MemberCardFront = ({ member }) => (
  <Card style={{ height: 293, maxWidth: 600 }}>
    <CardHeader title="Front" />
    <CardContent>
      <Grid container style={{ height: '100%' }} justifyContent="space-between">
        <Grid direction="column" size={{ xs: 5 }}>
          <Item name="Name" value={member.name || 'N/A'} />
          <Item name="Member Number" value={member.memberId || 'N/A'} />
          <Divider sx={{ marginTop: '24px' }} />
        </Grid>
        <Grid direction="column" size={{ xs: 6 }}>
          <Item name="Group NO" value="MEDIRIX" />
          <Item name="Plan Code" value="455" />
          <Item name="CMS" value="H125353" />
          <Divider />
        </Grid>
        <Grid direction="column" size={{ xs: 5 }}>
          <Item name="FHCP NPI" value="3351244245" />
          <Item name="Effective" value="14 May 2019" />
          <Item name="D.O.B" value="21 Dec 1960" />
        </Grid>
        <Grid direction="column" size={{ xs: 6 }}>
          <Item name="RX Group" value="FHTP GS" />
          <Item name="RX ID" value="455" />
          <Item name="Rx BIN" value="31" />
          <Item name="Rx PCN" value="" />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

MemberCardFront.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string,
    memberId: PropTypes.string,
  }),
};

const MemberCardBack = () => (
  <Card style={{ height: 293, maxWidth: 600 }}>
    <CardHeader title="Back" />
    <CardContent>
      <Grid container style={{ height: '100%' }} justifyContent="space-between">
        <Grid direction="column" size={{ xs: 7 }}>
          <Item name="Members">
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </span>
          </Item>
        </Grid>
        <Grid direction="column" size={{ xs: 4 }}>
          <Item name="Group NO" value="MEDIRIX" />
          <Item name="Plan Code" value="455" />
          <Item name="CMS" value="H125353" />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const MemberInfo = () => {
  const { form } = useAppContext();
  const { data: member } = useQuery({
    queryKey: ['member', form],
    queryFn: () => fetchMember(form),
  });

  if (!member) return null;

  return <MemberCard front={<MemberCardFront member={member} />} back={<MemberCardBack />} />;
};

export default MemberInfo;
