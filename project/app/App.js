import React from 'react';
import { Container, Button, Card } from 'reactstrap';
import PageHeader from '@availity/page-header';
import Spaces from '@availity/spaces';
import { Form, Field } from '@availity/form';
import qs from 'query-string';
import * as yup from 'yup';
import { Footer, MemberInfo } from '@/components';
import { useAppStore } from '@/hooks';

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
  const { memberInfo, setMemberInfo } = useAppStore(store => ({
    memberInfo: store.memberInfo,
    setMemberInfo: store.setMemberInfo,
  }));

  const handleSubmit = values => {
    setMemberInfo({
      ...values,
      name: 'John Doe',
    });
  };

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
              onSubmit={handleSubmit}
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
            <MemberInfo />
            <div className="d-flex justify-content-end">
              <Button className="mt-3" onClick={() => setMemberInfo(null)} color="primary">
                Go Back
              </Button>
            </div>
          </>
        )}
      </Spaces>
      <Footer />
    </Container>
  );
};
