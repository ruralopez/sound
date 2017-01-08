var route1, route2, route3, route4, route5, route6, route7 = false;
var lastClick = 0;
var globalCounter = 0;
var initTime = new Date();

/* En cirlcles, 1=Q1A1, 2=Q1A2, 3=Q2A1, 4=Q2A2, 5=Q2A3, 6=Q3A1, 7=Q3A2 */
var json = { data: {
        clicks: [],
        name: "",
        email: "",
        age: "",
        gender: "",
        country: "",
        city: "",
        comment: "",
        explain: "",
        circles: {
            first_answer: 0,
            second_answer: 0,
            third_answer: 0
        }
    } 
};

/* Siri Container */
var widthFixed = window.innerWidth*2;
var heightFixed = window.innerHeight/7;

var siriWave1 = new SiriWave({
    container: document.getElementById('siri-container-1'),
    width: widthFixed,
    height: heightFixed,
    color: '#050096',
    autostart: true,
    speed: 0.01,
    amplitude: 0.6,
    frequency: 30,
    top: 0,
    className: "second-wave"
});

var siriWave2 = new SiriWave({
    container: document.getElementById('siri-container-2'),
    width: widthFixed,
    height: heightFixed,
    color: '#00ff98',
    autostart: true,
    speed: 0.03,
    amplitude: 0.7,
    frequency: 40,
    top: heightFixed,
    className: "second-wave"
});

var siriWave3 = new SiriWave({
    container: document.getElementById('siri-container-3'),
    width: widthFixed,
    height: heightFixed,
    color: '#0fe6f0',
    autostart: true,
    speed: 0.04,
    amplitude: 0.7,
    frequency: 20,
    top: heightFixed*2,
    className: "second-wave"
});

var siriWave4 = new SiriWave({
    container: document.getElementById('siri-container-4'),
    width: widthFixed,
    height: heightFixed,
    color: '#5a5fff',
    autostart: true,
    speed: 0.01,
    amplitude: 0.7,
    frequency: 15,
    top: heightFixed*3,
    className: "second-wave"
});

var siriWave5 = new SiriWave({
    container: document.getElementById('siri-container-5'),
    width: widthFixed,
    height: heightFixed,
    color: '#00ff98',
    autostart: true,
    speed: 0.02,
    amplitude: 0.7,
    frequency: 25,
    top: heightFixed*4,
    className: "second-wave"
});

var siriWave6 = new SiriWave({
    container: document.getElementById('siri-container-6'),
    width: widthFixed,
    height: heightFixed,
    color: '#050096',
    autostart: true,
    speed: 0.06,
    amplitude: 0.7,
    frequency: 35,
    top: heightFixed*5,
    className: "second-wave"
});

var siriWave7 = new SiriWave({
    container: document.getElementById('siri-container-7'),
    width: widthFixed,
    height: heightFixed,
    color: '#0fe6f0',
    autostart: true,
    speed: 0.01,
    amplitude: 0.7,
    frequency: 30,
    top: heightFixed*6,
    className: "second-wave"
});

/* Fin Siri Container */

$("canvas").css("left", (window.innerWidth/2)*(-1));

function stopAll(){
    siriWave1.stop();
    siriWave2.stop();
    siriWave3.stop();
    siriWave4.stop();
    siriWave5.stop();
    siriWave6.stop();
    siriWave7.stop();
}

function startAll(){
    siriWave1.start();
    siriWave2.start();
    siriWave3.start();
    siriWave4.start();
    siriWave5.start();
    siriWave6.start();
    siriWave7.start();
}

