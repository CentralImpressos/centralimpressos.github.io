import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js';
import { businessConfig } from './config.js';
import { createBoxGeometry } from './geometry.js';

let makerjs = globalThis.MakerJs || globalThis.makerjs || globalThis.makerJS;
let scene;
let camera;
let renderer;
let controls;
let current = null;
let selectedColor = 'black';
let preset = 'open';
let jointType = 'finger';
let hasDividers = false;
let cameraViewInitialized = false;

const $ = (id) => document.getElementById(id);
const colors = {
  black: { hex: 0x181a1b, edge: 0x4b5052, edgeOpacity: .7, roughness: .14, clearcoat: 1, clearcoatRoughness: .07, opacity: .98 },
  white: { hex: 0xd9dad6, edge: 0x8c9291, edgeOpacity: .58, roughness: .17, clearcoat: 1, clearcoatRoughness: .09, opacity: .98 },
  clear: { hex: 0xd8dedb, edge: 0x74807d, edgeOpacity: .48, roughness: .08, transmission: .82, thickness: .8, ior: 1.46, opacity: .58 }
};
const kerf = businessConfig.kerf;

function populateThicknessOptions() {
  const select = $('thickness');
  businessConfig.acrylic.forEach(({ thickness }) => {
    const option = document.createElement('option');
    option.value = thickness;
    option.textContent = `${thickness} mm`;
    option.selected = thickness === 2;
    select.appendChild(option);
  });
}

function init3D() {
  const host = $('preview');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(35, 1, 1, 2000);
  camera.position.set(190, 150, 210);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  host.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 30, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x59635e, 2.1));
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(120, 240, 160);
  scene.add(light);
  resize();
  window.addEventListener('resize', resize);
  animate();
}

function resize() {
  const host = $('preview');
  const width = host.clientWidth;
  const height = host.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function clearScene() {
  while (scene.children.length > 2) scene.remove(scene.children[2]);
}

function createExtrudedPart(piece, material) {
  const shape = new THREE.Shape();
  piece.points.forEach(([x, y], index) => {
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  shape.closePath();
  const mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, {
    depth: piece.thickness,
    bevelEnabled: false,
    curveSegments: 1
  }), material);
  mesh.position.set(...piece.position);
  mesh.rotation.set(...piece.rotation);
  const edgeMaterial = material.userData.edgeMaterial;
  if (edgeMaterial) {
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), edgeMaterial);
    mesh.add(edges);
  }
  scene.add(mesh);
}

function pieceCount() {
  const basePieces = preset === 'open' ? 5 : 6;
  return basePieces + (hasDividers ? Math.max(0, getDividerRows() - 1) + Math.max(0, getDividerColumns() - 1) : 0);
}

function getDividerRows() {
  return Math.max(1, Math.min(12, Math.round(+$('divider-rows').value) || 1));
}

function getDividerColumns() {
  return Math.max(1, Math.min(12, Math.round(+$('divider-columns').value) || 1));
}

function getFingerLimit() {
  const dimensions = [+$('width').value, +$('height').value, +$('depth').value].filter((value) => Number.isFinite(value) && value > 0);
  return dimensions.length ? Math.max(1, Math.floor(Math.min(...dimensions) * 2 / 3 * 10) / 10) : 1;
}

function syncFingerLimit() {
  const limit = getFingerLimit();
  const input = $('finger-length');
  input.max = limit;
  input.value = Math.min(limit, Math.max(1, +input.value || 1));
  $('finger-limit').textContent = `Máximo para estas dimensões: ${limit} mm.`;
  $('finger-value').textContent = `${input.value} mm`;
}

function getFingerLength() {
  syncFingerLimit();
  return Math.min(getFingerLimit(), Math.max(1, +$('finger-length').value || 1));
}

function getKerf() {
  return kerf;
}

