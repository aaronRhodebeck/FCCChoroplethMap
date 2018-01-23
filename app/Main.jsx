import React from 'react';
import styled from 'styled-components';
import Chart from './Chart';
import * as getData from './ajaxCalls';

const AppContainer = styled.div`
  padding: 2%;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-family: Helvetica, sans-serif;
  margin: 0px;
`;

const PageSubTitle = styled.p`
  text-align: center;
  font-family: Arial, serif;
`;

const AuthorLink = styled.a`
  color: inherit;
`;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { educationData: null, topographicData: null };
  }
  componentWillMount() {
    const component = this;
    getData.getEducationData(component);
    getData.getTopographicalData(component);
  }

  render() {
    return (
      <AppContainer>
        <PageTitle>Choropleth Map for freeCodeCamp Challenge</PageTitle>
        <PageSubTitle>
          A map showing educational attainment by county <br /> created using D3 and React
          by <AuthorLink href="www.github.com/aaronRhodebeck">Aaron Rhodebeck</AuthorLink>
        </PageSubTitle>
        {this.state.educationData &&
          this.state.topographicData && (
            <Chart
              educationData={this.state.educationData}
              topographicData={this.state.topographicData}
            />
          )}
      </AppContainer>
    );
  }
}
export default Main;
