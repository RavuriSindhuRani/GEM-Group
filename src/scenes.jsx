import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function makeRenderer(el) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  el.appendChild(renderer.domElement);
  const pm = new THREE.PMREMGenerator(renderer);
  const env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  return { renderer, env };
}

/* ───────── Hero: a skyline that is built from scratch — foundation, columns, floors, glass, crane ───────── */
export function BuildScene() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let renderer, env;
    try { ({ renderer, env } = makeRenderer(el)); } catch { return; }
    const scene = new THREE.Scene();
    scene.environment = env;
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 3, 19); camera.lookAt(0, 0, 0);
    const M = {
      con: new THREE.MeshStandardMaterial({ color: 0xf4f9fd, roughness: 0.45, metalness: 0.1 }),
      sky: new THREE.MeshStandardMaterial({ color: 0x1f9fdc, roughness: 0.25, metalness: 0.7 }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x9bd8f6, transparent: true, opacity: 0.55, roughness: 0.05, metalness: 0.25, envMapIntensity: 1.6 }),
    };
    const world = new THREE.Group(); scene.add(world);
    const parts = [], FH = 0.55;
    const piece = (w, h, d, mat, x, y, z, off, s, e, kind) => {
      const g = new THREE.BoxGeometry(w, h, d); g.translate(0, h / 2, 0);
      const o = new THREE.Mesh(g, mat); o.position.set(x, y, z); o.visible = false; world.add(o);
      parts.push({ o, off, s, e, kind, y0: y });
    };
    const tower = (x, z, w, d, n, off) => {
      piece(w + 1, 0.2, d + 1, M.con, x, -0.2, z, off, 0, 0.1, 'grow');                      // foundation
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => piece(0.13, n * FH, 0.13, M.sky, x + a * w / 2, 0, z + b * d / 2, off, 0.08, 0.38, 'grow')); // columns
      for (let i = 0; i < n; i++) {
        const s = 0.3 + (0.52 * i) / n;
        piece(w + 0.24, 0.07, d + 0.24, M.con, x, (i + 1) * FH - 0.07, z, off, s, s + 0.09, 'drop'); // floor slab lands
        piece(w, FH - 0.07, d, M.glass, x, i * FH, z, off, s + 0.05, s + 0.14, 'grow');            // glass facade
      }
      piece(w * 0.5, 0.35, d * 0.5, M.sky, x, n * FH, z, off, 0.9, 0.97, 'drop');                 // roof crown
      piece(0.04, 1, 0.04, M.sky, x, n * FH + 0.35, z, off, 0.94, 1, 'grow');                      // spire
    };
    [[0, 0, 2.2, 2.2, 14, 0], [-3.4, -1, 1.6, 1.6, 9, 1], [3.2, -0.8, 1.8, 1.8, 11, 1.6], [-1.7, 2.2, 1.4, 1.4, 6, 2.4], [1.9, 2.4, 1.5, 1.5, 7, 2.8]].forEach((a) => tower(...a));
    piece(0.1, 9, 0.1, M.sky, 1.5, 0, 1.3, 0.3, 0.1, 0.5, 'grow');                                  // crane mast
    const jib = new THREE.Group(); jib.position.set(1.5, 9, 1.3); jib.visible = false;
    const jb = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.1, 0.1), M.sky); jb.position.x = 1.2;
    const cw = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.3), M.con); cw.position.x = -1.2;
    const rope = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.6, 0.02), M.con); rope.position.set(2.5, -0.8, 0);
    jib.add(jb, cw, rope); world.add(jib);
    const grid = new THREE.GridHelper(16, 32, 0x6cc6f0, 0xcfe6f4); grid.material.transparent = true; world.add(grid);
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const sun = new THREE.DirectionalLight(0xffffff, 2.4); sun.position.set(6, 12, 8); scene.add(sun);
    const fill = new THREE.PointLight(0x6cc6f0, 30, 40); fill.position.set(-6, 4, 6); scene.add(fill);

    const m = { x: 0, tx: 0 };
    const onMove = (e) => { m.tx = (e.clientX / innerWidth - 0.5) * 2; };
    window.addEventListener('pointermove', onMove, { passive: true });
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight, side = w > 900;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      world.position.set(side ? 3.4 : 0, -3.6, 0); world.scale.setScalar(side ? 1 : 0.72);
    };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(el);
    const slow = reduced() ? 0 : 1, ease = (p) => 1 - Math.pow(1 - p, 3), clock = new THREE.Clock();
    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const t = slow ? clock.getElapsedTime() : 99;
      m.x += (m.tx - m.x) * 0.05;
      grid.material.opacity = Math.min(1, t / 1.2);
      parts.forEach((p) => {
        const k = Math.min(1, Math.max(0, ((t - p.off) / 7 - p.s) / (p.e - p.s))), e = ease(k);
        p.o.visible = k > 0;
        if (p.kind === 'grow') p.o.scale.y = Math.max(e, 0.001); else p.o.position.y = p.y0 + (1 - e) * 3.5;
      });
      jib.visible = t > 4; jib.scale.setScalar(ease(Math.min(1, Math.max(0, t - 4)))); jib.rotation.y = t * 0.4 * (slow || 0.1);
      world.rotation.y = -0.6 + t * 0.04 * slow + m.x * 0.25;
      renderer.render(scene, camera);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove);
      scene.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.(); });
      env.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  return <div className="scene" ref={ref} aria-hidden="true" />;
}

