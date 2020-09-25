

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 24, window.innerWidth/window.innerHeight, 0.1, 1000);

 const renderer = new THREE.WebGLRenderer({antialias: true});
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);
 
const colorYellow = new THREE.Color('rgb(248, 241, 94)');
const colorBlue = new THREE.Color('rgb(219, 253, 253)');

 const cubeMaterial = new THREE.MeshPhysicalMaterial({
     color: 0x36a598,
     shinines: 80,
     wireframeLinewidth: 10,
     fog: true,
     reflectivity: 1,
 });

const cubeGeometry = new THREE.SphereGeometry(2, 8, 5);

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);



const sunMaterial = new THREE.MeshNormalMaterial({
     color: colorYellow,
 });
 const sunGeometry = new THREE.SphereGeometry(2, 32, 32);

 const sun = new THREE.Mesh(sunGeometry, sunMaterial);

const light = new THREE.PointLight(colorYellow, 2);
const light2 = new THREE.PointLight(colorBlue, .5);

light.position.set(-40, -20, 20);
light2.position.set(10, 20, 40);

scene.add(light);
scene.add(light2);
scene.add(cube);
scene.add(sun);

camera.position.z = (15);
cube.rotation.y = 20;
cube.rotation.z = -20;


const animate = () => {

requestAnimationFrame(animate);
cube.rotation.y += 0.01;
cube.rotation.x += 0.015;
cube.rotation.z += 0.01;
renderer.render(scene, camera);
}
animate();

