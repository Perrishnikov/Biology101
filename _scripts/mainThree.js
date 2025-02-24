'use strict';

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    var scene, cameraMain, renderer, controls;
    var MaxFrameRate = 30;

    // if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    // selectAspect();		//sets initial aspect ratio...
    initStandard();
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
    function makeTexture(url){
        var tex = new THREE.TextureLoader().load(url);
        tex.minFilter = THREE.NearestFilter;  //Needed to prevent console errors because image isnt power of 2
        tex.generateMipmaps = false;
        return tex;
    }

    var boxElderMat = new THREE.MeshStandardMaterial({
        color: 0x55B663,
        roughness: .9,
        metalness: 0,
        map: makeTexture("_images/BoxElder/Box_COLOR.png"),
        normalMap: makeTexture("_images/BoxElder/Box_NRM.png"),
        roughnessMap: makeTexture("_images/BoxElder/Box_SPEC.png"),
    });

    var slide = new THREE.Mesh(new THREE.PlaneGeometry(3,3,3), boxElderMat);
    slide.translateZ(.5);
    scene.add(slide);

        // var newMesh = null;
        // var newMaterial = null;
        // initMesh();
        // function initMesh() {
        //     var loader = new THREE.JSONLoader();
        //     loader.load('_images/BoxElder/BoxElder02.json', function(geometry, material) {
        //         newMesh = new THREE.Mesh(geometry);
        //         newMaterial = new THREE.MeshStandardMaterial(material);
        //         newMesh.rotation.x = 1.57;
        //         newMesh.scale.set(4,4,4);
        //         newMesh.material = newMaterial;
        //         console.log(newMaterial);
        //         // scene.add(newMesh);
        //     });
        // }

    // var loader = new THREE.JSONLoader().load("_images/BoxElder/BoxElderPlanes.json", function(geometry){
    //     var geo = geometry;
    //     console.log(geo);
    //     return geometry;
    // } );
    //
    // var slidejson = new THREE.Mesh(loader, boxElderMat);
    // scene.add(slidejson);
    //
    // var plane = new THREE.PlaneGeometry(4,4,4);
    // console.log(plane);

// var jsonData = function(){
//     var loader = new THREE.JSONLoader().load("_images/BoxElder/BoxElderPlanes.json", geometry );
//     // var geometry = geometry;
//     console.log(geometry);
//     // return geometry;
// }

    // console.log(loader);
    // function addModel( geometry ){
    //     // var material = new THREE.MeshFaceMaterial( materials );
    //     var model = new THREE.Mesh( geometry, boxElderMat );
    //     model.rotation.x = 1.57;
    //     model.scale.set(4,4,4);
    //     scene.add( model );
    // }

    //  var slide = new THREE.Mesh(json, boxElderMat);
    //  scene.add(slide);

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
