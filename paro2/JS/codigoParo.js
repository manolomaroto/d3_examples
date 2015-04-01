/* Author(s) = Manuel Maroto (@manuelgmaroto), Luis Sevillano (@SepirData)
 * Date: 2014 Sept
 */
d3.csv("historico.csv",function(error,datos){
window.onload = search();
var dispositivo;
var trimestres = new Array('2013TIV', '2013TIII', '2013TII', '2013TI', '2012TIV', '2012TIII', '2012TII', '2012TI', '2011TIV', '2011TIII', '2011TII', '2011TI', '2010TIV', '2010TIII', '2010TII', '2010TI', '2009TIV', '2009TIII', '2009TII', '2009TI', '2008TIV', '2008TIII', '2008TII', '2008TI', '2007TIV', '2007TIII', '2007TII', '2007TI', '2006TIV', '2006TIII', '2006TII', '2006TI', '2005TIV', '2005TIII', '2005TII', '2005TI');
trimestres.reverse();
function addComas(n) {
    var formatValue = d3.format("0,000");
    return formatValue(n).replace('.', ',').replace('.', ',');
}
var colores = new Array("#c6dcf1", "#a6badb", "#78a8d0", "#5193c5", "#2582bd", "#BD294B", "#90062A", "#421E2A");
//var colores = new Array("#E6F6F4", "#88D7CF", "#ABCEAB", "#D8C47D", "#F4A45F", "#F6624D", "#BD294B", "#90062A", "#421E2A");
function getColor(d) {
    return d > 40 ? colores[4] :
            d > 30 ? colores[3] :
            d > 20 ? colores[2] :
            d > 10 ? colores[1] :
            colores[0];
}
var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip");
function search() {
    var tipoDispositivo = navigator.userAgent.toLowerCase();
    if (tipoDispositivo.search(/iphone|ipod|ipad|android/) > -1) {
        dispositivo = "click";
    }
    else {
        dispositivo = "mouseover";
    }
}
var nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var datosParo = totalParo();
var ultimaPosicion = datosParo[datosParo.length - 1];
function addPuntos(numero) {
    var formatValue = d3.format("0,000");
    return formatValue(numero).replace(',', '.').replace(',', '.');
}
function totalParo() {
    var paroData = [];
    for(var i = 0; i <datos.length; i++){
        paroData[i] = +datos[i].Total;
    }
    var agriculturaData = [];
    for(var i = 0;i < datos.length; i++){
        agriculturaData[i] = +datos[i].Agricultura;
    }
    var industriaData = [];
    for(var i = 0;i < datos.length; i++){
        industriaData[i] = +datos[i].Industria;
    }
    
    var construccionData = [];
    for(var i = 0;i < datos.length; i++){
        construccionData[i] = +datos[i].Construccion;
    }
    
    var serviciosData = [];
    for(var i = 0;i < datos.length; i++){
        serviciosData[i] = +datos[i].Servicios;
    }
    var sinAnt = [];
    for(var i = 0;i < datos.length; i++){
        sinAnt[i] = +datos[i].SinEmpleoAnt;
    }
    
    currentYear = datos[datos.length-1].year;
    currentMonth = datos[datos.length-1].mes;
    numeroMes=0;
    
    for(var i = 0; i<nombreMeses.length;i++){
        if (currentMonth==datos[i].mes){
            numeroMes=i;
        }
    }
    
    
    var datosParo = [];
    var fecha = new Date(2005, 0, 1);
    var cont = 0;
    for (i = 0; i < paroData.length; i++) {
        if (cont > 11) {
            cont = 0;
        }
        datosParo.push({"fecha": new Date(fecha.getFullYear(), fecha.getMonth() + i, 1), "mes": nombreMeses[cont], "Total": paroData[i], "Industria": industriaData[i], "Agricultura": agriculturaData[i], "Construccion": construccionData[i], "Servicios": serviciosData[i], "SinEmpleoAnt": sinAnt[i]});
        cont++;
    }
    return datosParo;
}

var height = 330, width = 880, trans = 60;
var w = 950, h = 380;
/* ------------------------------------------ */
var contenedorSvg = d3.select("#contenedorGrafico").append("svg")
        .attr("width", w)
        .attr("height", h);
//Ponemos en la escala las funciones que determinen el tamaño del rango
var escalaX = d3.time.scale()
        .domain([new Date(2005, 0, 1), new Date(currentYear, numeroMes, 1)])
        .range([0, width]);
var escalaY = d3.scale.linear()
        .domain([0, 6000000])
        .range([height, 10]);
var ejeY = d3.svg.axis()
        .scale(escalaY)
        .orient("left")
        .ticks(8)
        .tickFormat(function(d) {
            return addPuntos(d);
        });
var ejeX = d3.svg.axis()
        .scale(escalaX)
        .orient("bottom")
        .ticks(15);
var area = d3.svg.area()
        .x(function(d) {
            return escalaX(d.fecha);
        })
        .y0(height)
        .y1(function(d) {
            return escalaY(d.Total);
        })
        .interpolate("linear");
var funcionLinea = d3.svg.line()
        .x(function(d) {
            return escalaX(d.fecha);
        })
        .y(function(d) {
            return escalaY(d.Total);
        })
        .interpolate("linear");
var dibujaLinea = contenedorSvg.append("path")
        .attr("d", funcionLinea(datosParo))
        .attr("stroke", "steelblue")
        .attr("stroke-width", 4)
        .attr("fill", "none")
        .attr("transform", "translate(" + trans + ",0)");
contenedorSvg.append("path")
        .datum(datosParo)
        .attr("class", "area")
        .attr("d", area)
        .attr("transform", "translate(" + trans + ",0)");
contenedorSvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + trans + "," + height + ")")
        .call(ejeX)
        .attr("pointer-events", "none");
contenedorSvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + trans + ",0)")
        .call(ejeY)
        .attr("pointer-events", "none"); //grid
