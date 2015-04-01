/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

search();
var dispositivo;
var meses = new Array("ene-05", "feb-05", "mar-05", "abr-05", "may-05", "jun-05", "jul-05", "ago-05", "sep-05", "oct-05", "nov-05", "dic-05", "ene-06", "feb-06", "mar-06", "abr-06", "may-06", "jun-06", "jul-06", "ago-06", "sep-06", "oct-06", "nov-06", "dic-06", "ene-07", "feb-07", "mar-07", "abr-07", "may-07", "jun-07", "jul-07", "ago-07", "sep-07", "oct-07", "nov-07", "dic-07", "ene-08", "feb-08", "mar-08", "abr-08", "may-08", "jun-08", "jul-08", "ago-08", "sep-08", "oct-08", "nov-08", "dic-08", "ene-09", "feb-09", "mar-09", "abr-09", "may-09", "jun-09", "jul-09", "ago-09", "sep-09", "oct-09", "nov-09", "dic-09", "ene-10", "feb-10", "mar-10", "abr-10", "may-10", "jun-10", "jul-10", "ago-10", "sep-10", "oct-10", "nov-10", "dic-10", "ene-11", "feb-11", "mar-11", "abr-11", "may-11", "jun-11", "jul-11", "ago-11", "sep-11", "oct-11", "nov-11", "dic-11", "ene-12", "feb-12", "mar-12", "abr-12", "may-12", "jun-12", "jul-12", "ago-12", "sep-12", "oct-12", "nov-12", "dic-12", "ene-13", "feb-13", "mar-13", "abr-13", "may-13", "jun-13", "jul-13", "ago-13", "sep-13", "oct-13", "nov-13", "dic-13", "ene-14", "feb-14", "mar-14", "abr-14", "may-14", "jun-14", "jul-14", "ago-14");
//var trimestres = new Array('2013TIV', '2013TIII', '2013TII', '2013TI', '2012TIV', '2012TIII', '2012TII', '2012TI', '2011TIV', '2011TIII', '2011TII', '2011TI', '2010TIV', '2010TIII', '2010TII', '2010TI', '2009TIV', '2009TIII', '2009TII', '2009TI', '2008TIV', '2008TIII', '2008TII', '2008TI', '2007TIV', '2007TIII', '2007TII', '2007TI', '2006TIV', '2006TIII', '2006TII', '2006TI', '2005TIV', '2005TIII', '2005TII', '2005TI');
//meses.reverse();
function addComas(n) {
    var formatValue = d3.format("0,000");
    return formatValue(n).replace('.', ',').replace('.', ',');
}
var colores = new Array("#c6dcf1", "#a6badb", "#78a8d0", "#5193c5", "#2582bd", "#BD294B", "#90062A", "#421E2A");
//var colores = new Array("#E6F6F4", "#88D7CF", "#ABCEAB", "#D8C47D", "#F4A45F", "#F6624D", "#BD294B", "#90062A", "#421E2A");
function getColor(d) {
    return d > 150 ? colores[4] :
            d > 100 ? colores[3] :
            d > 50 ? colores[2] :
            d > 25 ? colores[1] :
            colores[0];
}
var wmap = 600;
var hmap = 520;
var hCan = 110;
var wCan = 260;

//Define map projection
var projection = d3.geo.mercator()
        .translate([410, 2150])
        .scale(2500);
var path = d3.geo.path()
        .projection(projection);
//Create SVG element
var map = d3.select("#mapa")
        .append("svg")
        .attr("width", wmap)
        .attr("height", hmap);
var projectionCan = d3.geo.mercator()
        .translate([800, 1350])
        .scale(2500);
var pathCan = d3.geo.path()
        .projection(projectionCan);
//Create SVG element
var mapCan = d3.select("#canarias")
        .append("svg")
        .attr("width", wCan)
        .attr("height", hCan);
var inp = document.getElementById('control');
inp.max = meses.length - 1;
inp.value = meses.length - 1;
d3.select('#tasa').html(meses[meses.length - 1].substring(4));
d3.select('#year').html(meses[meses.length - 1].substring(0, 3));

