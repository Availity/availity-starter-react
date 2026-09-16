import { Alert, BlockUi, Button, Card, Grid, TextField, Collapse } from '@availity/element';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { fetchMember } from '@/api/member';
import { useAppContext } from '@/context';

const schema = yup.object({
  memberId: yup
    .string()
    .required('This field is required.')
    .matches(/^\d{8}$/, 'Member ID must be 8 digits.'),
  zipCode: yup
    .string()
    .required('This field is required.')
    .matches(/^\d{5}(?:-\d{4})?$/, 'Valid Zip Code Formats: 12345 or 12345-6789'),
});

function useFetchMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchMember,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['member', variables], data);
    },
  });
}

const SearchForm = () => {
  const { mutate: getMember, isPending, isError } = useFetchMember();
  const { setHasMemberInfo, form, setForm } = useAppContext();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({ defaultValues: form, resolver: yupResolver(schema) });

  const onSubmit = (values) => {
    getMember(values, {
      onSuccess: () => {
        setForm(values);
        setHasMemberInfo(true);
      },
    });
  };

  return (
    <BlockUi blocking={isPending}>
      <Card sx={{ padding: '1rem' }}>
        <Collapse in={isError || !!errors.memberId || !!errors.zipCode}>
          <Alert severity="error" sx={{ marginBottom: '1rem' }}>
            {isError ? 'Member not found. Please check your details.' : 'Please correct the errors below.'}
          </Alert>
        </Collapse>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="memberId"
            type="text"
            label="Member ID"
            error={!!errors.memberId}
            helperText={errors.memberId?.message}
            {...register('memberId')}
          />
          <TextField
            name="zipCode"
            type="text"
            label="Zip Code"
            error={!!errors.zipCode}
            helperText={errors.zipCode?.message}
            {...register('zipCode')}
          />
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