contenedorSvg.append("g")
        .attr("class", "grid")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .attr("opacity", 0.3)
        .attr("transform", "translate(" + trans + "," + height + ")")
        .call(ejeX.tickSize(-320, 0, 0).tickFormat(""));
contenedorSvg.append("g")
        .attr("class", "grid")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .attr("opacity", 0.3)
        .call(ejeY.tickSize(-width, 0, 0).tickFormat(""))
        .attr("transform", "translate(" + trans + ",0)");
contenedorSvg.selectAll("rect")
        .data(datosParo)
        .enter()
        .append("rect")
        .attr("x", function(d) {
            return escalaX(d.fecha);
        })
        .attr("y", 0)
        .attr("height", height)
        .attr("width", 10)
        .attr("transform", "translate(" + 57 + ",0)")
        .attr("opacity", 0)
        .on(dispositivo, function(d) {
            d3.select(this)
                    .call(remove);
            var centroX = escalaX(d.fecha);
            var centroY = escalaY(d.Total);
            contenedorSvg.append("circle")
                    .attr("cx", centroX)
                    .attr("cy", centroY)
                    .attr("r", 7.5)
                    .attr("id", "circulo")
                    .attr("transform", "translate(" + trans + ",0)")
                    .attr("fill", "steelblue");
            contenedorSvg.append("line")
                    .attr("x1", 0)
                    .attr("y1", centroY)
                    .attr("x2", width)
                    .attr("y2", centroY)
                    .attr("stroke-width", 1)
                    .attr("stroke", "steelblue")
                    .attr("transform", "translate(" + trans + ",0)")
                    .attr("id", "linea1")
                    .attr("pointer-events", "none");
            contenedorSvg.append("line")
                    .attr("x1", centroX)
                    .attr("y1", height)
                    .attr("x2", centroX)
                    .attr("y2", 10)
                    .attr("stroke-width", 1)
                    .attr("stroke", "steelblue")
                    .attr("transform", "translate(" + trans + ",0)")
                    .attr("id", "linea2")
                    .attr("pointer-events", "none");
            div.style("opacity", 1);
            div.style("left", function() {
                return d3.event.pageX > (w - 100) ? (d3.event.pageX - 130) + "px" : (d3.event.pageX) + "px";
            })
                    .style("top", centroY + 40 + "px")
                    .html(function() {
                        return  "<b>" + addPuntos(d.Total) + "</b><br/>" + d.mes + " " + d.fecha.getFullYear();
                    });
            d3.select('#donut', update(d));
            d3.select('#barras', update(d));
            totValue.text(function() {
                return addPuntos(d.Total);
            });
        })
        .on("mouseout", function() {
            return div
                    .style("opacity", 0);
        });
function remove() {
    var linea1 = document.getElementById("linea1");
    var linea2 = document.getElementById("linea2");
    var circulo = document.getElementById("circulo");
    var circuloIn = document.getElementById("circuloIn");
    if (circulo) {
        var madre = circulo.parentNode;
        madre.removeChild(circulo);
    }
    if (circuloIn) {
        var madre = circuloIn.parentNode;
        madre.removeChild(circuloIn);
    }
    if (linea1 && linea2) {
        var padre = linea1.parentNode;
        padre.removeChild(linea1);
        padre.removeChild(linea2);
    }
}
////-----//////---/////////-----/////////----//////////-----///////----////////----/////-----/////////-----/////---///------////---/////
var barras = [];
for (i = 0; i < datosParo.length; i++) {
    if (datosParo[i].mes === select.value) {
        barras.push({"fecha": datosParo[i].fecha, "mes": datosParo[i].mes, "Total": datosParo[i].Total});
    }
}
var svg = d3.select("#barras").append("svg")
        .attr("width", 435)
        .attr("height", 235)
        .attr("class", "barr")
        .append("g");
