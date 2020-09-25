

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 24, window.innerWidth/window.innerHeight, 0.1, 1000);

 const renderer = new THREE.WebGLRenderer({antialias: true});
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);
 
const colorYellow = new THREE.Color('rgb(248, 241, 94)');
const colorBlue = new THREE.Color('rgb(219, 253, 253)');
const colorOrange = new THREE.Color('rgb(255, 94, 0)');
const colorGreen = new THREE.Color('rgb(69, 136, 60)');

const light = new THREE.PointLight(colorYellow, 1);
const light2 = new THREE.PointLight(colorBlue, .5);
const light3 = new THREE.PointLight(colorOrange, 1);
const light4 = new THREE.PointLight(colorGreen, 10);

light.position.set(-40, -20, 40);
light2.position.set(10, 50, 50);
light3.position.set(10, 50, 80);
// light4.position.set(-90, 30, 0);

scene.add(light);
scene.add(light2);
scene.add(light3);
scene.add(light4);

camera.position.z = 15;



// stars
const vertices = [];

for (let i = 0; i < 100000; i ++ ) {

	const x = THREE.MathUtils.randFloatSpread(2500);
	const y = THREE.MathUtils.randFloatSpread(2500);
	const z = THREE.MathUtils.randFloatSpread(2500);

	vertices.push( x, y, z );

}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

const material = new THREE.PointsMaterial({color: colorYellow});

const points = new THREE.Points(geometry, material);

// earth

const createEarth = (r = 0.5, colorGreen) => {
    const earthMaterial = new THREE.MeshPhysicalMaterial({
        color: colorGreen,
     shinines: 40,
     wireframeLinewidth: 10,
     fog: true,
     reflectivity: 2,
    });
    const earthGeometry = new THREE.SphereGeometry(r, 32, 32);
    return new THREE.Mesh(earthGeometry, earthMaterial);
};

// sun

const createBall = (r = 1, colorOrange) => {
    const ballMaterial = new THREE.MeshPhongMaterial({
        shininess: 40,
        colorOrange,
    });

    const ballGeometry = new THREE.SphereGeometry(r, 32, 32);
    return new THREE.Mesh(ballGeometry, ballMaterial);
};


const newLight = (intensity = 1, colorYellow) => {
    return new THREE.PointLight(intensity, colorYellow);
};

const sun = createBall(2, colorOrange);
sun.position.set(-3.5, 2, -5);

const earth = createEarth(1, colorGreen);
earth.position.set(2, -1.5, 0);
earth.rotation.y = 20;
earth.rotation.z = -20;


const animate = () => {

    requestAnimationFrame(animate);
    earth.rotation.y += 0.03;
    // cube.rotation.x += 0.015;
    // cube.rotation.z += 0.01;
    renderer.render(scene, camera);
    }
    animate();

    const eartchAnimation = () => {
        const timer = 0.001 * Date.now();

        
    }


const handleResize = () => {
    const {innerWidth, innerHeight} = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
}

// loop

const loop = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
};

loop();
window.addEventListener('resize', handleResize);

scene.add(sun, newLight);
scene.add(points);
scene.add(earth);