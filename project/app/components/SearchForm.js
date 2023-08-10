import React from 'react';
import { Form, Field } from '@availity/form';
import { Alert, Button, Card } from 'reactstrap';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import BlockUi from '@availity/block-ui';

import { useAppContext } from '@/context';

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

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

async function fetchMember({ memberId, zipCode }) {
  await stall();
  if (memberId[0] === '1') throw new Error('Member ID cannot start with a 1');
  return {
    memberId,
    zipCode,
    name: 'John Doe',
  };
}

function useFetchMember() {
  const queryClient = useQueryClient();

  return useMutation(fetchMember, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['member', variables], data);
    },
  });
}

const SearchForm = () => {
  const { mutate: getMember, isLoading, error } = useFetchMember();
  const { setHasMemberInfo, form, setForm } = useAppContext();

  const handleSubmit = async (values) => {
    getMember(values, {
      onSuccess: () => {
        setForm(values);
        setHasMemberInfo(true);
      },
    });
  };

  return (
    <Card body>
      <BlockUi blocking={isLoading}>
        <Alert color="danger" isOpen={!!error}>
          {error?.message || 'An error occurred'}
        </Alert>
        <Form initialValues={form} validationSchema={schema} onSubmit={handleSubmit}>
          <Field name="memberId" type="text" label="Member ID" />
          <Field name="zipCode" type="text" label="Zip Code" />
          <Button type="submit" color="primary" className="float-right">
            View Member Card
          </Button>
        </Form>
      </BlockUi>
    </Card>
  );
};

export default SearchForm;
