import React from 'react';
import { BlockUi, Button, Container, Grid, PageHeader, Spaces } from '@availity/element';


import { Footer, MemberInfo, SearchForm } from '@/components';
import { useAppContext } from '@/context';
import { useQueryParams } from '@/hooks';

const App = () => {
  const queryParams = useQueryParams();
  const { loading, hasMemberInfo, setHasMemberInfo } = useAppContext();

  return (
    <Container data-testid="sso-container">
      <Spaces spaceIds={[queryParams.spaceId]} clientId="test">
        <PageHeader headerText="ID Card Viewer" breadcrumbs={{active: 'ID Card Viewer'}} />
        <BlockUi blocking={loading}>
          <Grid container justifyContent="center">
            {hasMemberInfo ? (
              <Grid container direction="column">
                <MemberInfo />
                <Grid container justifyContent='end' mt={3}>
                 <Button onClick={() => setHasMemberInfo(false)} color="primary">
                    Go Back
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <SearchForm />
            )}
          </Grid>
        </BlockUi>
      </Spaces>
      <Footer />
    </Container>
  );
};

export default App;