var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .attr("opacity", 0);
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
var select = document.getElementById('selector');
for (i = 0; i < select.length; i++) {
    if (select[i].value == ultimaPosicion.mes) {
        document.getElementById('selector')[i].selected = true;
    }
}

function addPuntos(numero) {
    var formatValue = d3.format("0,000");
    return formatValue(numero).replace(',', '.').replace(',', '.');
}

function totalParo() {
    var paroData = [2176599, 2165420, 2144835, 2095945, 2007393, 1974860, 1989417, 2019110, 2013286, 2052861, 2095580, 2102937, 2171503, 2169277, 2148530, 2075676, 2004528, 1959754, 1954984, 1983677, 1966166, 1992836, 2023164, 2022873, 2082508, 2075275, 2059451, 2023124, 1973231, 1965869, 1970338, 2028296, 2017363, 2048577, 2094473, 2129547, 2261925, 2315331, 2300975, 2338517, 2353575, 2390424, 2426916, 2530001, 2625368, 2818026, 2989269, 3128963, 3327801, 3481859, 3605402, 3644880, 3620139, 3564889, 3544095, 3629080, 3709447, 3808353, 3868946, 3923603, 4048493, 4130625, 4166613, 4142425, 4066202, 3982368, 3908578, 3969661, 4017763, 4085976, 4110294, 4100073, 4231003, 4299263, 4333669, 4269360, 4189659, 4121801, 4079742, 4130927, 4226744, 4360926, 4420462, 4422359, 4599829, 4712098, 4750867, 4744235, 4714122, 4615269, 4587455, 4625634, 4705279, 4833521, 4907817, 4848723, 4980778, 5040222, 5035243, 4989193, 4890928, 4763680, 4698814, 4698783, 4724355, 4811383, 4808908, 4701338, 4814435, 4812486, 4795866, 4684301, 4572385, 4449701, 4419860, 4427930];
    var agriculturaData = [55704, 54083, 56453, 55417, 56349, 57647, 58780, 58958, 60744, 66136, 66737, 65227, 66401, 67906, 67894, 64653, 61571, 62694, 62461, 61613, 61520, 62937, 63888, 61494, 62785, 63102, 64001, 63235, 62654, 63928, 64431, 65341, 65158, 66765, 69210, 68812, 75361, 84219, 75692, 77407, 77327, 80665, 81698, 83524, 85591, 94630, 100422, 101338, 80703, 86031, 93715, 95372, 92920, 94451, 95101, 95018, 95378, 107277, 110067, 106133, 106699, 113570, 120679, 124699, 123171, 123345, 122278, 120950, 117398, 131259, 133696, 126829, 129119, 137733, 143431, 141162, 136103, 140228, 141209, 138742, 137392, 154168, 151597, 145961, 152243, 163462, 168344, 167103, 160200, 161382, 164755, 163423, 160790, 185191, 190968, 187876, 203179, 211166, 214497, 206467, 197062, 198532, 197469, 195304, 181076, 204564, 208954, 200064, 208174, 216083, 230937, 224699, 215807, 220465, 220889, 213995];
    var industriaData = [311643, 309165, 310497, 304003, 295928, 287583, 287705, 297670, 290639, 293124, 293531, 301319, 305207, 303153, 299694, 295033, 285714, 278270, 276777, 285012, 277276, 276553, 275517, 282148, 283787, 280838, 279615, 277313, 270156, 265509, 266067, 276997, 269917, 270556, 271538, 279981, 289695, 290985, 292313, 296943, 299496, 301480, 306403, 322284, 329286, 349430, 372147, 399872, 442682, 468573, 488895, 497672, 494991, 484357, 477446, 488917, 488280, 494085, 497325, 508802, 517675, 522791, 525886, 519840, 508275, 492873, 479856, 489046, 484747, 487185, 485441, 491638, 499904, 503463, 505173, 501080, 490417, 479525, 471278, 480699, 484475, 497047, 500436, 509470, 524575, 534844, 539832, 541660, 538339, 528369, 520921, 527669, 526703, 535591, 540261, 543055, 550818, 552399, 554037, 549333, 540482, 527077, 515844, 519271, 512299, 514564, 510258, 508954, 512531, 507583, 502018, 493736, 479471, 463961, 454163, 459943];
    var construccionData = [257056, 247611, 247405, 236261, 219919, 212251, 218166, 230430, 218645, 220582, 223833, 245100, 241161, 234506, 227740, 220871, 210541, 207356, 213255, 228587, 215645, 213405, 216746, 236771, 230292, 224256, 219796, 218241, 214243, 216895, 228795, 250883, 238892, 240385, 251565, 283867, 292797, 305263, 316990, 333637, 349128, 370208, 390529, 429060, 443301, 479576, 520029, 590730, 678141, 706734, 723347, 728526, 712621, 696254, 688962, 709362, 708078, 716880, 726788, 781724, 788760, 798675, 797572, 782037, 761464, 740211, 723689, 737295, 727557, 724860, 724091, 753067, 758342, 760892, 762528, 759915, 738993, 727844, 722230, 732622, 732437, 746381, 752150, 775928, 792275, 807931, 810375, 808987, 796569, 779445, 764653, 767135, 757448, 753778, 751507, 755832, 759309, 760686, 761458, 742759, 724122, 705606, 688296, 685480, 668687, 658320, 646388, 652697, 649211, 643061, 629169, 617966, 593772, 574631, 559917, 560079];
    var serviciosData = [1333246, 1333490, 1308167, 1276372, 1207691, 1185697, 1198440, 1208039, 1207863, 1249976, 1282800, 1266389, 1329141, 1329703, 1316339, 1265554, 1222927, 1189691, 1186054, 1196743, 1193302, 1215596, 1238456, 1224869, 1281604, 1279232, 1264924, 1234129, 1201624, 1191208, 1190159, 1218721, 1221460, 1253805, 1283684, 1284250, 1382354, 1406114, 1384009, 1401464, 1397851, 1402406, 1414921, 1461265, 1518162, 1631882, 1729579, 1776050, 1936296, 2017144, 2075035, 2086939, 2073610, 2041758, 2027873, 2075678, 2140158, 2202605, 2240863, 2241065, 2343195, 2388615, 2398741, 2385001, 2338621, 2290353, 2245857, 2283950, 2337535, 2386591, 2402348, 2371939, 2477019, 2516588, 2531424, 2482420, 2447807, 2407407, 2378475, 2416182, 2490772, 2576206, 2624994, 2612529, 2745110, 2804340, 2819402, 2811098, 2805203, 2752549, 2754050, 2796441, 2882154, 2979764, 3042930, 2993492, 3102474, 3142262, 3126440, 3108033, 3046697, 2956548, 2918934, 2929677, 2981662, 3050532, 3059016, 2971763, 3071282, 3067530, 3046322, 2961616, 2896348, 2812743, 2800225, 2815386];
    var sinAnt = [218950, 221071, 222313, 223892, 227506, 231682, 226326, 224013, 235395, 223043, 228679, 224902, 229593, 234009, 236863, 229565, 223775, 221743, 216437, 211722, 218423, 224345, 228557, 217591, 224040, 227847, 231115, 230206, 224554, 228329, 220886, 216354, 221936, 217066, 218476, 212637, 221718, 228750, 231971, 229066, 229773, 235665, 233365, 233868, 249028, 262508, 267092, 260973, 189979, 203377, 224410, 236371, 245997, 248069, 254713, 260105, 277553, 287506, 293903, 285879, 292164, 306974, 323735, 330848, 334671, 335586, 336898, 338420, 350526, 356081, 364718, 356600, 366619, 380587, 391113, 384783, 376339, 366797, 366550, 362682, 381668, 387124, 391285, 378471, 385626, 401521, 412914, 415387, 413811, 393524, 383076, 370966, 378184, 379197, 382151, 368468, 364998, 373709, 378811, 382601, 382565, 375917, 378271, 369051, 380631, 383403, 384292, 367860, 373237, 378229, 387420, 386284, 386987, 377901, 384666, 378527]
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
var height = 330, width = 885, trans = 60;
var w = 950, h = 380;
d3.csv("historico.csv", function(data) {
    d3.json("Provincias.json", function(json) {
        d3.json("canarian.json", function(can) {
            for (var i = 0; i < data.length; i++) {
                var codeState = data[i].code;
                var dataValue = data[i][meses[meses.length - 1]];
                for (var j = 0; j < json.features.length; j++) {
                    var jsonState = json.features[j].properties.code;
                    if (codeState == jsonState) {
                        json.features[j].properties.value = dataValue;
                        break;
                    }
                }
                //canarias
                for (var z = 0; z < can.features.length; z++) {
                    var canState = can.features[z].properties.code;
                    if (codeState == canState) {
                        can.features[z].properties.value = dataValue;
                        break;
                    }
                }
            }
            var state = map.selectAll("#mapa path")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("class", "path")
                    .attr("d", path)
                    .style("fill", function(d) {
                        //Get data value
                        var value = d.properties.value;

                        if (value) {
                            //If value exists…
                            return getColor(value);
                        } else {
                            //If value is undefined…
                            return "#ccc";
                        }
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 0.4)
                    .on("mousemove", function(d) {

                        div.style("opacity", 1);
                        div.html("<b>" + d.properties.name + "</b></br>N de parados: " + addComas(data[d.properties.code][meses[inp.value]]) + " <br>" + d.properties.comunidad)
                                .style("left", d3.event.pageX + 10 + "px")
                                .style("top", d3.event.pageY + 10 + "px");
                    })
                    .on("mouseout", function() {
                        return div
                                .style("opacity", 0);
                    });
            //canarias
            var state2 = mapCan.selectAll("#canarias path")
                    .data(can.features)
                    .enter()
                    .append("path")
                    .attr("class", "path")
                    .attr("d", pathCan)
                    .style("fill", function(d) {
                        var value = d.properties.value;
                        if (value) {
                            return getColor(value);
                        } else {
                            return "#ccc";
                        }
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 0.4)
                    .on("mousemove", function(d) {
                        div.style("opacity", 1);
                        div.html("<b>" + d.properties.name + "</b></br>N parados: " + addComas(data[d.properties.code][meses[inp.value]]) + " <br>" + d.properties.comunidad)
                                .style("left", d3.event.pageX + 10 + "px")
                                .style("top", d3.event.pageY + 10 + "px");
                    })
                    .on("mouseout", function() {
                        return div
                                .style("opacity", 0);
                    });
            maxMin(data);
            d3.select("#control")
                    .on("input", function() {
                        d3.select('#tasa').html(meses[inp.value].substring(4));
                        d3.select('#year').html(meses[inp.value].substring(0, 3));
                        state
                                .style("fill", function(d) {
                                    for (var i = 0; i < data.length; i++) {
                                        var codeState = data[i].code;
                                        var dataValue = data[i][meses[inp.value]];
                                        for (var j = 0; j < json.features.length; j++) {

                                            var jsonState = json.features[j].properties.code;
                                            if (codeState == jsonState) {
                                                json.features[j].properties.value = dataValue;

                                                //Stop looking through the JSON
                                                break;
                                            }

                                        }
                                    }
                                    var value = d.properties.value;
                                    if (value) {
                                        //If value exists…
                                        return getColor(value);
                                    } else {
                                        //If value is undefined…
                                        return "#ccc";
                                    }
                                })
                                .attr("stroke", "black")
                                .attr("stroke-width", 0.4)
                                .on(dispositivo, function(d) {

                                    div.style("opacity", 1);
                                    div.html("<b>" + d.properties.name + "</b></br>N parados: " + addComas(data[d.properties.code][meses[inp.value]]) + " <br>" + d.properties.comunidad)
                                            .style("left", d3.event.pageX + 10 + "px")
                                            .style("top", d3.event.pageY + 10 + "px");
                                })
                                .on("mouseout", function() {
                                    return div
                                            .style("opacity", 0);
                                });
                        state2
                                .style("fill", function(d) {
                                    //Get data value
                                    // var value = d.properties.value;
                                    for (var i = 0; i < data.length; i++) {
                                        var codeState = data[i].code;
                                        var dataValue = data[i][meses[inp.value]];
                                        for (var j = 0; j < can.features.length; j++) {

                                            var jsonState = can.features[j].properties.code;
                                            if (codeState == jsonState) {
                                                can.features[j].properties.value = dataValue;
                                                break;
                                            }

                                        }
                                    }
                                    var value = d.properties.value;
                                    if (value) {
                                        //If value exists…
                                        return getColor(value);
                                    } else {
                                        //If value is undefined…
                                        return "#ccc";
                                    }
                                })
                                .attr("stroke", "black")
                                .attr("stroke-width", 0.4)
                                .on(dispositivo, function(d) {

                                    div.style("opacity", 1);
                                    div.html("<b>" + d.properties.name + "</b></br>Tasa de paro: " + addComas(data[d.properties.code][meses[inp.value]]) + " <br>" + d.properties.comunidad)
                                            .style("left", d3.event.pageX + 10 + "px")
                                            .style("top", d3.event.pageY + 10 + "px");
                                })
                                .on("mouseout", function() {
                                    return div
                                            .style("opacity", 0);
                                });
                        maxMin(data);
                    });

        });
    });

    function maxMin(d) {
        d3.select("#minimoParo").html("");
        d3.select("#maximoParo").html("");
        d3.select("#mediaParo").html("");

        var datos = [];
        var provincia = [];
        for (var i = 0; i < data.length - 1; i++) {//-1 para que no cargue Nacional
            datos.push(d[i][meses[inp.value]]);
            provincia.push(d[i].state);
        }
        var max = Math.max.apply(Math, datos);
        var min = Math.min.apply(Math, datos);
        var provinciaMax;
        var provinciaMin;
        for (var j = 0; j < data.length - 1; j++) {
            if (max == datos[j]) {
                provinciaMax = provincia[j];
            }
            if (min == datos[j]) {
                provinciaMin = provincia[j];
            }
        }
        var nombreMediaParo = d3.select("#mediaParo").append("text").html(addComas(datos[datos.length - 1]) + "");
        var nombreProvinciaMax = d3.select("#maximoParo").append("text").html(addComas(max) + "<br>" + "<span id='provincia'>" + provinciaMax + "</span>");
        var nombreProvinciaMin = d3.select("#minimoParo").append("text").html(addComas(min) + "<br>" + "<span id='provincia'>" + provinciaMin + "</span");


    }
});
//creo el contenedor para la fiebre
var contenedorSvg = d3.select("#contenedorGrafico").append("svg")
        .attr("width", w)
        .attr("height", h);
//Ponemos en la escala las funciones que determinen el tamaño del rango
var escalaX = d3.time.scale()
        .domain([new Date(2005, 0, 1), new Date(2014, 7, 1)])
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
//Para crear la linea se pone
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

//ejes
//Mantenemos el atributo transform en el eje de las x porque es necesario para que aparezca debajo
contenedorSvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + trans + "," + height + ")")
        .call(ejeX)
        .attr("pointer-events", "none");
contenedorSvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + trans + ",0)")
        .call(ejeY)
        .attr("pointer-events", "none");
//dibujamos el grid/ parrilla
//verticales
contenedorSvg.append("g")
        .attr("class", "grid")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .attr("opacity", 0.3)
        .attr("transform", "translate(" + trans + "," + height + ")")
        .call(ejeX.tickSize(-320, 0, 0).tickFormat(""));
//tickSize(major, minor, end);
//horizontales
contenedorSvg.append("g")
        .attr("class", "grid")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .attr("opacity", 0.3)
        .call(ejeY.tickSize(-width, 0, 0).tickFormat(""))
        .attr("transform", "translate(" + trans + ",0)");
//circulos de la línea
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
                    .call(eliminar);
            var centroX = escalaX(d.fecha);
            var centroY = escalaY(d.Total);
            contenedorSvg.append("circle")
                    .attr("cx", centroX)
                    .attr("cy", centroY)
                    .attr("r", 5)
                    .attr("id", "circulo")
                    .attr("transform", "translate(" + trans + ",0)")
                    .attr("fill", "steelblue");
            //guías marcadores cruz
            //horizontal
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
            //vertical
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
            div
                    .style("left", function() {
                        if (d3.event.pageX > (w - 100)) {

                            return (d3.event.pageX - 120) + "px";
                        }
                        else {
                            return (d3.event.pageX) + "px";
                        }
                    }
                    )
                    .style("top", centroY + 10 + "px"
                            )

                    .html(function() {
                        return  "<b>" + addPuntos(d.Total) + "</b><br/>" + d.mes + " " + d.fecha.getFullYear();
                    });

            d3.select('#donut', update(d));
            d3.select('#barras', update(d));
            totalValue.text(function() {
                return addPuntos(d.Total);

            });

        })
        .on("mouseout", function() {
            return div
                    .style("opacity", 0);
        });


