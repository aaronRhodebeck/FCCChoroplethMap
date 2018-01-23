import React from 'react';
import styled from 'styled-components';
import { withFauxDOM } from 'react-faux-dom';

const ChartContainer = styled.div`
  margin: auto;
  height: 80vh;
  box-shadow: 1px 1px 6px rgba(200, 200, 200, 0.4), -1px -1px 6px rgba(200, 200, 200, 0.3);
`;

export default class Chart extends React.Component {
  componentWillMount() {}
  render() {
    return <ChartContainer>Chart is in progress</ChartContainer>;
  }
}
