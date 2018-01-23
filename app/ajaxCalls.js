export function getEducationData(component) {
  const getData = new XMLHttpRequest();
  getData.open(
    'GET',
    'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json',
    true,
  );
  getData.send();
  getData.onload = function() {
    const educationData = JSON.parse(getData.responseText);
    component.setState({ educationData });
  };
}

export function getTopographicalData(component) {
  const getData = new XMLHttpRequest();
  getData.open(
    'GET',
    'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json',
    true,
  );
  getData.send();
  getData.onload = function() {
    const topographicData = JSON.parse(getData.responseText);
    component.setState({ topographicData });
  };
}
