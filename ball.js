import * as THREE from "three"
import {OrbitControls} from "jsm/controls/OrbitControls.js"
import getStarfield from "./starfield.js"

const height = window.innerHeight
const width = window.innerWidth

const scene = new THREE.Scene()

const canvas = new THREE.WebGLRenderer({ antialias: true})
canvas.setSize(width, height)
document.body.appendChild(canvas.domElement)

const fov = 90
const aspect = width / height
const near = 0.1
const far = 1000

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 3

const geometry = new THREE.IcosahedronGeometry(1, 2)
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})

const meshWire = new THREE.Mesh(geometry, wireMat)
meshWire.scale.setScalar(1.001)
mesh.add(meshWire)

const light = new THREE.HemisphereLight(0x4d4d4d, 0x1e1e1e)
scene.add(light)

const controls = new OrbitControls(camera, canvas.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.03

const stars = getStarfield({ numStars: 2000})
scene.add(stars)

function animate (t = 0) {
    requestAnimationFrame(animate)
    mesh.rotation.x = t * 0.0001
    mesh.rotation.y = t * 0.0001
    canvas.render(scene, camera)
    controls.update()
}

window.addEventListener("resize", () => {
    let w = window.innerWidth
    let h = window.innerHeight

    camera.aspect = w / h
    camera.updateProjectionMatrix()
    canvas.setSize(w, h)
})

animate()
