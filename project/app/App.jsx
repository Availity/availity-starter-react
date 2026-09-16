import { Button, Container, Grid, PageHeader, Spaces } from '@availity/element';
import { useSearchParams } from 'react-router';

import { Footer, MemberInfo, SearchForm } from '@/components';
import { useAppContext } from '@/context';

const App = () => {
  const [searchParams] = useSearchParams();
  const spaceId = searchParams.get('spaceId') || '';
  const { hasMemberInfo, setHasMemberInfo } = useAppContext();

  return (
    <Container data-testid="sso-container">
      <Spaces spaceIds={[spaceId]} clientId="test">
        <PageHeader headerText="ID Card Viewer" breadcrumbs={{ active: 'ID Card Viewer' }} />
        <Grid container justifyContent="center">
          {hasMemberInfo ? (
            <Grid container direction="column">
              <MemberInfo />
              <Grid container justifyContent="end" mt={3}>
                <Button onClick={() => setHasMemberInfo(false)} color="primary">
                  Go Back
                </Button>
              </Grid>
            </Grid>
          ) : (
            <SearchForm />
          )}
        </Grid>
      </Spaces>
      <Footer />
    </Container>
  );
};

export default App;
