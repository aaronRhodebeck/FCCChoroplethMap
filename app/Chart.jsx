import React from 'react';
import styled from 'styled-components';
import { withFauxDOM } from 'react-faux-dom';
import makeEducationMap from './makeEducationMap';

const ChartContainer = styled.div`
  margin: auto;
  height: 100%;
  max-height: 90vh;
  width: calc(90vh /0.67);
  box-shadow: 3px 3px 6px rgba(190, 190, 200, 0.4), -3px -3px 6px rgba(190, 190, 200, 0.3);
  padding: 5px;
`;

const Tooltip = styled.div`
  position: absolute;
  top: ${props => props.top + 'px'};
  right: ${props => props.right + 'px'};
  padding: 2px;
  background-color: rgb(247, 242, 143);
  box-shadow: 1px 1px 6px rgba(200, 200, 200, 0.4), -1px -1px 6px rgba(200, 200, 200, 0.3);
  border-radius: 1px;
`;

const TooltipData = styled.p`
  margin: 3px;
  font-family: Arial, serif;
  font-weight: bold;
  color: rgb(40, 40, 40);
`;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: {
        style: {
          visibility: 'hidden',
          top: null,
          right: null,
        },
        data: { countyName: null, stateAbbr: null, educationLevel: null },
      },
    };
  }

  componentWillMount() {
    const faux = this.props.connectFauxDOM('div', 'chart');
    makeEducationMap(faux, this.props.educationData, this.props.topographicData, this);
  }
  render() {
    const { style } = this.state.tooltip;
    const { data } = this.state.tooltip;
    return (
      <ChartContainer>
        {this.props.chart || 'Chart is in progress'}
        <Tooltip
          id="tooltip"
          style={{ visibility: style.visibility }}
          top={style.top}
          right={style.right}
          data-education={data.educationLevel}
        >
          <TooltipData>
            {data.countyName}, {data.stateAbbr}: {data.educationLevel}%
          </TooltipData>
        </Tooltip>
      </ChartContainer>
    );
  }
}
export default withFauxDOM(Chart);
