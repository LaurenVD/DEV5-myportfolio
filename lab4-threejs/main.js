import './style.css'
import javascriptLogo from './javascript.svg'
//import three
import * as THREE from 'three';
//import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Material } from 'three';
// import gltf loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// add directional light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 1, 1 ).normalize();
scene.add( light );

//ORBIT CONTROLS
const controls = new OrbitControls( camera, renderer.domElement );

// texture loader
const textureloader = new THREE.TextureLoader();
const wallTexture = textureloader.load('/textures/walltexture.jpg');

// texture loader
const textureloaderRoof = new THREE.TextureLoader();
const roofTexture = textureloaderRoof.load('/textures/rooftexture.jpg');

// texture loader
const textureloaderName = new THREE.TextureLoader();
const nameTexture = textureloaderName.load('/textures/nametexture.png');

// texture loader
const textureloaderGrass = new THREE.TextureLoader();
const grassTexture = textureloaderGrass.load('/textures/grasstexture.jpg');

// texture loader
const textureloaderCloud = new THREE.TextureLoader();
const cloudTexture = textureloaderCloud.load('/textures/cloudtexture.jpg');

const wallBack = new THREE.PlaneGeometry(2, 2, 2);
const wallBackMaterial = new THREE.MeshBasicMaterial( {color: 0xaaaaaa} );
wallBackMaterial.map = wallTexture;
// show both sides of the plane (back and front)
wallBackMaterial.side = THREE.DoubleSide;
const wallBackMesh = new THREE.Mesh( wallBack, wallBackMaterial );
scene.add( wallBackMesh );

const wallRight = new THREE.PlaneGeometry(2, 2, 2);
const wallRightMaterial = new THREE.MeshBasicMaterial( {color: 0xaaaaaa} );
wallRightMaterial.map = wallTexture;
// show both sides of the plane (back and front)
wallRightMaterial.side = THREE.DoubleSide;
const wallRightMesh = new THREE.Mesh( wallRight, wallRightMaterial );
wallRightMesh.position.x = 1;
wallRightMesh.rotation.y = Math.PI/2;
wallRightMesh.position.z = 1;
scene.add( wallRightMesh );

const wallFront = new THREE.PlaneGeometry(2, 2, 2);
const wallFrontMaterial = new THREE.MeshBasicMaterial( {color: 0xaaaaaa} );
wallFrontMaterial.map = wallTexture;
// show both sides of the plane (back and front)
wallFrontMaterial.side = THREE.DoubleSide;
const wallFrontMesh = new THREE.Mesh( wallFront, wallFrontMaterial );
wallFrontMesh.position.z = 2;
scene.add( wallFrontMesh );

const wallLeft = new THREE.PlaneGeometry(2, 2, 2);
const wallLeftMaterial = new THREE.MeshBasicMaterial( {color: 0xaaaaaa} );
wallLeftMaterial.map = wallTexture;
// show both sides of the plane (back and front)
wallLeftMaterial.side = THREE.DoubleSide;
const wallLeftMesh = new THREE.Mesh( wallLeft, wallLeftMaterial );
wallLeftMesh.position.x = -1;
wallLeftMesh.rotation.y = Math.PI/2;
wallLeftMesh.position.z = 1;
scene.add( wallLeftMesh );

const roof = new THREE.ConeGeometry( 1.5, 1, 4 );
const roofMaterial = new THREE.MeshBasicMaterial( {color: 0xaaaaaa} );
roofMaterial.map = roofTexture;
const roofMesh = new THREE.Mesh( roof, roofMaterial );
roofMesh.position.y = 1.5;
roofMesh.rotation.y = Math.PI/4;
roofMesh.position.z = 1;
scene.add( roofMesh );

const chimney = new THREE.CylinderGeometry( 0.2, 0.2, 1, 32 );
const chimneyMaterial = new THREE.MeshBasicMaterial( {color: 0xaaaaaa} );
chimneyMaterial.map = wallTexture;
const chimneyMesh = new THREE.Mesh( chimney, chimneyMaterial );
chimneyMesh.position.x = -0.7;
chimneyMesh.position.y = 1.5;
chimneyMesh.position.z = 1;
scene.add( chimneyMesh );

// create box
const raam = new THREE.BoxGeometry(1, 0.5, 0.1);
const raamMaterial = new THREE.MeshBasicMaterial( { color: 0xBCD2E8 } );
const raamMesh = new THREE.Mesh( raam, raamMaterial );
raamMesh.position.x = -0.5;
raamMesh.position.y = 0.5;
raamMesh.position.z = 2;
scene.add( raamMesh );

// creat door as box
const door = new THREE.BoxGeometry(0.5, 1, 0.1);
const doorMaterial = new THREE.MeshBasicMaterial( { color: 0x8B4513 } );
const doorMesh = new THREE.Mesh( door, doorMaterial );
doorMesh.position.x = 0.5;
doorMesh.position.y = -0.5;
doorMesh.position.z = 2;
scene.add( doorMesh );

// create box
const cube = new THREE.BoxGeometry(1.5, 0.5, 0.1);
const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
cubeMaterial.map = nameTexture;
const cubeMesh = new THREE.Mesh( cube, cubeMaterial );
cubeMesh.position.x = 1;
cubeMesh.position.y = -0.7;
cubeMesh.position.z = 1;
cubeMesh.rotation.y = Math.PI/2;
scene.add( cubeMesh );

// create a box
const grass = new THREE.BoxGeometry(10, 10, 0.1);
const grassMaterial = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
grassMaterial.map = grassTexture;
const grassMesh = new THREE.Mesh( grass, grassMaterial );
// rotate the box
grassMesh.rotation.x = Math.PI/2;
// move the box
grassMesh.position.y = -1;
scene.add( grassMesh );

// create sphere
const sphere = new THREE.SphereGeometry( 100, 32, 32 );
const sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xaaaaaa} );
sphereMaterial.map = cloudTexture;
sphereMaterial.side = THREE.DoubleSide;
const sphereMesh = new THREE.Mesh( sphere, sphereMaterial );
scene.add( sphereMesh );

let createFlower = (x, y, z) => {
  const loader = new GLTFLoader();
  loader.load('/textures/model/scene.gltf', function ( gltf ) {
    gltf.scene.scale.set(0.01, 0.01, 0.01);
    gltf.scene.position.set(x,-1, z);
    scene.add( gltf.scene );
  }, undefined, function ( error ) {
    console.error( error );
  });
}

// add flower to scene
createFlower(2, 2);
createFlower(3,3);

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

	animate();