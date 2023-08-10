import React from 'react';
import { Container, Button } from 'reactstrap';
import PageHeader from '@availity/page-header';
import Spaces from '@availity/spaces';
import BlockUi from '@availity/block-ui';

import { Footer, MemberInfo, SearchForm } from '@/components';
import { useAppContext } from '@/context';
import { useQueryParams } from '@/hooks';

const App = () => {
  const queryParams = useQueryParams();
  const { loading, hasMemberInfo, setHasMemberInfo } = useAppContext();

  return (
    <Container data-testid="sso-container" className="container-sm">
      <Spaces spaceIds={[queryParams.spaceId]} clientId="test">
        <PageHeader appName="ID Card Viewer" spaceId={queryParams.spaceId} />
        <BlockUi blocking={loading}>
          {hasMemberInfo ? (
            <>
              <MemberInfo />
              <div className="d-flex justify-content-end">
                <Button className="mt-3" onClick={() => setHasMemberInfo(false)} color="primary">
                  Go Back
                </Button>
              </div>
            </>
          ) : (
            <SearchForm />
          )}
        </BlockUi>
      </Spaces>
      <Footer />
    </Container>
  );
};

export default App;