$(document).ready(function(){

    $(document).on("click", ".cover-inline-img", function(){
        firstTransition();
    });

    /* Init SVG lines */
    initPolygon();
    initLines();

    /* Contorno del Cerebro */
    fixLine($("#line-q3-q3a1"));
    fixLine($("#line-q3a1-e13"));
    fixLine($("#line-e12-e13"));
    fixLine($("#line-e10-e12"));
    fixLine($("#line-e9-e10"));
    fixLine($("#line-q1a2-e9"));
    fixLine($("#line-q1a2-e7"));
    fixLine($("#line-e6-e7"));
    fixLine($("#line-e5-e6"));
    fixLine($("#line-e3-e5"));
    fixLine($("#line-e2-e3"));
    fixLine($("#line-e1-e2"));
    fixLine($("#line-q2a3-e1"));
    fixLine($("#line-q2a3-e8"));
    fixLine($("#line-q3-e8"));
    /* Fin Contorno del Cerebro */

    function initPolygon(){

        var pointsArray = [
            { point: $("div[id^='q3-']"), type: 1 },
            { point: $("div[id^='q3a1-']"), type: 2 },
            { point: $("div[id^='e13-']"), type: 3 },
            { point: $("div[id^='e12-']"), type: 3 },
            { point: $("div[id^='e10-']"), type: 3 },
            { point: $("div[id^='e9-']"), type: 3 },
            { point: $("div[id^='q1a2-']"), type: 2 },
            { point: $("div[id^='e7-']"), type: 3 },
            { point: $("div[id^='e6-']"), type: 3 },
            { point: $("div[id^='e5-']"), type: 3 },
            { point: $("div[id^='e3-']"), type: 3 },
            { point: $("div[id^='e2-']"), type: 3 },
            { point: $("div[id^='e1-']"), type: 3 },
            { point: $("div[id^='q2a3-']"), type: 2 },
            { point: $("div[id^='e8-']"), type: 3 }
        ];

        var pointsStr = "";
        $.each(pointsArray, function(i,v){
            var pos = getRealPos(v.point,v.type);
            pointsStr += (""+pos.posX+","+pos.posY+" ");
        });

        var brain = document.createElementNS('http://www.w3.org/2000/svg','polygon');
        brain.setAttribute('id','brain-svg');
        brain.setAttribute('stroke', "transparent");
        brain.setAttribute('stroke-width', "0");
        brain.setAttribute('onclick', "changePoly(evt)");
        brain.setAttribute('points', pointsStr);
        $("svg").append(brain);
    }

    function changePoly(evt){
        console.log("Hola");
    }

    function getRealPos(point,type){
        /* 1=Q, 2=A, 3=E */
        var offset = 20;
        
        if(type==2){ offset = 15; }
        else if(type==3){ offset = 9; }

        var posX = $(point).position().left + offset + 3;
        var posY = $(point).position().top + offset;

        return { posX: posX, posY: posY };
    }

    $(document).click(function(e) {
        var elem = e.target;
        var d = new Date();
        var n = d.getTime();
        
        var obj = { global_time: n, ref_time: ((n - initTime.getTime())/1000), pos: { x: e.clientX, y: e.clientY }, target: elem.className, target_id: elem.id };

        json.data.clicks.push(obj);
    });


    /* Guión Transiciones */

    function firstTransition(){
        $(".points-mask").hide();
        $(".point-elem").addClass("hidden");
        $(".point-elem").css("z-index", "auto");
        $("#first-mask").hide();
        $(".main-cover-container").fadeToggle(1800);


        setTimeout(function(){
            coverTransition();
        }, 1000);
    }

    function coverTransition(){
        /* Revisar performance de esta transición */
        setTimeout(function(){
            $(".over-content.info").fadeToggle(1800);
        }, 1000);
        $(".about-container").fadeToggle(1800);
        $(".canvas-mask").fadeToggle(1800);
        $(".point-elem").fadeToggle(1800);
    }

    /* Fin Guión Transiciones */

    function drawLine(origin,target,id,type_origin,type_target){
        /* 1=Q, 2=A, 3=E */
        var offset_origin = 20;
        var offset_target = 20;
        
        if(type_origin==2){ offset_origin = 15; }
        else if(type_origin==3){ offset_origin = 9; }

        if(type_target==2){ offset_target = 15; }
        else if(type_target==3){ offset_target = 9; }
        
        var posXOrigin = $(origin).position().left + offset_origin + 3;
        var posYOrigin = $(origin).position().top + offset_origin;

        var posXTarget = $(target).position().left + offset_target + 3;
        var posYTarget = $(target).position().top + offset_target;

        var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('id',id);
        newLine.setAttribute('x1',posXOrigin);
        newLine.setAttribute('y1',posYOrigin);
        newLine.setAttribute('x2',posXTarget);
        newLine.setAttribute('y2', posYTarget);
        newLine.setAttribute('stroke', "#ffffff");
        newLine.setAttribute('stroke-width', "1");
        newLine.setAttribute('stroke-linecap', "round");
        newLine.setAttribute('stroke-dasharray', "1,5");
        newLine.setAttribute('class', "hidden");
        $("svg").append(newLine);
    }

    function onFinish(id) {
        alert('video has ended');
    }

    function mapCircle(str){
        if(str == "tt-q1a1"){ return 1; }
        else if(str == "tt-q1a2"){ return 2; }
        else if(str == "tt-q2a1"){ return 3; }
        else if(str == "tt-q2a2"){ return 4; }
        else if(str == "tt-q2a3"){ return 5; }
        else if(str == "tt-q3a1"){ return 6; }
        else if(str == "tt-q3a2"){ return 7; }
        else { return 0; }
    }

    $(".tt-answer").click(function(e) {

        var id = $(this).attr("video-id");
        $('.video-modal').html("<iframe id='vimeo-player' src='https://player.vimeo.com/video/"+ id +"?color=00ff98&api=1&autoplay=1&title=0&byline=0&portrait=0' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
        
        var iframe = $('#vimeo-player')[0];
        var player = $f(iframe);
        player.api('play');
        
        player.addEvent('ready', function() {       
            player.addEvent('finish', onFinish);
        });

        var width = (window.innerWidth-160) + "px";
        var height = (window.innerHeight-160) + "px";

        $(".video-modal").css("display", "block");
        $(".video-modal").animate({
            width: width,
            height: height,
            margin: '0',
            padding: '80px',
        }, 800);

        globalCounter++;
        if(globalCounter == 1){
            json.data.circles.first_answer = mapCircle(e.currentTarget.id);
        }
        else if(globalCounter == 2){
            json.data.circles.second_answer = mapCircle(e.currentTarget.id);
        }
        else if(globalCounter == 3){
            json.data.circles.third_answer = mapCircle(e.currentTarget.id);
        }
    });

    $(".video-modal > iframe").click(function(e){
        e.stopPropagation(); 
    });

    $(".video-modal").click(function(){
        var iframe = $('#vimeo-player')[0];
        var player = $f(iframe);
        player.api('pause');

        var mw = (window.innerWidth/2) + "px";
        var mh = (window.innerHeight/2) + "px";
        var mc = mh + " " + mw;
        $(".video-modal").animate({
            width: "0px",
            height: "0px",
            padding: "0px",
            margin: mc
        }, 800);

        fixRoute(lastClick);
    });

    $(document).on("click", ".info-border,.info-close,#about-info-container", function(e){
        $(".over-content.info").fadeToggle(1000);

        e.stopPropagation();
    });


    /* $(document).on("click", ".btn-ok", function(){
        if($("#city-input").val() == ""){
            $("#city-input").css("border","1px solid #F1002F");
        }
        else {
            $(".mask").fadeToggle(1200);
            $(".init-form-container").fadeToggle(1200); 

            json.data.name = $("#");
            json.data.email = $("#");
            json.data.age = $("input[name='age']:checked").val();
            json.data.gender = $("input[name='gender']:checked").val();
            json.data.country = $("#country-select option:selected").text();
            json.data.city = $("#city-input").val();
        }
    }); */

    $(document).on("click", ".btn-send", function(){
        if($("#input-email").val() == ""){
            $("#input-email").css("border","1px solid #F1002F");
        }
        else if(!isValidEmailAddress($("#input-email").val())) {
            $("#input-email").css("border","1px solid #F1002F");
            $(".about-wrong").fadeToggle(400); 
            
        }
        else {
            $(".btn-send").hide();
            $(".about-flash").fadeToggle(400); 

            /*json.data.name = $("#");*/
            json.data.email = $("#input-email").val();
            json.data.explain = $("input[name='explain']:checked").val();
        }
    });

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    $(document).on("focus", "#input-email", function(){
        $("#input-email").css("border","1px solid white");
        $(".about-wrong").fadeOut(400);
    });

    $(document).on("click", ".about-container", function(){
        $(".about-main-container").fadeToggle(800);
    });

    $(".over-content.about-container").hover(function(){
        $(".about-title").show("slide", { direction: "left" }, 400);
    });

    $(".over-content.about-container").hover(
      function() {
        $(".about-title").show("slide", { direction: "left" }, 400);
      }, function() {
        $(".about-title").hide("slide", { direction: "left" }, 400);
      }
    );

    $(document).on("focus", "#city-input", function(){
        $("#city-input").css("border","1px solid white");
    });

    function dist(line){
        var x1 = line.x1.baseVal.value;
        var x2 = line.x2.baseVal.value;
        var y1 = line.y1.baseVal.value;
        var y2 = line.y2.baseVal.value;

        return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
    }

    function drawAnimateLine(line, options, n) {

        setTimeout(function(){

            $(line).attr("class","");
            options = options || {}
            var duration = options.duration || 1000
            var easing = options.easing || 'ease-in-out'
            var reverse = options.reverse || false
            var undraw = options.undraw || false
            var callback = options.callback || function () {}
            var length = options.length || dist($(line).get(0))

            var dashOffsetStates = [length, 0]
            if (reverse) {
                dashOffsetStates = [length, 2 * length]
            }
            if (undraw) {
                dashOffsetStates.reverse()
            }

            line.style.transition = line.style.WebkitTransition = 'none';

            var dashArray = line.style.strokeDasharray || line.getAttribute("stroke-dasharray");

            if (dashArray != '') {
                var dashLength = dashArray.split(/[\s,]/).map(function (a) {
                    return parseFloat(a) || 0
                }).reduce(function (a, b) {
                    return a + b
                })
                var dashCount = length / dashLength + 1
                var a = new Array(Math.ceil(dashCount)).join(dashArray + " ")
                line.style.strokeDasharray = a + '0' + ' ' + length
            } else {
                line.style.strokeDasharray = length + ' ' + length;
            }
            line.style.strokeDashoffset = dashOffsetStates[0];
            line.getBoundingClientRect();
            line.style.transition = line.style.WebkitTransition =
                'stroke-dashoffset ' + duration + 'ms ' + easing;
            line.style.strokeDashoffset = dashOffsetStates[1]
            setTimeout(function() {
                line.style.strokeDasharray = dashArray
                callback()
            }, duration)

        }, ((n*1000)+500))
    }


    /* Rutas */

    /* Pregunta 1 */
    $("#q1-l20t50").on("click", function(){
        clickQ1();
    });

    function clickQ1(){
        /* Animation first click */
        $(".tt-main-container").addClass("hidden");
        $(".tt-q1-container").removeClass("hidden");

        $("line").attr("class","hidden");

        setTimeout(function(){
             /* Respuesta 1 */
            drawAnimateLine(document.querySelector("#line-q1-q1a1e1"),{},0);
            drawAnimateLine(document.querySelector("#line-q1a1e1-q1a1e2"),{},1);
            drawAnimateLine(document.querySelector("#line-q1a1-q1a1e2"),{ reverse: true },2);

            /* Respuesta 2 */
            drawAnimateLine(document.querySelector("#line-q1-q1a2e1"),{},0)
            drawAnimateLine(document.querySelector("#line-q1a2-q1a2e1"),{ reverse: true },1)

            setTimeout(function(){
                $("#tt-q1a1").fadeIn(700);
            }, 3000);
            setTimeout(function(){
                $("#tt-q1a2").fadeIn(700);
            }, 2000);

        }, 500);
        /* Fin Animation first click */

        $("#q1-l20t50").off("click");

        $("#q1-l20t50").on("click", function(){
            $(".tt-main-container").addClass("hidden");
            $(".tt-q1-container").removeClass("hidden");

            $("line").attr("class","hidden");

            /* Respuesta 1 */
            $("#line-q1-q1a1e1").attr("class","");
            $("#line-q1a1e1-q1a1e2").attr("class","");
            $("#line-q1a1-q1a1e2").attr("class","");
            /* Respuesta 2 */
            $("#line-q1-q1a2e1").attr("class","");
            $("#line-q1a2-q1a2e1").attr("class","");
        }); 
    }

    /* Pregunta 2 */
    $("#q2-l55t60").on("click", function(){
        clickQ2();
    });

    function clickQ2(){
        /* Animation first click */
        $(".tt-main-container").addClass("hidden");
        $(".tt-q2-container").removeClass("hidden");

        $("line").attr("class","hidden");

        setTimeout(function(){
            /* Respuesta 1 */
            drawAnimateLine(document.querySelector("#line-q2-q2a1e1"),{},0);
            drawAnimateLine(document.querySelector("#line-q1a2e1-q2a1e1"),{ reverse: true },1);
            drawAnimateLine(document.querySelector("#line-q2a1-q1a2e1"),{ reverse: true },2);
            /* Respuesta 2 */
            drawAnimateLine(document.querySelector("#line-q2-q2a2"),{},0);
            /* Respuesta 3 */
            drawAnimateLine(document.querySelector("#line-q2-q2a3e1"),{},0);
            drawAnimateLine(document.querySelector("#line-q1a1e2-q2a3e1"),{ reverse: true },1);
            drawAnimateLine(document.querySelector("#line-q2a3-q1a1e2"),{ reverse: true },2);

            setTimeout(function(){
                $("#tt-q2a1").fadeIn(700);
            }, 3000);
            setTimeout(function(){
                $("#tt-q2a2").fadeIn(700);
            }, 1000);
            setTimeout(function(){
                $("#tt-q2a3").fadeIn(700);
            }, 3000);

        }, 500);
        /* Fin Animation first click */

        $("#q2-l55t60").off("click");

        $("#q2-l55t60").on("click", function(){
            $(".tt-main-container").addClass("hidden");
            $(".tt-q2-container").removeClass("hidden");

            $("line").attr("class","hidden");

            /* Respuesta 1 */
            $("#line-q2-q2a1e1").attr("class","");
            /* Respuesta 2 */
            $("#line-q2-q2a2").attr("class","");
            $("#line-q1a2e1-q2a1e1").attr("class","");
            $("#line-q2a1-q1a2e1").attr("class","");
            /* Respuesta 3 */
            $("#line-q2-q2a3e1").attr("class","");
            $("#line-q1a1e2-q2a3e1").attr("class","");
            $("#line-q2a3-q1a1e2").attr("class","");
        }); 
    }


    /* Pregunta 3 */
    $("#q3-l85t23").on("click", function(){
        clickQ3();
    });

    function clickQ3(){
        /* Animation first click */
        $(".tt-main-container").addClass("hidden");
        $(".tt-q3-container").removeClass("hidden");

        $("line").attr("class","hidden");

        setTimeout(function(){

            /* Respuesta 1 */
            drawAnimateLine(document.querySelector("#line-q3-q3a1"),{},0);
            /* Respuesta 2 */
            drawAnimateLine(document.querySelector("#line-q3-q3a2e1"),{},0);
            drawAnimateLine(document.querySelector("#line-q3a2e1-q3a2e2"),{},1);
            drawAnimateLine(document.querySelector("#line-q3a2-q3a2e2"),{ reverse: true },2);


            setTimeout(function(){
                $("#tt-q3a1").fadeIn(700);
            }, 1000);
            setTimeout(function(){
                $("#tt-q3a2").fadeIn(700);
            }, 3000);

        }, 500);
        /* Fin Animation first click */

        $("#q3-l85t23").off("click");

        $("#q3-l85t23").on("click", function(){
            $(".tt-main-container").addClass("hidden");
            $(".tt-q3-container").removeClass("hidden");

            $("line").attr("class","hidden");

            /* Respuesta 1 */
            $("#line-q3-q3a1").attr("class","");
            /* Respuesta 2 */
            $("#line-q3-q3a2e1").attr("class","");
            $("#line-q3a2e1-q3a2e2").attr("class","");
            $("#line-q3a2-q3a2e2").attr("class","");
        }); 
    }

    /* Fin Rutas */

    /* ******************************** */

    /* Fijar Rutas */

    function fixRoute(type){
        /* Q1A1 */
        if(type == 1){
            /* Respuesta 1 */
            fixLine($("#line-q1-q1a1e1"));
            fixLine($("#line-q1a1e1-q1a1e2"));
            fixLine($("#line-q1a1-q1a1e2"));

            /* Extras */
            fixLine($("#line-q3-q1a1"));
            fixLine($("#line-q2-q1a1"));
            fixLine($("#line-q2-q3a2e2"));
            fixLine($("#line-q1a1-e8"));
            fixLine($("#line-q1a1-q2a3e1"));
            fixLine($("#line-q2a2-q2a3e1"));
            fixLine($("#line-q2a3-q1a1"));
        }
        /* Q1A2 */
        else if(type == 2){
            /* Respuesta 2 */
            fixLine($("#line-q1-q1a2e1"));
            fixLine($("#line-q1a2-q1a2e1"));

            /* Extras */
            fixLine($("#line-q2a1-e7"));
            fixLine($("#line-q1a2e1-e7"));
            fixLine($("#line-q1a2-q2a1e1"));
            /*fixLine($("#line-q1a2e1-q2a1e1"));*/
            fixLine($("#line-q2a1e1-e9"));
        }
        /* Q2A1 */
        else if(type == 3){
            /* Respuesta 1 */
            fixLine($("#line-q2-q2a1e1"));
            fixLine($("#line-q1a2e1-q2a1e1"));
            fixLine($("#line-q2a1-q1a2e1"));
            
            /* Extras */
            fixLine($("#line-q1-e2"));
            fixLine($("#line-q1-e3"));
            fixLine($("#line-q1-e4"));
            fixLine($("#line-q1-q2a1"));
            fixLine($("#line-e3-e4"));
            fixLine($("#line-e4-e5"));
            fixLine($("#line-q2a1-e4"));
            fixLine($("#line-q2a1-e6"));
        }
        /* Q2A2 */
        else if(type == 4){
            /* Respuesta 2 */
            fixLine($("#line-q2-q2a2"));

            /* Extras */
            fixLine($("#line-q2-e9"));
            fixLine($("#line-q2a2-q1a2e1"));
            fixLine($("#line-q1a2-e9"));
            fixLine($("#line-q2a2-q2a1e1"));
            fixLine($("#line-q2a1e1-e9"));
        }
        /* Q2A3 */
        else if(type == 5){
            /* Respuesta 3 */
            fixLine($("#line-q2-q2a3e1"));
            fixLine($("#line-q1a1e2-q2a3e1"));
            fixLine($("#line-q2a3-q1a1e2"));

            /* Extras */
            fixLine($("#line-q1-e1"));
            fixLine($("#line-q1a1e1-e1"));
            fixLine($("#line-q1a1e1-q2a3e1"));
            fixLine($("#line-q2a3-q1a1e1"));
            fixLine($("#line-q2a2-q1a1e1"));
        }
        /* Q3A1 */
        else if(type == 6){
            /* Respuesta 1 */
            fixLine($("#line-q3-q3a1"));

            /* Extras */
            fixLine($("#line-q3a1-q3a2e1"));
            fixLine($("#line-q3a1-q3a2e2"));
            
            fixLine($("#line-q1a1-q3a2e1"));
            fixLine($("#line-q1a1-q3a2e2"));
            
            fixLine($("#line-q3a2e2-e11"));
            fixLine($("#line-q3a2e2-e13"));
            fixLine($("#line-e11-e13"));
        }
        /* Q3A2 */
        else if(type == 7){
            /* Respuesta 2 */
            fixLine($("#line-q3-q3a2e1"));
            fixLine($("#line-q3a2e1-q3a2e2"));
            fixLine($("#line-q3a2-q3a2e2"));

            /* Extras */
            fixLine($("#line-q2-q3a2"));
            fixLine($("#line-q3a2-e9"));
            fixLine($("#line-q3a2-e10"));
            fixLine($("#line-q3a2-e11"));
            fixLine($("#line-e12-e11"));
        }

        if(route1 && route2 && route3 && route4 && route5 && route6 && route7){
            $(".tooltip-layer").fadeToggle(1500);

            $("line").attr("stroke-width",2);
            $("line").attr("stroke-linecap","");
            $("line").attr("stroke-dasharray","");
            
            $("line").filter(function() { return $(this).css("display") == "none" }).fadeToggle(5000);
            
            $("canvas").fadeToggle(5000);

            setTimeout(function(){
                $(".credits-container").hide();
                $(".content-p-init").hide();
                $(".form-left-final").show();
                $(".form-right-final").show();
                $(".about-main-container").fadeIn(1000);
            }, 8000)
        }
    }

    /* Pregunta 1 */
    $(document).on("click", "#tt-q1a1", function(e){
        lastClick = 1;
        route1 = true;
        /*$(".tt-q1-container").css("display","none");*/
    });

    /* Pregunta 2 */
    $(document).on("click", "#tt-q1a2", function(e){
        lastClick = 2;
        route2 = true;
        /*$(".tt-q1-container").css("display","none");*/
    });

    /* Pregunta 3 */
    $(document).on("click", "#tt-q2a1", function(e){
        lastClick = 3;
        route3 = true;
        /*$(".tt-q2-container").css("display","none");*/
    });

    /* Pregunta 4 */
    $(document).on("click", "#tt-q2a2", function(e){
        lastClick = 4;
        route4 = true;
        /*$(".tt-q2-container").css("display","none");*/
    });

    /* Pregunta 5 */
    $(document).on("click", "#tt-q2a3", function(e){
        lastClick = 5;
        route5 = true;
        /*$(".tt-q2-container").css("display","none");*/
    });

    /* Pregunta 6 */
    $(document).on("click", "#tt-q3a1", function(e){
        lastClick = 6;
        route6 = true;
        /*$(".tt-q3-container").css("display","none");*/
    });

    /* Pregunta 7 */
    $(document).on("click", "#tt-q3a2", function(e){
        lastClick = 7;
        route7 = true;
        /*$(".tt-q3-container").css("display","none");*/
    });

    /* Fin Fijar Rutas */

    /* ****************************** */

    function fixLine(elem){
        $(elem).attr("style","display:inline;animation:none;");
        $(elem).attr("stroke-width",1);
        $(elem).attr("stroke-linecap","");
        $(elem).attr("stroke-dasharray","");
        /*$(elem).attr("stroke-opacity",0.5);*/
    }

    /* Init de Líneas */
    /* 1=Q, 2=A, 3=E */

    function initLines(){

        drawLine($("div[id^='q1-']"),$("div[id^='q1a1e1-']"), "line-q1-q1a1e1", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='q1a2e1-']"), "line-q1-q1a2e1", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='q2a1-']"), "line-q1-q2a1", 1, 2);
        drawLine($("div[id^='q1-']"),$("div[id^='q2a2-']"), "line-q1-q2a2", 1, 2);
        drawLine($("div[id^='q1-']"),$("div[id^='e1-']"), "line-q1-e1", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='e2-']"), "line-q1-e2", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='e3-']"), "line-q1-e3", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='e4-']"), "line-q1-e4", 1, 3);

        
        drawLine($("div[id^='q2-']"),$("div[id^='q1a1-']"), "line-q2-q1a1", 1, 2);
        drawLine($("div[id^='q2-']"),$("div[id^='q2a2-']"), "line-q2-q2a2", 1, 2);
        drawLine($("div[id^='q2-']"),$("div[id^='q3a2e2-']"), "line-q2-q3a2e2", 1, 3);
        drawLine($("div[id^='q2-']"),$("div[id^='q3a2-']"), "line-q2-q3a2", 1, 2);
        drawLine($("div[id^='q2-']"),$("div[id^='e9-']"), "line-q2-e9", 1, 3);
        drawLine($("div[id^='q2-']"),$("div[id^='q2a1e1-']"), "line-q2-q2a1e1", 1, 3);
        drawLine($("div[id^='q2-']"),$("div[id^='q2a3e1-']"), "line-q2-q2a3e1", 1, 3);

        
        drawLine($("div[id^='q3-']"),$("div[id^='e8-']"), "line-q3-e8", 1, 3);
        drawLine($("div[id^='q3-']"),$("div[id^='q1a1-']"), "line-q3-q1a1", 1, 2);
        drawLine($("div[id^='q3-']"),$("div[id^='q3a2e1-']"), "line-q3-q3a2e1", 1, 3);
        drawLine($("div[id^='q3-']"),$("div[id^='q3a1-']"), "line-q3-q3a1", 1, 2);


        drawLine($("div[id^='q2a1-']"),$("div[id^='q1a2e1-']"), "line-q2a1-q1a2e1", 2, 3);
        drawLine($("div[id^='q2a1-']"),$("div[id^='e4-']"), "line-q2a1-e4", 2, 3);
        drawLine($("div[id^='q2a1-']"),$("div[id^='e6-']"), "line-q2a1-e6", 2, 3);
        drawLine($("div[id^='q2a1-']"),$("div[id^='e7-']"), "line-q2a1-e7", 2, 3);

        
        drawLine($("div[id^='q1a2-']"),$("div[id^='e7-']"), "line-q1a2-e7", 2, 3);
        drawLine($("div[id^='q1a2-']"),$("div[id^='q1a2e1-']"), "line-q1a2-q1a2e1", 2, 3);
        drawLine($("div[id^='q1a2-']"),$("div[id^='q2a1e1-']"), "line-q1a2-q2a1e1", 2, 3);
        drawLine($("div[id^='q1a2-']"),$("div[id^='e9-']"), "line-q1a2-e9", 2, 3);


        drawLine($("div[id^='q2a2-']"),$("div[id^='q1a1e1-']"), "line-q2a2-q1a1e1", 2, 3);
        drawLine($("div[id^='q2a2-']"),$("div[id^='q2a3e1-']"), "line-q2a2-q2a3e1", 2, 3);
        drawLine($("div[id^='q2a2-']"),$("div[id^='q2a1e1-']"), "line-q2a2-q2a1e1", 2, 3);
        drawLine($("div[id^='q2a2-']"),$("div[id^='q1a2e1-']"), "line-q2a2-q1a2e1", 2, 3);


        drawLine($("div[id^='q2a3-']"),$("div[id^='e1-']"), "line-q2a3-e1", 2, 3);
        drawLine($("div[id^='q2a3-']"),$("div[id^='q1a1e1-']"), "line-q2a3-q1a1e1", 2, 3);
        drawLine($("div[id^='q2a3-']"),$("div[id^='q1a1e2-']"), "line-q2a3-q1a1e2", 2, 3);
        drawLine($("div[id^='q2a3-']"),$("div[id^='q1a1-']"), "line-q2a3-q1a1", 2, 2);
        drawLine($("div[id^='q2a3-']"),$("div[id^='e8-']"), "line-q2a3-e8", 2, 3);


        drawLine($("div[id^='q1a1-']"),$("div[id^='e8-']"), "line-q1a1-e8", 2, 3);
        drawLine($("div[id^='q1a1-']"),$("div[id^='q1a1e2-']"), "line-q1a1-q1a1e2", 2, 3);
        drawLine($("div[id^='q1a1-']"),$("div[id^='q3a2e1-']"), "line-q1a1-q3a2e1", 2, 3);
        drawLine($("div[id^='q1a1-']"),$("div[id^='q3a2e2-']"), "line-q1a1-q3a2e2", 2, 3);
        drawLine($("div[id^='q1a1-']"),$("div[id^='q2a3e1-']"), "line-q1a1-q2a3e1", 2, 3);


        drawLine($("div[id^='q3a1-']"),$("div[id^='q3a2e1-']"), "line-q3a1-q3a2e1", 2, 3);
        drawLine($("div[id^='q3a1-']"),$("div[id^='q3a2e2-']"), "line-q3a1-q3a2e2", 2, 3);
        drawLine($("div[id^='q3a1-']"),$("div[id^='e13-']"), "line-q3a1-e13", 2, 3);


        drawLine($("div[id^='q3a2-']"),$("div[id^='q3a2e2-']"), "line-q3a2-q3a2e2", 2, 3);
        drawLine($("div[id^='q3a2-']"),$("div[id^='e11-']"), "line-q3a2-e11", 2, 3);
        drawLine($("div[id^='q3a2-']"),$("div[id^='e10-']"), "line-q3a2-e10", 2, 3);
        drawLine($("div[id^='q3a2-']"),$("div[id^='e9-']"), "line-q3a2-e9", 2, 3);


        drawLine($("div[id^='q1a1e1-']"),$("div[id^='e1-']"), "line-q1a1e1-e1", 3, 3);
        drawLine($("div[id^='q1a1e1-']"),$("div[id^='q1a1e2-']"), "line-q1a1e1-q1a1e2", 3, 3);
        drawLine($("div[id^='q1a1e1-']"),$("div[id^='q2a3e1-']"), "line-q1a1e1-q2a3e1", 3, 3);


        drawLine($("div[id^='q1a2e1-']"),$("div[id^='e7-']"), "line-q1a2e1-e7", 3, 3);
        drawLine($("div[id^='q1a2e1-']"),$("div[id^='q2a1e1-']"), "line-q1a2e1-q2a1e1", 3, 3);


        drawLine($("div[id^='q2a1e1-']"),$("div[id^='e9-']"), "line-q2a1e1-e9", 3, 3);


        drawLine($("div[id^='q1a1e2-']"),$("div[id^='q2a3e1-']"), "line-q1a1e2-q2a3e1", 3, 3);


        drawLine($("div[id^='q3a2e1-']"),$("div[id^='q3a2e2-']"), "line-q3a2e1-q3a2e2", 3, 3);


        drawLine($("div[id^='q3a2e2-']"),$("div[id^='e11-']"), "line-q3a2e2-e11", 3, 3);
        drawLine($("div[id^='q3a2e2-']"),$("div[id^='e13-']"), "line-q3a2e2-e13", 3, 3);


        drawLine($("div[id^='e1-']"),$("div[id^='e2-']"), "line-e1-e2", 3, 3);
        drawLine($("div[id^='e2-']"),$("div[id^='e3-']"), "line-e2-e3", 3, 3);
        drawLine($("div[id^='e3-']"),$("div[id^='e5-']"), "line-e3-e5", 3, 3);
        drawLine($("div[id^='e3-']"),$("div[id^='e4-']"), "line-e3-e4", 3, 3);
        drawLine($("div[id^='e4-']"),$("div[id^='e5-']"), "line-e4-e5", 3, 3);
        drawLine($("div[id^='e5-']"),$("div[id^='e6-']"), "line-e5-e6", 3, 3);
        drawLine($("div[id^='e6-']"),$("div[id^='e7-']"), "line-e6-e7", 3, 3);
        drawLine($("div[id^='e9-']"),$("div[id^='e10-']"), "line-e9-e10", 3, 3);
        drawLine($("div[id^='e10-']"),$("div[id^='e12-']"), "line-e10-e12", 3, 3);
        drawLine($("div[id^='e12-']"),$("div[id^='e11-']"), "line-e12-e11", 3, 3);
        drawLine($("div[id^='e12-']"),$("div[id^='e13-']"), "line-e12-e13", 3, 3);
        drawLine($("div[id^='e11-']"),$("div[id^='e13-']"), "line-e11-e13", 3, 3);

    }

});

