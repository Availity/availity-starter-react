import React, { useState } from 'react';
import { Container, Button, Card } from 'reactstrap';
import PageHeader from '@availity/page-header';
import Spaces from '@availity/spaces';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import qs from 'query-string';
import MemberInfo from './components/MemberInfo';

const getQueryString = pathname => pathname.substring(pathname.lastIndexOf('?'), pathname.length);

export default () => {
  const queryParams = qs.parse(getQueryString(window.location.href));
  const [memberInfo, setMemberInfo] = useState(null);

  return (
    <Container data-testid="sso-container" className="container-sm">
      <Spaces spaceIds={[queryParams.spaceId]} clientId="test">
        <PageHeader appName="ID Card Viewer" spaceId={queryParams.spaceId} />
        {!memberInfo ? (
          <Card body>
            <AvForm
              onValidSubmit={() => {
                // eslint-disable-next-line no-undef
                setMemberInfo({
                  name:'John Doe'
                });
              }}
            >
              <AvField name="memberId" type="text" label="Member ID" required />
              <AvField name="zipCode" type="text" label="Zip Code" required />

              <Button type="submit" color="primary" className="float-right">
                View Member Card
              </Button>
            </AvForm>
          </Card>
        ) : (
          <MemberInfo {...memberInfo} />
        )}
      </Spaces>
    </Container>
  );
};
