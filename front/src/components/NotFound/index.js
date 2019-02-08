import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

const NotFound = () => (
  <div id='not-found-page'>
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div#not-found-page {
        height: 100%;
      }
    `}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column>
        <Header as='h2' content='Page not found ;(' />
      </Grid.Column>
    </Grid>
</div>
);

export default NotFound;
