barChart("../json/converted1.json","age","literate_population","Age-Group vs Literate Population");
barChart("../json/converted2a.json","areaname","graduate_population","State vs Literate Population");
barChart("../json/converted2b.json","gender","literate","Male/Female Literate Population");

groupChart("../json/converted3.json","Education Category-wise");

function barChart(filepath,atr1,atr2,title)
{

  var margin = {top: 50 , right: 20, bottom: 200, left: 100},
  width = 1200 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

  var y = d3.scale.linear()
  .range([height, 0]);

  var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

  var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  d3.json(filepath, function(error, data) {

    if (error) throw error;

    svg.append("text")
    .attr("transform","rotate(-90)")
    .attr("y", 0 -margin.left)
    .attr("x", 0-(height/2))
    .attr("dy","1em")
    .text("Population");

    svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .style("text-decoration", "underline")
    .style("color", "#800000")
    .style("font-weight", "bold")
    .text(title);





    var obj={};
    obj=data.map(function(d){return d;})
    x.domain(obj.map(function(d) { return d[atr1]; }));
    y.domain([0, d3.max(obj, function(d) { return d[atr2] ; })]);


    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);



    svg.selectAll(".bar")
    .data(obj)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {  return x(d[atr1]); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d[atr2]); })
    .attr("height", function(d) { return height - y(d[atr2]); });




  });
}//end of function
//Part-3
function groupChart(filepath,title)
{
  var margin = {top: 50, right: 20, bottom: 30, left: 90},
  width = 1100 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  var x0 = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

  var x1=d3.scale.ordinal();

  var y = d3.scale.linear()
  .range([height, 0]);


  var color = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00","#ff1a1a","#ff6600","#cccc00"]);


  var xAxis = d3.svg.axis()
  .scale(x0)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");


  var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  d3.json(filepath, function(error, data) {


    var education=[];
    var w=0;
    data.forEach(function(d) {
      education[w]=d.education;
      w++;

    });

    var names=[];
    w=0;
    education[0].forEach(function (d)
    {
      names[w]=d.edu;
      w++;

    });




    if (error) throw error;
    x0.domain(data.map(function(d) { return d.category; }));
    x1.domain(names).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(education, function(d) { return d3.max(d, function(d) {return d.population; }); })]);


    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Population");

    svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .style("text-decoration", "underline")
    .style("color", "#800000")
    .style("font-weight", "bold")
    .text(title);


    var category = svg.selectAll(".category")
    .data(data)
    .enter().append("g")
    .attr("class", "category")
    .attr("transform", function(d) { return "translate(" + x0(d.category) + ",0)"; });

    category.selectAll("rect")
    .data(function(d){return d.education;})
    .enter().append("rect")
    .attr("width", x1.rangeBand())
    .attr("x", function(d) {  return x1(d.edu); })
    .attr("y", function(d) {return y(d.population);})
    .attr("height", function(d) { return height-y(d.population) ; })
    .style("fill", function(d) { return color(d.edu); });



    var legend = svg.selectAll(".legend")
    .data(names)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

    legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });

  });


}
