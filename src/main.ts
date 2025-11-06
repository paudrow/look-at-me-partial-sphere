import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const clipPlanes = [
	new THREE.Plane()
];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(innerWidth, innerHeight);
renderer.localClippingEnabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 1, 0);
controls.minDistance = 1;
controls.maxDistance = 10;
controls.enablePan = false;

const light = new THREE.HemisphereLight( 0xffffff, 0x080808, 4.5 );
light.position.set( - 1.25, 1, 1.25 );
scene.add( light );

const geometry = new THREE.SphereGeometry(1, 32, 16);
const material = new THREE.MeshBasicMaterial( {
	color: 0x00ff00,
	side: THREE.DoubleSide,
	clippingPlanes: clipPlanes,
	clipIntersection: false,
	alphaToCoverage: true,
} );
const sphere = new THREE.Mesh(geometry, material);
sphere.position.y = 1;
scene.add(sphere);

const innerGeometry = new THREE.SphereGeometry(0.4, 32, 16);
const innerMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
innerSphere.position.y = 1;
scene.add(innerSphere);

const innermostGeometry = new THREE.SphereGeometry(0.6, 32, 16);
const innermostMaterial = new THREE.MeshBasicMaterial( {
	color: 0xffff00,
	side: THREE.DoubleSide,
	clippingPlanes: clipPlanes,
	clipIntersection: false,
	alphaToCoverage: true,
} );
const innermostSphere = new THREE.Mesh(innermostGeometry, innermostMaterial);
innermostSphere.position.y = 1;
scene.add(innermostSphere);

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg');

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterials = [
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
  new THREE.MeshBasicMaterial({ map: texture }),
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
];
const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
cube.position.set(2, 1, 0);
scene.add(cube);

camera.position.set(3, 3, 3);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cube.lookAt(camera.position);
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  clipPlanes[0].setFromNormalAndCoplanarPoint(direction, new THREE.Vector3(0, 1, 0));
  renderer.render(scene, camera);
}
animate();