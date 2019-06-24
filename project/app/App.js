import React, { useState } from 'react';
import { Container, Button, Card } from 'reactstrap';
import PageHeader from '@availity/page-header';
import Spaces from '@availity/spaces';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import qs from 'query-string';
import MemberInfo from './components/MemberInfo';
import Footer from './components/Footer';

const getQueryString = pathname => pathname.substring(pathname.lastIndexOf('?'), pathname.length);

export default () => {
  const queryParams = qs.parse(getQueryString(window.location.href));
  const [memberInfo, setMemberInfo] = useState(null);
  const [flippable, setFlippable] = useState(false);

  const toggleFlippable = () => setFlippable(!flippable);

  return (
    <Container data-testid="sso-container" className="container-sm">
      <Spaces spaceIds={[queryParams.spaceId]} clientId="test">
        <PageHeader appName="ID Card Viewer" spaceId={queryParams.spaceId} />
        {!memberInfo ? (
          <Card body>
            <AvForm
              onValidSubmit={() =>
                setMemberInfo({
                  name: 'John Doe',
                })
              }
            >
              <AvField
                name="memberId"
                type="text"
                label="Member ID"
                validate={{
                  pattern: { value: '[0-9]{8}', errorMessage: 'Member ID must be at least 8 digits' },
                  required: {
                    value: true,
                    errorMessage: 'This Field is Required.',
                  },
                  number: {
                    value: true,
                    errorMessage: 'Member ID only consists of digits.',
                  },
                }}
              />
              <AvField
                name="zipCode"
                type="text"
                label="Zip Code"
                validate={{
                  pattern: { value: '^[0-9]{5}(?:-[0-9]{4})?$' },
                  required: {
                    value: true,
                    errorMessage: 'This Field is Required.',
                  },
                  number: true,
                }}
              />

              <Button type="submit" color="primary" className="float-right">
                View Member Card
              </Button>
            </AvForm>
          </Card>
        ) : (
          <>
            <MemberInfo {...memberInfo} isFlippable={flippable} />
            <div className="d-flex justify-content-end">
              <Button className="mt-3" onClick={() => setMemberInfo(null)} color="primary">
                Go Back
              </Button>
            </div>
          </>
        )}
      </Spaces>
      <Footer toggleFlippable={toggleFlippable} />
    </Container>
  );
};