/* ───────── Master plan: 3D plots that rise, ripple under the pointer and tilt ───────── */
export function PlotField() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let renderer, env;
    try { ({ renderer, env } = makeRenderer(el)); } catch { return; }
    const scene = new THREE.Scene();
    scene.environment = env;
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 10.5, 12.5); camera.lookAt(0, 0, 0);

    const COLS = 18, ROWS = 11;
    const cells = [];
    for (let i = 0; i < COLS; i++) for (let j = 0; j < ROWS; j++) {
      if (i === 6 || i === 12 || j === 5) continue; // internal roads between phases and blocks
      cells.push([i, j]);
    }
    const box = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.55, roughness: 0.32, envMapIntensity: 1.2 });
    const mesh = new THREE.InstancedMesh(box, mat, cells.length);
    const phase = [new THREE.Color(0x1f9fdc), new THREE.Color(0x6cc6f0), new THREE.Color(0xd1283b)];
    const dummy = new THREE.Object3D();
    cells.forEach(([i], k) => mesh.setColorAt(k, phase[i < 6 ? 0 : i < 12 ? 1 : 2].clone().multiplyScalar(0.75 + Math.random() * 0.3)));
    const world = new THREE.Group();
    world.add(mesh);

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(COLS + 1, 0.2, ROWS + 1),
      new THREE.MeshStandardMaterial({ color: 0xdcedf8, metalness: 0.1, roughness: 0.7 })
    );
    base.position.y = -0.12;
    world.add(base);
    const grid = new THREE.GridHelper(COLS + 1, COLS + 1, 0x6cc6f0, 0xc9e3f2);
    grid.position.y = -0.01; grid.material.transparent = true; grid.material.opacity = 0.35;
    world.add(grid);
    scene.add(world);
    scene.add(new THREE.AmbientLight(0x6fa6c8, 0.6));
    const sun = new THREE.DirectionalLight(0xcfeaff, 2.2); sun.position.set(-6, 10, 5); scene.add(sun);

    const ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const ptr = new THREE.Vector2(9, 9), hit = new THREE.Vector3(99, 0, 99);
    const m = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      m.tx = ptr.x; m.ty = ptr.y;
    };
    const onLeave = () => { m.tx = 0; m.ty = 0; hit.set(99, 0, 99); ptr.set(9, 9); };
    el.addEventListener('pointermove', onMove); el.addEventListener('pointerleave', onLeave);

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h;
      camera.position.set(0, 10.5, w < 600 ? 22 : 12.5 + (w / h < 1.4 ? 5 : 0));
      camera.lookAt(0, 0, 0); camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();

    let visible = false, started = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !started) started = performance.now(); }, { threshold: 0.2 });
    io.observe(el);
    const slow = reduced() ? 0 : 1;
    let raf;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const t = now / 1000, grow = Math.min(1, (now - started) / 2200);
      m.x += (m.tx - m.x) * 0.06; m.y += (m.ty - m.y) * 0.06;
      world.rotation.y = -0.35 + m.x * 0.22 + Math.sin(t * 0.25) * 0.05 * slow;
      world.rotation.x = m.y * 0.06;
      ray.setFromCamera(ptr, camera);
      if (ray.ray.intersectPlane(plane, hit) === null) hit.set(99, 0, 99);
      else world.worldToLocal(hit);
      cells.forEach(([i, j], k) => {
        const x = i - COLS / 2 + 0.5, z = j - ROWS / 2 + 0.5;
        const d = Math.hypot(x - hit.x, z - hit.z);
        const lift = Math.exp(-d * d / 4) * 1.5;
        const delay = Math.min(1, Math.max(0, grow * 1.8 - (i + j) / (COLS + ROWS) * 0.8));
        const e = 1 - Math.pow(1 - delay, 3);
        const h = (0.18 + 0.06 * Math.sin(t * 1.4 * slow + i * 0.7 + j * 0.5)) * e + lift * e + (i < 6 ? 0.1 : 0);
        dummy.position.set(x, h / 2, z);
        dummy.scale.set(0.84, Math.max(h, 0.001), 0.84);
        dummy.updateMatrix();
        mesh.setMatrixAt(k, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave);
      scene.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.(); });
      env.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  return <div className="scene plotfield" ref={ref} role="img" aria-label="Illustrative 3D plot layout in three phases" />;
}
