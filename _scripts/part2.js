
'use strict';

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    var scene, cameraMain, renderer, controls;
    var MaxFrameRate = 30;

    // if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    // selectAspect();		//sets initial aspect ratio...
    initStandard();
    // loadjson();
    // initCustom();


    // animate();
    // render();

// Standard Functions ==========================================================
    function initStandard() {
        scene = new THREE.Scene();

        cameraMain = new THREE.PerspectiveCamera(60, WIDTH/HEIGHT, .1, 50);// https://github.com/mrdoob/three.js/issues/352
        cameraMain.up.set( 0, 0, 1 );   //sets z up
        cameraMain.position.set(0, 0, 4);
        cameraMain.lookAt(scene.position);

        renderer = new THREE.WebGLRenderer({canvas:canvas3, antialias: true });
        renderer.setSize(WIDTH, HEIGHT, true);
        renderer.setClearColor( 0x333F47, 1 ); //set scene background color to black
        // console.log(renderer.getContextAttributes());
        // console.dir(renderer.getContext().canvas);

        controls = new THREE.OrbitControls( cameraMain, renderer.domElement );
        // controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
        controls.maxDistance = 5;
        controls.minDistance = 2;
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;

        $("#canvas3").append(renderer.domElement);
    }

    // render 30 times a second (should also look at requestAnimationFrame)
    setInterval(render,1000/30);
    // or
    // function animate() {
    //     // requestAnimationFrame(animate);  //browser API that delegates redraws to the browser at 60/sec
    //     controls.update();  // required if controls.enableDamping = true, or if controls.autoRotate = true
    //     render();
    // }
    function render(){
        // rotateObject(cube,0,0,2); //helper function
        renderer.render(scene, cameraMain);
    }


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

var loader = new THREE.ObjectLoader()
loader.load("BoxElder.json");

// assuming we loaded a JSON structure from elsewhere
var object = loader.parse( a_json_object );
console.log(object);

scene.add( object );


    var slide = new THREE.Mesh(new THREE.PlaneGeometry(3,3,3), boxElderMat);
    slide.translateZ(.5);
    scene.add(slide);

//=====================================================
    var spotLight = new THREE.SpotLight( 0xffffff, 1.5 );
    spotLight.position.set(-2, 4, 5);
    scene.add( spotLight );

    var spotLightHelper = new THREE.SpotLightHelper( spotLight );
    scene.add( spotLightHelper );

    var plane = new THREE.Mesh(new THREE.PlaneGeometry(20,20,20), new THREE.MeshLambertMaterial({color: 0xffffff}));
    // scene.add(plane);

    var gridHelper = new THREE.GridHelper(10,1); //size, step
    gridHelper.rotation.x = 1.57; //radians run from 0-6.28
    gridHelper.translateY(.01);
    scene.add( gridHelper );

    var axisHelper = new THREE.AxisHelper( 5 );
    axisHelper.translateZ(.02);
    scene.add( axisHelper );
