import { Alert, Card, CardHeader, CardContent, Grid, Typography, Button, Stack } from '@availity/element';
import { useLocation, useNavigate } from 'react-router';

/** @import { Submission } from '@/hooks/useSubmitRequest' */

export const Response = () => {
  const navigate = useNavigate();
  const location = useLocation();
  /** @type {Submission | undefined} */
  const submission = location.state?.submission;

  return (
    <>
      <Alert severity="success">Your request has been submitted.</Alert>
      <Card sx={{ mt: 3 }}>
        <CardHeader title="Submission Details" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2">Reference ID</Typography>
              <Typography>{submission?.id}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2">Status</Typography>
              <Typography>{submission?.status}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle2">Submitted At</Typography>
              <Typography>{submission?.submittedAt}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Stack direction="row" justifyContent="flex-end" mt={3}>
        <Button onClick={() => navigate('/')} color="primary">
          New Request
        </Button>
      </Stack>
    </>
  );
};