var x = d3.scale.linear()
        .domain([2005, 2015])
        .range([10, 410]);
var y = d3.scale.linear()
        .domain([0, 6000000])
        .range([-5, 220]);
var yBarras = d3.scale.linear()
        .domain([0, 6000000])
        .range([220, 5]);
var ejeXBarras = d3.svg.axis()
        .scale(x)
        .ticks(10)
        .tickFormat(function(d) {
            var formatValue = d3.format("0.000");
            return formatValue(d).replace('.', '');
        });
var ejeYBarras = d3.svg.axis()
        .orient("left")
        .scale(yBarras)
        .ticks(5);
var xAxisGroupBarras = svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(3,210.5)")
        .call(ejeXBarras);
var lineas = [25, 55, 85, 115, 145, 175];
for (i = 0; i < lineas.length; i++) {
    svg.append("g")
            .attr("class", "grid")
            .append("line")
            .attr("x1", 0)
            .attr("y1", lineas[i])
            .attr("x2", 410)
            .attr("y2", lineas[i])
            .attr("transform", "translate(" + 10 + ",0)")
            .attr("pointer-events", "none");
}
var vis = d3.select("#donut")
        .append("svg")
        .attr("width", 520)
        .attr("height", 250)
        .append("svg:g")
        .attr("transform", "translate(" + 270 + "," + 120 + ")");
vis.append("g")
        .attr("class", "slices");
vis.append("g")
        .attr("class", "labels");
vis.append("g")
        .attr("class", "lines");
var radius = 135;
var radius2 = 120;
var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) {
            return d.value;
        });
var arc = d3.svg.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.4);
var outArc = d3.svg.arc()
        .innerRadius(radius * 0.85)
        .outerRadius(radius * 0.85);
var c_group = vis.append("svg:g")
        .attr("class", "c_group");
var c_Circle = c_group.append("svg:circle")
        .attr("fill", "white")
        .attr("r", radius * 0.4);
var totLabel = c_group.append("svg:text")
        .attr("class", "label")
        .attr("dy", -15)
        .attr("text-anchor", "middle")
        .text("TOTAL");
var totValue = c_group.append("svg:text")
        .attr("class", "total")
        .attr("dy", 7)
        .attr("text-anchor", "middle")
        .text(function() {
            return addPuntos(ultimaPosicion.Total);
        });
var totalUnits = c_group.append("svg:text")
        .attr("class", "units")
        .attr("dy", 21)
        .attr("text-anchor", "middle") // text-align: right
        .text("Parados");
////-----//////---/////////-----/////////----//////////-----///////----////////----/////-----/////////-----/////---///------////---/////
contenedorSvg
        .append("circle")
        .attr("cx", escalaX(ultimaPosicion.fecha))
        .attr("cy", escalaY(ultimaPosicion.Total))
        .attr("r", 7.5)
        .attr("id", "circuloIn")
        .attr("fill", "#ff0000")
        .attr("transform", "translate(" + trans + ",-1)");