function getMaterialEstimate(width, height, depth, thickness) {
  const material = businessConfig.acrylic.find((item) => item.thickness === thickness);
  if (!material) return { area: 0, value: 0 };
  const wallArea = 2 * width * height + 2 * depth * height;
  const lidArea = preset === 'lid' ? width * depth : 0;
  let area = width * depth + wallArea + lidArea;
  if (hasDividers) {
    const dividerHeight = preset === 'open' ? height : height - 2 * thickness;
    area += Math.max(0, getDividerRows() - 1) * (width - 2 * thickness) * dividerHeight;
    area += Math.max(0, getDividerColumns() - 1) * (depth - 2 * thickness) * dividerHeight;
  }
  const squareMeters = area / 1000000;
  return { area: squareMeters, value: squareMeters * material.pricePerSquareMeter };
}

function updateEstimate(width, height, depth, thickness) {
  const estimate = getMaterialEstimate(width, height, depth, thickness);
  const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: businessConfig.currency });
  $('estimate').textContent = `Valor estimado: ${formatter.format(estimate.value)} · ${estimate.area.toFixed(3)} m²`;
}

function loadMakerJs() {
  if (makerjs) return Promise.resolve(makerjs);
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/makerjs@0.15.0/dist/browser.maker.js';
    script.onload = () => {
      makerjs = globalThis.MakerJs || globalThis.makerjs || globalThis.makerJS;
      makerjs ? resolve(makerjs) : reject(new Error('Maker.js não expôs uma API global.'));
    };
    script.onerror = () => reject(new Error('Não foi possível carregar Maker.js.'));
    document.head.appendChild(script);
  });
}

function generateBox() {
  syncFingerLimit();
  const width = +$('width').value;
  const height = +$('height').value;
  const depth = +$('depth').value;
  const thickness = +$('thickness').value;
  if ([width, height, depth, thickness].some((value) => !Number.isFinite(value) || value <= 0)) {
    $('message').textContent = 'Informe medidas positivas.';
    return;
  }
  const internal = document.querySelector('input[name="dimension"]:checked').value === 'internal';
  const outer = {
    w: internal ? width + 2 * thickness : width,
    h: internal ? height + 2 * thickness : height,
    d: internal ? depth + 2 * thickness : depth
  };
  current = { ...outer, t: thickness, preset };
  current.kerf = getKerf();
  current.geometry = createBoxGeometry({
    width: outer.w,
    height: outer.h,
    depth: outer.d,
    thickness,
    preset,
    jointType,
    fingerLength: getFingerLength(),
    kerf: getKerf(),
    hasDividers,
    dividerRows: getDividerRows(),
    dividerColumns: getDividerColumns()
  });
  clearScene();
  const color = colors[selectedColor];
  const material = new THREE.MeshPhysicalMaterial({
    color: color.hex,
    roughness: color.roughness,
    metalness: .04,
    clearcoat: color.clearcoat || 0,
    clearcoatRoughness: color.clearcoatRoughness || .1,
    transmission: color.transmission || 0,
    thickness: color.thickness || 0,
    ior: color.ior || 1.5,
    transparent: color.opacity < 1,
    opacity: color.opacity,
    depthWrite: color.opacity >= .9,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
  });
  material.userData.edgeMaterial = new THREE.LineBasicMaterial({
    color: color.edge,
    transparent: true,
    opacity: color.edgeOpacity,
    depthTest: true,
    depthWrite: false
  });
  current.geometry.pieces.forEach((piece) => createExtrudedPart(piece, material));
  if (!cameraViewInitialized) {
    camera.position.set(Math.max(150, outer.w * 1.8), Math.max(130, outer.h * 1.7), Math.max(180, outer.d * 2));
    controls.target.set(0, outer.h / 2, 0);
    controls.update();
    cameraViewInitialized = true;
  }
  const jointLabel = jointType === 'finger' ? `dedos de ${getFingerLength()} mm` : 'juntas planas';
  const dividerLabel = hasDividers ? ` · ${getDividerRows()} linhas x ${getDividerColumns()} colunas` : '';
  $('summary').innerHTML = `<strong>${Math.round(outer.w)} x ${Math.round(outer.d)} x ${Math.round(outer.h)} mm</strong> · ${pieceCount()} peças · ${jointLabel}${dividerLabel}`;
  updateEstimate(outer.w, outer.h, outer.d, thickness);
  $('status').textContent = 'modelo atualizado';
  $('message').textContent = 'Dimensões externas calculadas com a espessura selecionada.';
}

