(function (React$1, ReactDOM, d3) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  var csvUrl =
    'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

  var useData = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      var row = function (d) {
        d.Population = +d['2020'] * 1000;
        return d;
      };
      d3.csv(csvUrl, row).then(function (data) {
        setData(data.slice(0, 10));
      });
    }, []);
    
    return data;
  };

  var AxisBottom = function (ref) {
      var xScale = ref.xScale;
      var innerHeight = ref.innerHeight;
      var tickFormat = ref.tickFormat;

      return xScale.ticks().map(function (tickValue) { return (
      React.createElement( 'g', { className: "tick", key: tickValue, transform: ("translate(" + (xScale(tickValue)) + ",0)") },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', { style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + 3 },
          tickFormat(tickValue)
        )
      )
    ); });
  };

  var AxisLeft = function (ref) {
      var yScale = ref.yScale;

      return yScale.domain().map(function (tickValue) { return (
      React.createElement( 'g', { className: "tick" },
        React.createElement( 'text', {
          key: tickValue, style: { textAnchor: 'end' }, x: -3, dy: ".32em", y: yScale(tickValue) + yScale.bandwidth() / 2 },
          tickValue
        )
      )
    ); });
  };

  var Marks = function (ref) {
      var data = ref.data;
      var xScale = ref.xScale;
      var yScale = ref.yScale;
      var xValue = ref.xValue;
      var yValue = ref.yValue;
      var tooltipFormat = ref.tooltipFormat;

      return data.map(function (d) { return (
      React.createElement( 'rect', {
        className: "mark", key: yValue(d), x: 0, y: yScale(yValue(d)), width: xScale(xValue(d)), height: yScale.bandwidth() },
        React.createElement( 'title', null, tooltipFormat(xValue(d)) )
      )
    ); });
  };

  var width = 960;
  var height = 500;
  var margin = { top: 20, right: 30, bottom: 65, left: 220 };
  var xAxisLabelOffset = 50;

  var App = function () {
    var data = useData();

    if (!data) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
    }

    var innerHeight = height - margin.top - margin.bottom;
    var innerWidth = width - margin.left - margin.right;

    var yValue = function (d) { return d.Country; };
    var xValue = function (d) { return d.Population; };

    var siFormat = d3.format('.2s');
    var xAxisTickFormat = function (tickValue) { return siFormat(tickValue).replace('G', 'B'); };

    var yScale = d3.scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .paddingInner(0.15);

    var xScale = d3.scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);

    return (
      React$1__default.createElement( 'svg', { width: width, height: height },
        React$1__default.createElement( 'g', { transform: ("translate(" + (margin.left) + "," + (margin.top) + ")") },
          React$1__default.createElement( AxisBottom, {
            xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat }),
          React$1__default.createElement( AxisLeft, { yScale: yScale }),
          React$1__default.createElement( 'text', {
            className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset, textAnchor: "middle" }, "Population"),
          React$1__default.createElement( Marks, {
            data: data, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, tooltipFormat: xAxisTickFormat })
        )
      )
    );
  };
  var rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React, ReactDOM, d3));
//# sourceMappingURL=bundle.js.map
