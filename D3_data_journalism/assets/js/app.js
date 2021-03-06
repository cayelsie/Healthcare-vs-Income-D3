// @TODO: YOUR CODE HERE!
var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(stateData) {

    // Parse Data/Cast as numbers
    // ==============================
    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
        console.log(data.poverty);
      });

    //Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d => d.poverty) * 0.8,
    d3.max(stateData, d => d.poverty) * 1.1])
    .range([0, width]);


  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d => d.healthcare) *0.9, d3.max(stateData, d => d.healthcare)])
    .range([height, 0]); 



    //Create axis variables
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

      
    //Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "11")
    .attr("fill", "dodgerblue")
    .attr("opacity", ".5");

    //Create labels inside the circles
    //==========================================
    var labels = chartGroup.selectAll(null)
    .data(stateData)
    .enter()
    .append("text")
    .attr("x", d=> xLinearScale(d.poverty))
    .attr("y", d=> yLinearScale(d.healthcare) + 3)
    .text(d => d.abbr)
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("fill", "white");


    //Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 1.5))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .attr("font-weight", "bold")
    .text("Lacks Healthcare (%)");
  
    chartGroup.append("text")
    .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .attr("font-weight", "bold")
    .text("In Poverty (%)");
    })
    .catch(function(error) {
      console.log(error);
    });