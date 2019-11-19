import React, { useState } from 'react';
import { Container, Button, Card } from 'reactstrap';
import PageHeader from '@availity/page-header';
import Spaces from '@availity/spaces';
import { Form, Field } from '@availity/form';
import qs from 'query-string';
import * as yup from 'yup';
import MemberInfo from './components/MemberInfo';
import Footer from './components/Footer';

const getQueryString = pathname => pathname.slice(pathname.lastIndexOf('?'), pathname.length);

const schema = yup.object().shape({
  memberId: yup
    .string()
    .isRequired(true, 'This Field is Required.')
    .matches(/^\d{8}$/, 'Member ID must be 8 digits.'),
  zipCode: yup
    .string()
    .isRequired(true, 'This Field is Required.')
    .matches(/^\d{5}(?:-\d{4})?$/, 'Valid Zip Code Formats: 12345 or 12345-6789'),
});

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
            <Form
              initialValues={{
                memberId: '',
                zipCode: '',
              }}
              validationSchema={schema}
              onSubmit={() =>
                setMemberInfo({
                  name: 'John Doe',
                })
              }
            >
              <Field name="memberId" type="text" label="Member ID" />
              <Field name="zipCode" type="text" label="Zip Code" />

              <Button type="submit" color="primary" className="float-right">
                View Member Card
              </Button>
            </Form>
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
