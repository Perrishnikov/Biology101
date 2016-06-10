'use strict';
https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
http://www.html5rocks.com/en/tutorials/speed/rendering/
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    var scene, cameraMain, renderer, controls;
    var MaxFrameRate = 30;

    // if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    // selectAspect();		//sets initial aspect ratio...
    initStandard();
    // animate();

// Standard Functions ==========================================================
    function initStandard() {
        scene = new THREE.Scene();

        cameraMain = new THREE.PerspectiveCamera(60, WIDTH/HEIGHT, .1, 50);// https://github.com/mrdoob/three.js/issues/352
        cameraMain.up.set( 0, 0, 1 );   //sets z up
        cameraMain.position.set(0, -8, 5);
        cameraMain.lookAt(scene.position);

        renderer = new THREE.WebGLRenderer({canvas:canvas3, antialias: true });
        renderer.setSize(WIDTH, HEIGHT, true);
        renderer.setClearColor( 0x333F47, 1 ); //set scene background color to black
        // console.log(renderer.getContextAttributes());
        // console.dir(renderer.getContext().canvas);

        controls = new THREE.OrbitControls( cameraMain, renderer.domElement );
        // controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
        controls.maxDistance = 20;
        controls.minDistance = 3;
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;

        $("#canvas3").append(renderer.domElement);
    }

    // render 30 times a second (should also look at requestAnimationFrame)
    // setInterval(render,1000/30);
    // or
    // function animate() {
    //     // requestAnimationFrame(animate);  //browser API that delegates redraws to the browser at 60/sec
    //     controls.update();  // required if controls.enableDamping = true, or if controls.autoRotate = true
    //     render();
    // }



    function render(){
        // rotateObject(cube,0,0,.1);
        rotate(cube);
        rotateObject(cube,2,0,0);
        renderer.render(scene, cameraMain);
    }

var count = 0;
var oldTime;
var newTime;

function hello (timestamp){
    var newTime = Math.round(timestamp);
    var delta = newTime - oldTime;
    var fps = 1000/MaxFrameRate; //33.333ms is 30fps //16.777ms is 60 fps
    console.log(delta);
    console.log("newTime: " + newTime);

if (count < 5 && delta){
    rotateObject(cube,2,0,0);
    window.requestAnimationFrame(hello);
    count += 1;
    oldTime = newTime;
}

    //   if (progress < 5000) {
    //     window.requestAnimationFrame(hello);
    //     newTime = oldTime;
    //   }
}

window.requestAnimationFrame(hello);
// DOM events ==================================================================
    $(window).resize(function(){
        // event.preventDefault();
        windowResize();
    });

    function windowResize() {
        WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        cameraMain.aspect = WIDTH / HEIGHT;
        cameraMain.updateProjectionMatrix();
    }

// Custom ======================================================================

function rotate(object) {
    var SPEED = 0.01;
    // console.log(object);
    // object.rotation.x -= SPEED;
    object.rotation.z -= SPEED;
}

//helper function to rotate in degrees, not radians
function rotateObject(object,degreeX=0, degreeY=0, degreeZ=0){
   degreeX = (degreeX * Math.PI)/180;
   degreeY = (degreeY * Math.PI)/180;
   degreeZ = (degreeZ * Math.PI)/180;
   object.rotateX(degreeX);
   object.rotateY(degreeY);
   object.rotateZ(degreeZ);
}
    var cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshLambertMaterial({color: 0x55B663}));
    cube.translateZ(1);
    scene.add(cube);

    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(-3,-2,3);
    scene.add(pointLight);

    var pointLightHelper = new THREE.PointLightHelper( pointLight, .5 ); //http://threejs.org/docs/index.html#Reference/Extras.Helpers/GridHelper
    scene.add( pointLightHelper );

    var plane = new THREE.Mesh(new THREE.PlaneGeometry(20,20,20), new THREE.MeshLambertMaterial({color: 0xffffff}));
    scene.add(plane);

    var gridHelper = new THREE.GridHelper(10,1); //size, step
    gridHelper.rotation.x = 1.57; //radians run from 0-6.28
    gridHelper.translateY(.01);
    scene.add( gridHelper );

    var axisHelper = new THREE.AxisHelper( 5 );
    axisHelper.translateZ(.02);
    scene.add( axisHelper );
