var container, stats;
var camera, controls, scene, renderer;
var objects = [];
init();
animate();
function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set(80,60,0);
	camera.lookAt( new THREE.Vector3() );

	scene = new THREE.Scene();
	scene.add( new THREE.AmbientLight( 0x505050 ) );
	var light = new THREE.SpotLight( 0xffffff, 1.5 );
	light.position.set( 0, 1000, 2000 );
	light.castShadow = true;
	light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 200, 10000 ) );
	light.shadowBias = 0.00001;
	light.shadowDarkness = 0.1;
	light.shadowMapWidth = 4096;
	light.shadowMapHeight = 4096;
	scene.add( light );

	// TESTING GROUNDS

	var brick = createBrick({color: 0x00ff00});
	brick.castShadow = true;
  brick.receiveShadow = true;
	scene.add(brick);

	// END TESTING GROUNDS


	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.sortObjects = false;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;
	container.appendChild( renderer.domElement );

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> webgl - draggable cubes';
	container.appendChild( info );
	// stats = new Stats();
	// container.appendChild( stats.dom );
	//
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function animate() {
	requestAnimationFrame( animate );
	render();
	// stats.update();
}
function render() {
	controls.update();
	renderer.render( scene, camera );
}

function mergeMeshes (meshes) {
  var combined = new THREE.Geometry();

  for (var i = 0; i < meshes.length; i++) {
    meshes[i].updateMatrix();
    combined.merge(meshes[i].geometry, meshes[i].matrix);
  }

  return combined;
}


function createBrick(color) {
	var meshes = [];
	var cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
	var cylinderGeo = new THREE.CylinderGeometry( 7, 7, 7, 20);

	var material = new THREE.MeshLambertMaterial( color );

	var mesh = new THREE.Mesh(cubeGeo, material);
	meshes.push(mesh);
	mesh.castShadow = true;
	mesh.receiveShadow = true;

	var positions = [
		{x: 12, y: 25, z: - 12},
		{x: - 12, y: 25, z: 12},
		{x: - 12, y: 25, z: - 12},
		{x: 12, y: 25, z: 12}
	];

	for (i = 0; i < positions.length; i++) {
		var cylinder = new THREE.Mesh(cylinderGeo, material);

		cylinder.position.x = positions[i].x + 2;
		cylinder.position.y = positions[i].y;
		cylinder.position.z = positions[i].z + 2;

		cylinder.castShadow = true;
		cylinder.receiveShadow = true;
		meshes.push( cylinder );
	}

	var brickGeometry = mergeMeshes(meshes);
	return new THREE.Mesh(brickGeometry, material);;
}
