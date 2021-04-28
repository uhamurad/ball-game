

// let scene, controls, renderer, camera;

//alert("Нажмите на Enter");

var  audio;
var context;
var analyser;
var src;
audio = document.getElementById("audio");


let enterListener = function(event){
	
    //console.log(event);
	
	if (event.code === "Enter") {
		//console.log("Код активирован");
        
        animate();
        gameStatus = 'run';
        audio.play();
	}

/*let oneStep1 = function(){
	console.log(ballMesh.position.z);
	ballMesh.position.z = ballMesh.position.z - 1;
}

for ( var i = 0; i < 101; i++ ) {
	
//setTimeout(oneStep1, 1000);
oneStep1();
sleep(100);
}*/

}
document.addEventListener( "keydown" , enterListener);




// Инициализация объектов сцены и т .п.
init();



let trackMaterial = new THREE.MeshLambertMaterial({ color: '#00FF00'});

let trackGeometry = new THREE.BoxGeometry(10, 1, 100);

let tracksMeshes = Array();

let addTrack = function(x){

    let trackMesh1 = new THREE.Mesh(trackGeometry, trackMaterial);

    trackMesh1.position.x = x;
    trackMesh1.position.y = -0.5;
    trackMesh1.position.z = -50;
    scene.add(trackMesh1);

    tracksMeshes.push(trackMesh1);

}


addTrack(0);
addTrack(-11);
addTrack(11);

//console.log(tracksMeshes);


var ballMaterial = new THREE.MeshLambertMaterial({ color: '#f40a31'/*, wireframe: true*/});

var ballGeometry = new THREE.SphereGeometry(5, 30, 30);

let gameStatus = 'ready'; // 'ready', 'run', 'over'

/*let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

ballMesh.position.x = 0;
ballMesh.position.y = 5;
ballMesh.position.z = -5;


scene.add(ballMesh);*/

let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

var addBall = function () {



ballMesh.position.x = 0;
ballMesh.position.y = 5;
ballMesh.position.z = -5;


scene.add(ballMesh);

}

addBall();



var BoxMaterial = new THREE.MeshLambertMaterial({ color: '#038f8a'/*, wireframe: true*/});

var BoxGeometry = new THREE.BoxGeometry(10, 10, 10);

var BoxMeshes = Array();

let BoxMesh = new THREE.Mesh(BoxGeometry, BoxMaterial);


BoxMesh.position.x = 11;
BoxMesh.position.y = 5;
BoxMesh.position.z = Math.random() * -100;


scene.add(BoxMesh);

let Box1Mesh = new THREE.Mesh(BoxGeometry, BoxMaterial);


Box1Mesh.position.x = -11;
Box1Mesh.position.y = 5;
Box1Mesh.position.z = Math.random() * -100;


scene.add(Box1Mesh);

let Box2Mesh = new THREE.Mesh(BoxGeometry, BoxMaterial);


Box2Mesh.position.x = 0;
Box2Mesh.position.y = 5;
Box2Mesh.position.z = Math.random() * -100;


scene.add(Box2Mesh);

BoxMeshes.push(BoxMesh, Box1Mesh, Box2Mesh);

//console.log(BoxMeshes);

let oneStep = function(){

    /*if (ballMesh.position.z > -100){
        ballMesh.position.z = ballMesh.position.z - 1;
    }*/

    if (tracksMeshes[0].position.z < 51){
        //console.log(tracksMeshes[0].position.z);
        tracksMeshes[0].position.z = tracksMeshes[0].position.z + 1; 
        tracksMeshes[1].position.z = tracksMeshes[1].position.z + 1;
        tracksMeshes[2].position.z = tracksMeshes[2].position.z + 1;
    }


    if (BoxMeshes[0].position.z < 51){
        //console.log(BoxMeshes[0].position.z);
        BoxMeshes[0].position.z = BoxMeshes[0].position.z + 1; 
        BoxMeshes[1].position.z = BoxMeshes[1].position.z + 1;
        BoxMeshes[2].position.z = BoxMeshes[2].position.z + 1;
    }

}

let commonTimer = setInterval(function(){
    if (gameStatus === 'run'){
        oneStep();
    }
    if (gameStatus === 'over'){
        clearInterval(commonTimer)  
        clearInterval(leftRightTimer)
    }
}, 50);


let checkBallHasRightPosition = function(){

    if (ballMesh.position.x < -11 || ballMesh.position.x > 11) {
        alert('DEATH');
        gameStatus = 'over';
    }


}

let leftRightTimer;
let arrowsListener = function(event){

    console.log(gameStatus);	

    if (gameStatus === 'run'){

        if (event.code === 'ArrowLeft'){
            
            //alert('Нажато налево');

            let limitX = ballMesh.position.x - 11;
            leftRightTimer = setInterval(function(){

                ballMesh.position.x = ballMesh.position.x - 1;
                checkBallHasRightPosition();

                if (ballMesh.position.x <= limitX ){
                    clearInterval(leftRightTimer);
                }
            }, 10);

        } else if (event.code === "ArrowRight") {
            
            //alert('Нажато направо');
            
            var limitX = ballMesh.position.x + 11;
            leftRightTimer = setInterval(function(){

                ballMesh.position.x = ballMesh.position.x + 1;
                checkBallHasRightPosition();

                if (ballMesh.position.x >= limitX ){
                    clearInterval(leftRightTimer);
                }


            }, 10);
        }

    }

}
document.addEventListener('keydown', arrowsListener);



// Первоначальный рендер картинки

render();






















