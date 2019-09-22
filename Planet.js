let moveToEarth = false;
let moveFromEarth = false;
let isZoomedOut = true;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
scene.add(camera);

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


scene.add(new THREE.AmbientLight(0x333333));

var light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(35,80,0);
scene.add(light);



let geometry = new THREE.SphereGeometry( 1, 256, 256 );
let material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Earth.jpg'),bumpMap: THREE.ImageUtils.loadTexture('Img/Earth_Bumpmap.jpg'), bumpScale: 0.05} );
let aarde = new THREE.Mesh( geometry, material );
aarde.naam = "earth";
scene.add( aarde );

let geometry_wolken = new THREE.SphereGeometry( 1.01,128,128 ); 
let material_wolken = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('Img/Earth_cloud.png'),transparent: true});
let wolken = new THREE.Mesh( geometry_wolken, material_wolken );
wolken.naam = "wolken";
aarde.add(wolken);

camera.position.y = 5;
camera.position.z = 10;
camera.lookAt(aarde.position);

function onMouseClick( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );
    if(intersects.length > 0){

        for(var i = 0; i < intersects.length; i++){
            if(intersects[i].object.naam == "earth"){
                if(isZoomedOut){
                    moveToEarth = true;
                }else if(!isZoomedOut){
                    moveFromEarth = true;
                }
            }
        }        
    }
}


let animate = function () {
    requestAnimationFrame( animate );

    aarde.rotation.y += 0.003;
    wolken.rotation.y += 0.002;

    if(moveToEarth){
        let xDifference = camera.position.x - aarde.position.x;
        let yDifference = camera.position.y - aarde.position.y;
        let zDifference = camera.position.z - aarde.position.z - 3;
        camera.position.x -= xDifference/90;
        camera.position.y -= yDifference/90;
        camera.position.z -= zDifference/90;
        camera.lookAt(aarde.position);
        console.log(zDifference);
        if(zDifference < 2){
            document.getElementById('Aarde_H1').style.opacity = '1';    
        }
        if(zDifference < 1){
            document.getElementById('Aarde_P').style.opacity = '1';
            isZoomedOut = false;
            moveToEarth = false;
        }
    }
    if(moveFromEarth){
        document.getElementById('Aarde_H1').style.opacity = '0';
        document.getElementById('Aarde_P').style.opacity = '0';
        let xDifference = camera.position.x + aarde.position.x;
        let yDifference = 5
        let zDifference = 10
        camera.position.x += xDifference/90;
        camera.position.y += yDifference/90;
        camera.position.z += zDifference/90;
        camera.lookAt(aarde.position);
        if(camera.position.z > 10){
            moveFromEarth = false;
            isZoomedOut = true;
        }
    }
    

    renderer.render( scene, camera );
};

window.addEventListener( 'click', onMouseClick, false );

animate();

