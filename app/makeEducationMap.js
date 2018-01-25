import * as d3 from 'd3';
import * as topojson from 'topojson';
import { interpolateGreens } from 'd3-scale-chromatic';

export default function makeEducationMap(
  baseNode,
  educationData,
  topographicData,
  reactComponent,
  svgConfig = {
    height: 650,
    width: 960,
    margin: {
      left: 10,
      top: 15,
      right: 10,
      bottom: 20,
    },
    scaleable: true,
  },
) {
  console.log(educationData, topographicData);
  console.log(topojson.feature(topographicData, topographicData.objects.nation));

  // #region Shared variables
  const { width, height, margin, scaleable } = svgConfig;
  const chart = d3.select(baseNode).append('svg');
  // #endregion

  // #region SVG setup and scaling
  if (scaleable) {
    chart
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMin');
  } else {
    chart.attr('width', width).attr('height', height);
  }
  // #endregion

  // #region Map variables
  const counties = chart.append('g');
  const states = chart.append('g');
  // #endregion

  // #region Create color scale
  const bachelorsDegreeRange = d3.extent(educationData, d => d.bachelorsOrHigher);
  const greenColorScale = d3
    .scaleSequential(interpolateGreens)
    .domain(bachelorsDegreeRange);
  // #endregion

  // #region Draw map
  counties
    .selectAll('path')
    .data(topojson.feature(topographicData, topographicData.objects.counties).features)
    .enter()
    .append('path')
    .attr('d', d3.geoPath())
    .attr('fips', d => d.id)
    .attr('stroke', 'rgba(40,40,40,6)')
    .attr('stroke-width', '.3')
    // Add education data
    .attr('fill', d => {
      const currentCounty = educationData.find(county => county.fips === d.id);
      return greenColorScale(currentCounty.bachelorsOrHigher);
    });

  states
    .selectAll('path')
    .data(topojson.feature(topographicData, topographicData.objects.states).features)
    .enter()
    .append('path')
    .attr('d', d3.geoPath())
    .attr('fill', 'none')
    .attr('stroke', 'rgba(20,20,20,.7)')
    .attr('stroke-width', 0.7);
  // #endregion

  // #region Add chart title
  const description = chart
    .append('text')
    .text(
      "Percentage of adults 25 or older with at least a bachelor's degree or higher (2010 - 2014)",
    )
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(530, 30)`);
  // #endregion

  // #region Add color legend
  const strokeWidth = 0.01;
  const ticks = 5;
  const legendStart = bachelorsDegreeRange[0] - bachelorsDegreeRange[0] % ticks;
  const legendEnd = Math.ceil(bachelorsDegreeRange[1] / 10) * 10;
  console.log(bachelorsDegreeRange[0], legendEnd);
  const colorLegend = chart
    .append('g')
    .attr('transform', 'translate(630, 50) scale(2.5)');
  const colorSpread = d3.range(legendStart, legendEnd, strokeWidth).forEach(d => {
    colorLegend
      .append('line')
      .attr('y1', 1)
      .attr('y2', 5)
      .attr('x1', d)
      .attr('x2', d)
      .style('stroke', greenColorScale(d))
      .style('stroke-width', strokeWidth);
  });

  const colorLegendTicks = d3.ticks(legendStart, legendEnd, ticks);
  colorLegendTicks.forEach(d => {
    colorLegend
      .append('line')
      .attr('y1', 0)
      .attr('y2', 8)
      .attr('x1', d)
      .attr('x2', d)
      .style('stroke-width', 0.2)
      .style('stroke', 'black');

    colorLegend
      .append('text')
      .text(d + '%')
      .attr('transform', `translate(${d + 1}, 11)`)
      .style('text-anchor', 'hanging')
      .style('font-size', 4);
  });
  // #endregion
}
