import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
/**
 * Debug
 */
const gui = new dat.GUI();
const parameters = {
  ambientLightColor: 0xff0000,
  directionalLightColor: 0x00ffff,
  HemisphereLightColor1: 0xff0000,
  HemisphereLightColor2: 0x0000ff,
  pointLightColor: 0xff9000,
  rectAreaLightColor: 0x4e00ff,
  spotLightColor: 0x78ff00,
};
const scene = new THREE.Scene();

const canvas = document.querySelector("canvas.webgl");

/**
 * Meshes
 */
const geometry = new THREE.BoxGeometry(5, 5, 5);
const sphereGeo = new THREE.SphereGeometry(4, 32);
const toursGeo = new THREE.TorusGeometry(3, 1, 32, 32);
const planeGeo = new THREE.PlaneGeometry(30, 30);
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
const sphereMesh = new THREE.Mesh(sphereGeo, material);
sphereMesh.position.x = 10;
scene.add(sphereMesh);
const toursMesh = new THREE.Mesh(toursGeo, material);
toursMesh.position.x = -10;
scene.add(toursMesh);
const planMesh = new THREE.Mesh(planeGeo, material);
planMesh.rotation.x = Math.PI * 0.5;
planMesh.position.y = -5;
planMesh.material.side = THREE.DoubleSide;
scene.add(planMesh);

/**
 * Lights
 */

/*******************************/
/*       ambientLight          */
/*******************************/
const ambientLight = new THREE.AmbientLight(parameters.ambientLightColor, 0.5);
ambientLight.visible = false;
scene.add(ambientLight);

// ambientLight Tweaks
const ambientTweaks = gui.addFolder("ambientLight");
ambientTweaks.add(ambientLight, "visible");
ambientTweaks.add(ambientLight, "intensity", 0, 1, 0.001);
ambientTweaks.addColor(parameters, "ambientLightColor").onChange(() => {
  ambientLight.color.set(parameters.ambientLightColor);
});

/*******************************/
/*       directional light     */
/*******************************/
const directionalLight = new THREE.DirectionalLight(
  parameters.directionalLightColor,
  0.5
);
directionalLight.visible = false;
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

// directionalLight Tweaks
const directionalTweaks = gui.addFolder("directionalLight");
directionalTweaks.add(directionalLight, "visible");
directionalTweaks.add(directionalLight, "intensity", 0, 1, 0.001);
directionalTweaks.add(directionalLight.position, "x", -1, 1, 0.001);
directionalTweaks.add(directionalLight.position, "y", -1, 1, 0.001);
directionalTweaks.add(directionalLight.position, "z", -1, 1, 0.001);
directionalTweaks.addColor(parameters, "directionalLightColor").onChange(() => {
  directionalLight.color.set(parameters.directionalLightColor);
});

//directionalLightHelper
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  5
);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);
directionalTweaks.add(directionalLightHelper, "visible").name("helper");

/*******************************/
/*       Hemisphere light      */
/*******************************/
const hemisphereLight = new THREE.HemisphereLight(
  parameters.HemisphereLightColor1,
  parameters.HemisphereLightColor2,
  0.3
);
hemisphereLight.visible = false;
scene.add(hemisphereLight);

// HemisphereLight tweaks
const HemisphereTweaks = gui.addFolder("HemisphereLight");
HemisphereTweaks.add(hemisphereLight, "visible");
HemisphereTweaks.add(hemisphereLight, "intensity", 0, 1, 0.001);
HemisphereTweaks.addColor(parameters, "HemisphereLightColor1").onChange(() => {
  hemisphereLight.color.set(parameters.HemisphereLightColor1);
});
HemisphereTweaks.addColor(parameters, "HemisphereLightColor2").onChange(() => {
  hemisphereLight.groundColor.set(parameters.HemisphereLightColor2);
});

//hemisphereLightHelper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  5
);
hemisphereLightHelper.visible = false;

