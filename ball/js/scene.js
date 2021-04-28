let scene, controls, renderer, camera;


let init = function () {

//
// Создаём сцену
//

    scene = new THREE.Scene();


//
// Создаём источник света и добавляем его на сцену
//

    // эмбиент свет
    let ALcolor = 0x888888;
    let ALintensity = .2;
    let ALlight = new THREE.AmbientLight(ALcolor, ALintensity);
    scene.add(ALlight);

// создаем свет
    let color = 'white';
    let intensity = 1.5;
    let light = new THREE.DirectionalLight(color, intensity);

// определяем ему положение и направление
    light.position.set(1, 1, 2);
    light.target.position.set(0, 0, 0);

// добавляем его на сцену
    scene.add(light);
    scene.add(light.target);


//
// Создаём камеру
//

// @see https://threejsfundamentals.org/threejs/lessons/resources/frustum-3d.svg

    let cameraFOV = 75;
    let cameraAspect = 2;  // значение для canvas по умолчанию
    let cameraNear = 0.1;
    let cameraFar = 200;
    camera = new THREE.PerspectiveCamera(cameraFOV, cameraAspect, cameraNear, cameraFar);

// определяем камере позицию
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 40;


//
// Создаём рендерер и добавляем в него сцену и камеру
//

    let rendererWidth = 1000;
    let rendererHeight = 500;
    let canvas = document.querySelector('#scene-canvas');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
    renderer.setSize(rendererWidth, rendererHeight, false);


//
// Создаём крутилку
//


    controls = new THREE.OrbitControls(camera, canvas);

    var gridXZ = new THREE.GridHelper(100, 10, new THREE.Color(0xffffff), new THREE.Color(0xffffff));
    scene.add(gridXZ);

    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

}


//
// Функция рендеринга
//

let render = function () {
    renderer.render(scene, camera);
};


let animate = function() {
    controls.update();
    requestAnimationFrame(animate);
    render();
}