const layoutGap = 1.2;

async function exportSVG() {
  if (!current) generateBox();
  try {
    await loadMakerJs();
  } catch (error) {
    $('message').textContent = 'Maker.js não foi carregado. Verifique a conexão e tente novamente.';
    return;
  }
  if (!current || !makerjs) return;
  const { w, h, d, t } = current;
  const model = { models: {}, paths: {} };
  const gap = 2 * t + layoutGap;
  const layout = {
    base: [0, 0],
    front: [0, d + gap],
    back: [w + gap, d + gap],
    left: [w * 2 + gap * 2, d + gap],
    right: [w * 2 + d + gap * 3, d + gap],
    lid: [0, d + h + gap * 2]
  };
  current.geometry.pieces.forEach((piece) => {
    if (piece.type === 'divider') return;
    const [x, y] = layout[piece.name];
    const outline = new makerjs.models.ConnectTheDots(true, piece.points);
    makerjs.model.move(outline, [x, y]);
    model.models[piece.name] = outline;
  });
  const dividerX = w * 2 + d + gap * 4;
  const rowLayoutGap = gap * 1.5;
  const dividerHeight = preset === 'open' ? h : h - 2 * t;
  let dividerRowIndex = 0;
  let dividerColumnIndex = 0;
  current.geometry.pieces.filter((piece) => piece.type === 'divider').forEach((piece) => {
    const isRow = piece.name.startsWith('divider-row');
    const index = isRow ? dividerRowIndex++ : dividerColumnIndex++;
    const x = isRow ? dividerX : dividerX + w + rowLayoutGap;
    const y = d + gap * 3 + index * (dividerHeight + rowLayoutGap);
    const outline = new makerjs.models.ConnectTheDots(true, piece.points);
    makerjs.model.move(outline, [x, y]);
    model.models[piece.name] = outline;
  });
  const svg = makerjs.exporter.toSVG(model, { stroke: '#000000', strokeWidth: .1, fill: 'none' }).replace(/<svg /, '<svg id="caixa-laser" ');
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `caixa-${preset}.svg`;
  link.click();
  URL.revokeObjectURL(url);
  $('message').textContent = 'SVG planificado exportado com encaixes.';
}

document.querySelectorAll('.preset').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.preset').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  preset = button.dataset.preset;
  generateBox();
}));
document.querySelectorAll('.swatch').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.swatch').forEach((item) => item.classList.remove('selected'));
  button.classList.add('selected');
  selectedColor = button.dataset.color;
  generateBox();
}));
$('divider-options').hidden = true;
document.querySelector('#has-dividers').addEventListener('change', (event) => {
  hasDividers = event.target.checked;
  $('divider-options').hidden = !hasDividers;
  generateBox();
});
document.querySelectorAll('input[name="joint"]').forEach((input) => input.addEventListener('change', () => {
  jointType = document.querySelector('input[name="joint"]:checked').value;
  $('finger-options').hidden = jointType !== 'finger';
  generateBox();
}));
$('finger-options').hidden = false;
$('generate').addEventListener('click', generateBox);
$('export').addEventListener('click', exportSVG);
document.querySelectorAll('input:not([name="joint"]), select').forEach((input) => input.addEventListener('change', () => {
  $('divider-options').hidden = !hasDividers;
  generateBox();
}));

populateThicknessOptions();
try {
  init3D();
  generateBox();
} catch (error) {
  console.error(error);
  $('message').textContent = 'Não foi possível iniciar o preview 3D. Recarregue a página.';
}
