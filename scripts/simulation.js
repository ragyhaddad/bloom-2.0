/**
 *  Draws graph and simulation.
 *  - Takes data from g_user global variable
 */
 function drawGraph(){
    // D3 Variables
    var graphLinks = [];

    // Parsing links
    for (var x = 0; x < g_user.followings.length; x++){
        var link = {
            'source': g_user.permalink,
            'target':g_user.followings[x].permalink,
            'value': Math.round(Math.random()*9)
        }
        graphLinks.push(link);
    }

    if(g_settings.sort){
        var graph = {
            'nodes' : g_graph.nodes_sorted,
            'links' : graphLinks
        }
    }else{
        var graph = {
            'nodes' : g_graph.nodes,
            'links' : graphLinks
        }
    }

    // Dimensions
    var width;
    var height;
    if(window.innerWidth < 845){
        width = window.innerWidth-(window.innerWidth/10);
        height = window.innerHeight-85;
    }else{
        width = window.innerWidth-300;
        height = window.innerHeight;
    }

    // Finding range of followers
    var maxFollowers = -1;
    var minFollowers = 10000000000; 
    g_user.followings.forEach(element => {
        if(element.followers_count > maxFollowers){
            maxFollowers = element.followers_count;
        }
        if(element.followers_count < minFollowers){
            minFollowers = element.followers_count;
        }
    });

    // Color scale
    var colorArray = ["#616468", "#765F62", "#8B5A5C", "#A05557", "#B55051", "#CA4B4C", "#DF4646", "#F44141"];
    var colorScale = d3.scaleQuantize()
        .domain([minFollowers, maxFollowers])
        .range(colorArray);

    // Size scale
    var radiusScale = d3.scalePow()
        .exponent(0.2)
        .domain([minFollowers, maxFollowers])
        .range([4, 17]);

    // Zoom Options
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
    
    // Creating svg
    var svg = d3.select('.data-display')
        .append('svg')
        .attr('class', 'main-svg')
        .attr('width','100%')
        .attr('height','100%')
        .on('zoom',zoomed)

    // Creating tooltip
    var tooltip = d3.select('.data-display').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    // Adding nodes
    var nodes = svg.append('g')
        .attr('class','nodes')
        .selectAll('circle')
        .data(graph.nodes)
        .enter()
        .append('circle')
        .attr('class','node')
        .attr('class', function(d){
            if(d.id == g_user.id || d.followers_count > g_settings.follower_slider.min && d.followers_count < g_settings.follower_slider.max){
                return 'node-active';
            }
            else{
                return 'node-unactive';
            }
        })
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
                if(d.followers_count < g_settings.follower_slider.min || d.followers_count > g_settings.follower_slider.max){
                    return "var(--light-3)";
                }
                return colorScale(d.followers_count);
            } 
        })
        .attr('stroke',function(){
            return 'var(--light-2)';
        })
        .attr('onclick',function(d){
            return `fetchUser("${d.permalink}")`;
        })
        .on('mouseover', (d) => {
            if(d.id == g_user.id || d.followers_count > g_settings.follower_slider.min && d.followers_count < g_settings.follower_slider.max){
                tooltip.transition()
                    .duration(0)
                    .style('opacity', .9);
                tooltip.html('<p>'+d.username+'</p><p class="tooltip-subtext">'+parseCount(d.followers_count)+'</p>')
                    .style('left', (d3.event.clientX)+'px')
                    .style('top', (d3.event.clientY - 50)+'px');
            }
        })
        .on('mousemove', (d) => {
            if(d.id == g_user.id || d.followers_count > g_settings.follower_slider.min && d.followers_count < g_settings.follower_slider.max){
                tooltip.style('left', (d3.event.clientX)+'px')
                    .style('top', (d3.event.clientY - 50)+'px');
            }
        })
        .on('mouseout', (d) => {
            if(d.id == g_user.id || d.followers_count > g_settings.follower_slider.min && d.followers_count < g_settings.follower_slider.max){
                tooltip.transition()
                    .duration(0)
                    .style('opacity', 0);
            }
        })
       
    // Adding links 
    var links = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        
    // Simulation options 
    var simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id((d) => {
            return d.permalink;
        }))
        .force("charge", d3.forceManyBody())
        .force("center",d3.forceCenter(width *0.55, height/2))
        .force('charge', d3.forceManyBody().strength(-40))
        .force('forceX', d3.forceX().strength(.1).x(width * .5))
        .force('forceY', d3.forceY().strength(.1).y(height * .5))

    // Apply simulation to data objects
    simulation
      .nodes(graph.nodes)
      .on("tick", ticked)

    // Translate simulation to graph
    function ticked (){
        nodes
            .attr('cx',function(d){return d.x})
            .attr('cy',function(d){return d.y})
    }

    // Attach Zoom to SVG after rendering
    svg.call(zoom);  
    
    $('.click-blocker').css('display', 'none');
} 