scene.add(hemisphereLightHelper);
HemisphereTweaks.add(hemisphereLightHelper, "visible").name("helper");

/*******************************/
/*       Point light           */
/*******************************/
const pointLight = new THREE.PointLight(parameters.pointLightColor, 0.5, 20);
pointLight.position.set(1, -5, 10);
pointLight.visible = false;
scene.add(pointLight);

// PointLight Tweaks
const pointLightTweaks = gui.addFolder("pointLight");
pointLightTweaks.add(pointLight, "visible");
pointLightTweaks.add(pointLight, "intensity", 0, 1, 0.001);
pointLightTweaks.add(pointLight.position, "x", -10, 10, 0.001);
pointLightTweaks.add(pointLight.position, "y", -10, 10, 0.001);
pointLightTweaks.add(pointLight.position, "z", -10, 10, 0.001);
pointLightTweaks.addColor(parameters, "pointLightColor").onChange(() => {
  pointLight.color.set(parameters.pointLightColor);
});

// pointLightHelper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
pointLightHelper.visible = false;

scene.add(pointLightHelper);
pointLightTweaks.add(pointLightHelper, "visible").name("helper");

/*******************************/
/*       RectArea light        */
/*******************************/
const rectAreaLight = new THREE.RectAreaLight(
  parameters.rectAreaLightColor,
  20,
  10,
  10
);
rectAreaLight.visible = false;
rectAreaLight.position.set(-1.5, 0, 0);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

// ReactAreaLight tweaks
const RectAreaTweak = gui.addFolder("ReactAreaLight");
RectAreaTweak.add(rectAreaLight, "visible");
RectAreaTweak.add(rectAreaLight, "intensity", 0, 20, 0.001);
RectAreaTweak.add(rectAreaLight.position, "x", -10, 10, 0.001);
RectAreaTweak.add(rectAreaLight.position, "y", -10, 10, 0.001);
RectAreaTweak.add(rectAreaLight.position, "z", -10, 10, 0.001);
RectAreaTweak.add(rectAreaLight, "width", 0, 10, 0.001);
RectAreaTweak.add(rectAreaLight, "height", 0, 10, 0.001);
RectAreaTweak.addColor(parameters, "rectAreaLightColor").onChange(() => {
  rectAreaLight.color.set(parameters.rectAreaLightColor);
});

// helper
const rectAreaHelper = new RectAreaLightHelper(rectAreaLight);
rectAreaHelper.visible = false;

scene.add(rectAreaHelper);
RectAreaTweak.add(rectAreaHelper, "visible").name("helper");

/*******************************/
/*       Spot light            */
/*******************************/
const spotLight = new THREE.SpotLight(
  parameters.spotLightColor,
  1,
  20,
  Math.PI,
  0.25,
  1
);
spotLight.visible = false;
spotLight.position.set(0, 2, 5);
scene.add(spotLight);

// SpotLight Tweaks
const spotLightTweak = gui.addFolder("SpotLight ");
spotLightTweak.add(spotLight, "visible");
spotLightTweak.add(spotLight, "intensity", 0, 20, 0.001);
spotLightTweak.add(spotLight.position, "x", -10, 10, 0.001);
spotLightTweak.add(spotLight.position, "y", -10, 10, 0.001);
spotLightTweak.add(spotLight.position, "z", -10, 10, 0.001);
spotLightTweak.add(spotLight, "distance", 0, 20, 0.001);
spotLightTweak.add(
  spotLight,
  "angle",
  -Math.PI * 2,
  Math.PI * 2,
  Math.PI * 0.01
);
spotLightTweak.addColor(parameters, "spotLightColor").onChange(() => {
  spotLight.color.set(parameters.spotLightColor);
});

//spotLightHelper
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
spotLightHelper.visible = false;
scene.add(spotLightHelper);
spotLightTweak.add(spotLightHelper, "visible").name("helper");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
