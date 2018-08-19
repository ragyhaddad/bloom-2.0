/**
 *  drawGraph function - draws graph from g_user global variable
 */
 function drawGraph(){
     /**
      * D3 Variables
      */
    var graphLinks = [];
    var colorArray = ["#616468", "#765F62", "#8B5A5C", "#A05557", "#B55051", "#CA4B4C", "#DF4646", "#F44141"];

    /**
     * Data Parsing
     */
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

    //Unshift source node to the beginning of the array - Avoiding adding links to center node.
    currentNode = {'id':g_user.id, 'followers_count':g_user.followers_count, 'permalink':g_user.permalink};
    graph.nodes.unshift(currentNode);


    /**
     * Dimensions
     */
    var width = window.innerWidth;
    var height = window.innerHeight;
    /**
     * Scales
     */
    var colorScale = d3.scaleQuantize()
        .domain([0, 10000000])
        .range(colorArray);
    var radiusScale = d3.scalePow();
        radiusScale
        .exponent(0.2)
        .domain([0, 10000000])
        .range([4, 17]);

    
    /**
     * Zoom Options
     */
    var zoom = d3.zoom()
        .scaleExtent([0.5, 8])
        .translateExtent([
          [-width * 2, -height * 2],
          [width * 2, height * 2]
        ])
        .on("zoom", zoomed);
    function zoomed() {
        nodes.attr("transform", d3.event.transform);
    }
    
    /**
     * Drawing the graph
     */
    var svg = d3.select('.data-display')
        .append('svg')
        .attr('class', 'main-svg')
        .attr('width','100%')
        .attr('height','100%')
        .on('zoom',zoomed)
    

    //Add nodes
    var nodes = svg.append('g')
        .attr('class','nodes')
        .selectAll('circle')
        .data(graph.nodes)
        .enter()
        .append('circle')
        .attr('class','node')
        .attr('r',function(d){
            if (d.id == g_user.id) {
                return 15;
            }
            else{
                return radiusScale(d.followers_count)
            }
            
        })
        .attr('fill',function(d){
            if(d.id == g_user.id){
                return "var(--accent)";
            }
            else{
                return colorScale(d.followers_count);

            } 
        })
        .attr('stroke',function(){
            return 'var(--light-2)';
        })
        .attr('onclick',function(d){
            return `fetchUser("${d.permalink}")`;

            }
            
        )
       
    
    //Add links 
    var links = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        
    //Simulation options 
    var simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id((d) => {
            return d.permalink;
        }))
        .force("charge", d3.forceManyBody())
        .force("center",d3.forceCenter(width *0.55, height/2))
        .force('charge', d3.forceManyBody().strength(-85))
        .force('forceX', d3.forceX().strength(.1).x(width * .5))
        .force('forceY', d3.forceY().strength(.1).y(height * .5))


    
    //Apply simulation to data objects
    simulation
      .nodes(graph.nodes)
      .on("tick", ticked)

    //Translate simulation to graph
    function ticked (){
        nodes
        .attr('cx',function(d){return d.x})
        .attr('cy',function(d){return d.y})

    }

    /**
     * Attach Zoom to SVG after rendering
     */
    svg.call(zoom);

   
} 
 