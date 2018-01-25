import React from 'react';
import styled from 'styled-components';
import { withFauxDOM } from 'react-faux-dom';
import makeEducationMap from './makeEducationMap';

const ChartContainer = styled.div`
  margin: auto;
  height: 100%;
  box-shadow: 1px 1px 6px rgba(200, 200, 200, 0.4), -1px -1px 6px rgba(200, 200, 200, 0.3);
  padding: 5px;
`;

class Chart extends React.Component {
  componentWillMount() {
    const faux = this.props.connectFauxDOM('div', 'chart');
    makeEducationMap(faux, this.props.educationData, this.props.topographicData, this);
  }
  render() {
    return <ChartContainer>{this.props.chart || 'Chart is in progress'}</ChartContainer>;
  }
}
export default withFauxDOM(Chart);
