if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;
var camera, scene, renderer;
var plane, cube;
var mouse, raycaster, isShiftDown = false;
var rollOverMesh, rollOverMaterial;
var cubeGeo, cubeMaterial;
var objects = [];

var obj404 = {
  four: {
    pos: [
      {x: -125, y: 25, z: 125},
      {x: -125, y: 75, z: 125},
      {x: -125, y: 125, z: 125},
      {x: -125, y: 175, z: 125},
      {x: -125, y: 225, z: 125},
      {x: -125, y: 125, z: 175},
      {x: -125, y: 125, z: 225},
      {x: -125, y: 175, z: 225},
      {x: -125, y: 225, z: 225},
    ],
    firstPositionMod: {
      x: 100,
      z: 50,
    },
    secondPositionMod: {
      x: 350,
      z: -200,
    }
  },
  zero: {
    pos: [
      {x: 75, y: 25, z: 25},
      {x: 75, y: 25, z: 75},
      {x: 75, y: 25, z: 125},
      {x: 75, y: 75, z: 25},
      {x: 75, y: 125, z: 25},
      {x: 75, y: 175, z: 25},
      {x: 75, y: 225, z: 25},
      {x: 75, y: 75, z: 125},
      {x: 75, y: 125, z: 125},
      {x: 75, y: 175, z: 125},
      {x: 75, y: 225, z: 75},
      {x: 75, y: 225, z: 125},
    ],
    positionMod: {
      x: 1,
      z: 1,
    }
  }
}

var colors = ['0xDB4437', '0x0F9D58', '0x4285F4', '0xFCEE21'];

init();
animate();
function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // SCENE
  scene = new THREE.Scene();


  // LIGHTS
  // var ambientLight = new THREE.AmbientLight( 0x606060 );
  var ambientLight = new THREE.AmbientLight( 0x606060 );
  scene.add( ambientLight );

  // var directionalLight = new THREE.DirectionalLight( 0xffffff );
  // directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
  // console.log(directionalLight.position);
  // scene.add( directionalLight );

  var light = new THREE.SpotLight( 0xffffff, 1.2 );
  light.position.set( 1000, 1500, 500 );
  light.castShadow = true;
  light.shadow = new THREE.LightShadow( new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 ) );
  light.shadow.bias = - 0.00022;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  scene.add( light );


  // CAMERA
  // camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 );
  // camera.position.set( 500, 800, 1300 );
  camera.position.set(500,500,500);
  camera.lookAt( new THREE.Vector3() );


  // RENDERER
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xf0f0f0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;


  // ROLL-OVER CUBE
  rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
  rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
  rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
  scene.add( rollOverMesh );


  // CUBE
  cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );  // will need to be altered to create bricks


  // GRID
  var size = 500, step = 50;
  var geometry = new THREE.Geometry();
  for ( var i = - size; i <= size; i += step ) {
    geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
    geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
    geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
    geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
  }


  var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );
  var line = new THREE.LineSegments( geometry, material );
  // scene.add( line );


  raycaster = new THREE.Raycaster();

  mouse = new THREE.Vector2();

  var geometry = new THREE.PlaneBufferGeometry( 2700, 2700 );
  geometry.rotateX( - Math.PI / 2 );
  plane = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { visible: true } ) );

  scene.add( plane );
  objects.push( plane );

  create404();

  // directionalLight.castShadow = true;
  // var helper = new THREE.CameraHelper( directionalLight.shadow.camera );
  // scene.add(helper);

  // cube.castShadow = true;
  plane.receiveShadow = true;

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'keydown', onDocumentKeyDown, false );
  document.addEventListener( 'keyup', onDocumentKeyUp, false );

  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  camera.left = window.innerWidth / - 2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = window.innerHeight / - 2;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function create404() {
  // first create the first 4
  for (var i = 0; i < obj404.four.pos.length; i++){
    createCube(null, {pos: obj404.four.pos[i], mod: obj404.four.firstPositionMod});
    createCube(null, {pos: obj404.four.pos[i], mod: obj404.four.secondPositionMod});
  }

  for (var i = 0; i < obj404.zero.pos.length; i++) {
    createCube(null, {pos: obj404.zero.pos[i], mod: obj404.zero.positionMod});
  }
}

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( objects );
  if ( intersects.length > 0 ) {
    var intersect = intersects[ 0 ];
    rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
    rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
  }
  // render();
}

function onDocumentMouseDown( event ) {
  event.preventDefault();
  mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( objects );
  if ( intersects.length > 0 ) {
    var intersect = intersects[ 0 ];
    // delete cube
    if ( isShiftDown ) {
      deleteCube(intersect);
    // create cube
    } else {
      createCube(intersect);
    }
    // render();
  }
}

function createCube(intersect, posAttributes = null) {
  // cubeMaterial = new THREE.MeshLambertMaterial( { color: parseInt(colors[Math.floor(Math.random()*colors.length)], 16 ) } );
  cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x4285F4 } );

  var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
  if (posAttributes) {
    voxel.position.x = posAttributes.pos.x + posAttributes.mod.x;
    voxel.position.y = posAttributes.pos.y;
    voxel.position.z = posAttributes.pos.z + posAttributes.mod.z;
  }
  else {
    voxel.position.copy( intersect.point ).add( intersect.face.normal );
    voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
    console.log(voxel.position);
  }
  voxel.castShadow = true;
  voxel.receiveShadow = true;
  scene.add( voxel );
  objects.push( voxel );
}

function deleteCube(intersect) {
  if ( intersect.object != plane ) {
    scene.remove( intersect.object );
    objects.splice( objects.indexOf( intersect.object ), 1 );
  }
}

function onDocumentKeyDown( event ) {
  switch( event.keyCode ) {
    case 16: isShiftDown = true; break;
  }
}

function onDocumentKeyUp( event ) {
  switch ( event.keyCode ) {
    case 16: isShiftDown = false; break;
  }
}

function animate() {
	requestAnimationFrame( animate );
	render();
	// stats.update();
}

function render() {
  renderer.render( scene, camera );
}