function eliminar() {
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
//comienzo de la gráfica de barras
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
//pie
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
var outerArc = d3.svg.arc()
        .innerRadius(radius * 0.85)
        .outerRadius(radius * 0.85);
var center_group = vis.append("svg:g")
        .attr("class", "center_group");

var whiteCircle = center_group.append("svg:circle")
        .attr("fill", "white")
        .attr("r", radius * 0.4);
var totalLabel = center_group.append("svg:text")
        .attr("class", "label")
        .attr("dy", -15)
        .attr("text-anchor", "middle") // text-align: right
        .text("TOTAL");
var totalValue = center_group.append("svg:text")
        .attr("class", "total")
        .attr("dy", 7)
        .attr("text-anchor", "middle")
        .text(function() {
            return addPuntos(ultimaPosicion.Total);
        });
var totalUnits = center_group.append("svg:text")
        .attr("class", "units")
        .attr("dy", 21)
        .attr("text-anchor", "middle") // text-align: right
        .text("Parados");
////-----//////---/////////-----/////////----//////////-----///////----////////----/////-----/////////-----/////---///------////---/////
contenedorSvg
        .append("circle")
        .attr("cx", escalaX(ultimaPosicion.fecha))
        .attr("cy", escalaY(ultimaPosicion.Total))
        .attr("r", 4)
        .attr("id", "circuloIn")
        .attr("fill", "red")
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
    //enter
    bars
            .enter()
            .append("rect")
            .attr("transform", "translate(17,-20)")
            .attr("width", "0")
            .attr("fill", "#5295C5");
    //exit
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
                        .attr('fill', "#C6DBEF");
                div.style("opacity", 1)
                        .style("left", 520 + "px")
                        .style("top", 480 + "px")
                        .html(function() {
                            return "<b>" + addPuntos(d.Total) + "</b><br/>" + d.mes + " " + d.fecha.getFullYear();
                        });
            })
            .on('mouseout', function() {
                d3.select(this)
                        .attr('fill', "#6BAED6");

            });

    /* d3.select("#barras")
     .on('mouseout', function() {                               
     div.style("opacity", 0);
     }); */
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
    //diagrama sectores
    var fecha = d.mes + " de " + d.fecha.getFullYear();
    var total = d.Total;
    //var color = d3.scale.category20c();
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
                totalValue.text(function() {
                    return addPuntos(data[id].value);
                });
                totalLabel.text(function() {

                    return data[id].label.toUpperCase();
                });

            })
            .on('mouseout', function() {
                d3.select(this)
                        .attr("opacity", 1);
                var z = this.getAttribute("id");
                var id = z.substring(z.length - 1, z.length);
                totalValue.text(function() {
                    return addPuntos(total);
                });
                totalLabel.text("TOTAL");
                ;
            });
    center_group.on(dispositivo, function() {
        vis.select(".slices").selectAll("path.slice")
                .attr("opacity", 1);
        totalLabel.text("TOTAL");
        totalValue.text(function() {
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
                    var pos = outerArc.centroid(d2);
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
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius2 * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                    return [arc.centroid(d2), outerArc.centroid(d2), pos];
                };
            });
    polyline.exit()
            .remove();

    document.getElementById('mes').innerHTML = "<i>" + fecha + "</i>";
}
document.getElementById("rangoFechas").innerHTML = "<i>" + datosParo[0].mes + " de " + datosParo[0].fecha.getFullYear() + " - " + datosParo[datosParo.length - 1].mes + " de " + ultimaPosicion.fecha.getFullYear() + "</i><br/>Numero de parados";
update(ultimaPosicion);

