import React from 'react';
import { Alert, BlockUi, Button, Card, Grid, TextField, Collapse } from '@availity/element';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useAppContext } from '@/context';

async function stall(stallTime = 3000) {
  await new Promise((resolve) => { setTimeout(resolve, stallTime) });
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
  const { mutate: getMember, isLoading } = useFetchMember();
  const { setHasMemberInfo, form, setForm } = useAppContext();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({defaultValues: form});

  const onSubmit = async (values) => {
    getMember(values, {
      onSuccess: () => {
        setForm(values);
        setHasMemberInfo(true);
      },
    });
  };

  return (
    <BlockUi blocking={isLoading}>
      <Card sx={{padding: '1rem'}}>
        <Collapse in={!!errors.memberId || !!errors.zipCode}>
          <Alert severity="error" sx={{marginBottom: '1rem'}}>
            An error occurred
          </Alert>
        </Collapse>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField name="memberId" type="text" label="Member ID" error={!!errors.memberId} helperText={errors.memberId?.message} {...register('memberId', {required: 'This field is required.', pattern: {value: /^\d{8}$/, message: 'Member ID must be 8 digits.'}})} />
          <TextField name="zipCode" type="text" label="Zip Code" error={!!errors.zipCode} helperText={errors.zipCode?.message} {...register('zipCode', {required: 'This field is required.', pattern:{value: /^\d{5}(?:-\d{4})?$/, message: 'Valid Zip Code Formats: 12345 or 12345-6789'}})} />
          <Grid container justifyContent="end">
            <Button type="submit" color="primary">
              View Member Card
            </Button>
          </Grid>
        </form>
      </Card>
    </BlockUi>
  );
};

export default SearchForm;
