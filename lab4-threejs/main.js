import './style.css'
import javascriptLogo from './javascript.svg'
//import three
import * as THREE from 'three';
//import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//ORBIT CONTROLS
const controls = new OrbitControls( camera, renderer.domElement );

const wallBack = new THREE.PlaneGeometry(2, 2, 2);
const wallBackMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// show both sides of the plane (back and front)
wallBackMaterial.side = THREE.DoubleSide;
const wallBackMesh = new THREE.Mesh( wallBack, wallBackMaterial );
scene.add( wallBackMesh );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

	animate();