/**
 *  drawGraph function - draws graph from g_user global variable
 */
 function drawGraph(){
    var graphLinks = [];
    // D3 Window size
    var width = window.innerWidth;
    var height = window.innerHeight;
    // Scale for colors
    var colorArray = ["#616468", "#765F62", "#8B5A5C", "#A05557", "#B55051", "#CA4B4C", "#DF4646", "#F44141"];
    var color = d3.scaleQuantize()
        .domain([0, 10000000])
        .range(colorArray);
    // Scale for sizes
    var radiusScale = d3.scalePow();
    radiusScale
        .exponent(0.2)
        .domain([0, 10000000])
        .range([2, 15]);

    var svg = d3.select('.data-display')
        .append('svg')
        .attr('class', 'main-svg')
        .attr('width',width)
        .attr('height',height)
     
    for (var x = 0; x < g_user.followings.length; x++){
        var link = {
            'source': g_user.permalink,
            'target':g_user.followings[x].permalink,
            'value': Math.round(Math.random()*9),
            
        }
        graphLinks.push(link);
    }
    var graph = {
        'nodes' : g_user.followings,
        'links' : graphLinks
    }

    // graph.nodes.push(g_user)

    var simulation = d3.forceSimulation(graph.nodes)
        .force("charge", d3.forceManyBody())
        .force("center",d3.forceCenter(width * 0.55, height/2))
        .force('forceX', d3.forceX().strength(.1).x(width * .5))
        .force('forceY', d3.forceY().strength(.1).y(height * .5))
        .force("charge", d3.forceManyBody())
    
    var nodes = svg.append('g')
        .attr('class','nodes')
        .selectAll('circle')
        .data(graph.nodes)
        .enter()
            .append('circle')
            .attr('class','node')
            .attr('r',function(d){return radiusScale(d.followers_count)})
            .attr('fill',function(d){return color(d.followers_count)})

    simulation
      .nodes(graph.nodes)
      .on("tick", ticked)
    
    function ticked (){
        nodes
            .attr('cx',function(d){return d.x})
            .attr('cy',function(d){return d.y})
    }
} 
 