function update(d) {
    for (i = 0; i < nombreMeses.length; i++) {
        if (nombreMeses[i] === d.mes) {
            document.getElementById('select').value = nombreMeses[i];
        }
    }
    var barras = [];
    for (i = 0; i < datosParo.length; i++) {
        if (datosParo[i].mes === d || datosParo[i].mes === d.mes) {
            barras.push({"fecha": datosParo[i].fecha, "mes": datosParo[i].mes, "Total": datosParo[i].Total});
        }
    }
    var bars = svg.selectAll("rect")
            .data(barras);
    bars
            .enter()
            .append("rect")
            .attr("transform", "translate(17,-20)")
            .attr("width", "0")
            .attr("fill", "#5295C5");
    bars
            .exit()
            .transition()
            .duration(400)
            .attr("transform", "translate(30,-20)")
            .attr("width", 0)
            .remove();
    bars
            .transition()
            .duration(400)
            .attr("transform", "translate(3,-20)")
            .attr("x", function(d) {
                return x(d.fecha.getFullYear());
            })
            .attr("y", function(d) {
                return 230 - y(d.Total);
            })
            .attr("width", 35)
            .attr("height", function(d) {
                return y(d.Total);
            })
            .attr("value", function(d) {
                return d.Total;
            })
            .text(function(d) {
                return d.mes;
            });
    bars
            .on(dispositivo, function(d) {
                d3.select(this)
                        .attr('fill', "#5295C5");
                div.style("opacity", 1)
                        .style("left", 520 + "px")
                        .style("top", 480 + "px")
                        .html(function() {
                            return "<b>" + addPuntos(d.Total) + "</b><br/>" + d.mes + " " + d.fecha.getFullYear();
                        });
            })
            .on('mouseout', function() {
                d3.select(this)
                        .attr('fill', "#5295C5");
            });
    var textBar = svg.selectAll(".textBar")
            .data(barras);
    textBar
            .enter()
            .append("text")
            .attr("class", "textBar")
            .attr("transform", "translate(8,0)")
            .attr("opacity", 0)
            .attr("pointer-events", "none");
    textBar.exit()
            .transition()
            .duration(120)
            .remove();
    textBar
            .transition()
            .duration(400)
            .attr("opacity", 1)
            .text(function(d, i) {
                var format = String(d.Total / 1000000);
                return format.substring(0, 4);
            })
            .attr({
                x: function(d) {
                    return x(d.fecha.getFullYear());
                },
                y: function(d) {
                    return 230 - y(d.Total);
                }
            })
            .attr("font-size", "12px")
            .attr("dy", "-25");
////-----//////---/////////-----/////////----//////////-----///////----////////----/////-----/////////-----/////---///------////---/////
    var fecha = d.mes + " de " + d.fecha.getFullYear();
    var total = d.Total;
    var color = d3.scale.linear().range(["#d0d1e6", "#a6bddb", "#74a9cf", "#045a8d", "#2b8cbe"]);
    
    var data = [
        {"label": "Industria", "value": d.Industria},
        {"label": "Agricultura", "value": d.Agricultura},
        {"label": "Construccion", "value": d.Construccion},
        {"label": "Servicios", "value": d.Servicios},
        {"label": "Sin Empleo Ant.", "value": d.SinEmpleoAnt}
    ];
    
    var key = function(d) {
        return d.data.label;
    };
    var slice = vis.select(".slices").selectAll("path.slice")
            .data(pie(data), key);
    slice.enter()
            .insert("path")
            .attr("fill", function(d, i) {
                return color(i);
            })
            .attr("id", function(d, i) {
                return "id_" + i;
            })
            .attr("class", "slice");
    slice
            .transition().duration(400)
            .attrTween("d", function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    return arc(interpolate(t));
                };
            });
    slice
            .on(dispositivo, function() {
                d3.select(this)
                        .attr("opacity", 0.8);
                var z = this.getAttribute("id");
                var id = z.substring(z.length - 1, z.length);
                totValue.text(function() {
                    return addPuntos(data[id].value);
                });
                totLabel.text(function() {

                    return data[id].label.toUpperCase();
                });
            })
            .on('mouseout', function() {
                d3.select(this)
                        .attr("opacity", 1);
                var z = this.getAttribute("id");
                var id = z.substring(z.length - 1, z.length);
                totValue.text(function() {
                    return addPuntos(total);
                });
                totLabel.text("TOTAL");
                ;
            });
    c_group.on(dispositivo, function() {
        vis.select(".slices").selectAll("path.slice")
                .attr("opacity", 1);
        totLabel.text("TOTAL");
        totValue.text(function() {
            return addPuntos(d.Total);
        });
    });
    slice.exit()
            .remove();
    /* ------- TEXT LABELS -------*/
    var text = vis.select(".labels").selectAll("text")
            .data(pie(data), key);
    text.enter()
            .append("text")
            .attr("fill", "#777")
            .attr("dy", ".35em");
    text
            .text(function(d) {
                return d.data.label + " | " + d3.round((d.data.value * 100) / total, 1) + "%";
            });
    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text.transition().duration(400)
            .attrTween("transform", function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    var pos = outArc.centroid(d2);
                    pos[0] = radius2 * (midAngle(d2) < Math.PI ? 1 : -1);
                    return "translate(" + pos + ")";
                };
            })
            .styleTween("text-anchor", function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? "start" : "end";
                };
            });
    text.exit()
            .remove();
    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = vis.select(".lines").selectAll("polyline")
            .data(pie(data), key);
    polyline.enter()
            .append("polyline")
            .attr("pointer-events", "none");
    polyline.transition().duration(400)
            .attrTween("points", function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    var pos = outArc.centroid(d2);
                    pos[0] = radius2 * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                    return [arc.centroid(d2), outArc.centroid(d2), pos];
                };
            });
    polyline.exit()
            .remove();
    document.getElementById('mes').innerHTML = "<i>" + fecha + "</i>";
}
document.getElementById("rangoFechas").innerHTML = "<i>" + datosParo[0].mes + " de " + datosParo[0].fecha.getFullYear() + " - " + datosParo[datosParo.length - 1].mes + " de " + ultimaPosicion.fecha.getFullYear() + "</i><br/>Numero de parados";
update(ultimaPosicion);

(function() {
    [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function(el) {
        new SelectFx(el);
    });
})();

});
