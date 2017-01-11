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

var colors = ['0xb9140a', '0x1e6914', '0x1a3fcc', '0xd49417'];

init();
animate();
function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // SCENE
  scene = new THREE.Scene();


  // // LIGHTS
  var ambientLight = new THREE.AmbientLight( 0x606060 );
  scene.add( ambientLight );

  var light = new THREE.SpotLight( 0xffffff, 2 );
  light.position.set( 1000, 1500, 500 );
  light.castShadow = true;
  light.shadow = new THREE.LightShadow( new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 ) );
  light.shadow.bias = - 0.00022;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  scene.add( light );


  // RENDERER
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xffffff );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;


  // CAMERA
  camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 );
  camera.position.set(600,500,500);
  camera.lookAt( new THREE.Vector3() );


  // ROLL-OVER CUBE
  rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
  rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
  rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
  scene.add( rollOverMesh );


  // CUBE
  cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );  // will need to be altered to create bricks

  create404();

  raycaster = new THREE.Raycaster();

  mouse = new THREE.Vector2();

  var geometry = new THREE.PlaneBufferGeometry( 3000, 3000 );
  geometry.rotateX( - Math.PI / 2 );

  var planeMaterial = new THREE.ShadowMaterial();
  planeMaterial.opacity = 0.2;

  plane = new THREE.Mesh( geometry, planeMaterial );

  scene.add( plane );
  objects.push( plane );
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
    createCube(null, colors[0], {pos: obj404.four.pos[i], mod: obj404.four.firstPositionMod});
    createCube(null, colors[1], {pos: obj404.four.pos[i], mod: obj404.four.secondPositionMod});
  }

  for (var i = 0; i < obj404.zero.pos.length; i++) {
    createCube(null, colors[2], {pos: obj404.zero.pos[i], mod: obj404.zero.positionMod});
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
      var randomCol = colors[Math.floor(Math.random()*colors.length)];
      createCube(intersect, randomCol);
    }
    // render();
  }
}

function createCube(intersect, color, posAttributes = null) {
  cubeMaterial = new THREE.MeshLambertMaterial( { color: parseInt(color, 16 ) } );
  // cubeMaterial = new THREE.MeshLambertMaterial();
  // cubeMaterial.color = new THREE.Color("rgb(212, 148, 23)");

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
