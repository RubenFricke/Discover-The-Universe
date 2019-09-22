let moveToEarth = false;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
scene.add(camera);

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//////
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


let bol = new THREE.Mesh(geometry, material_wolken);
//scene.add(bol);
bol.position.z = 3;
bol.naam = 'bol'

camera.position.y = 5;
camera.position.z = 10;
camera.lookAt(aarde.position);

///////////
function onMouseClick( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );
    if(intersects.length > 0){
        //if(intersects[1].object.naam == "earth"){
          //  console.log("djklajslk;jflk;asjfkl;asjfkl;sajfl;aj;fal")
        //}
        for(var i = 0; i < intersects.length; i++){
            if(intersects[i].object.naam == "earth"){
                
                let moveToEarthPosition = new THREE.Vector3(aarde.position.x, aarde.position.y, aarde.position.z - 3);    
                moveToEarth = true;
            }
        }        
    }
}


let animate = function () {
    requestAnimationFrame( animate );

    aarde.rotation.y += 0.003;
    wolken.rotation.y += 0.002;

    
    //
    if(moveToEarth){
        //let moveToPositionEarth.x = aarde.position.x;
        //let moveToPositionEarth.y = aarde.position.y;
        //let moveToPositionEarth.z = aarde.position.z + 3;
        
        var timesCameraMoved = 0;
                if(timesCameraMoved == 60){
            //moveToEarth=false;
        }
        
        let xDifference = camera.position.x - aarde.position.x;
        let yDifference = camera.position.y - aarde.position.y;
        let zDifference = camera.position.z - aarde.position.z - 3;
        camera.position.x -= xDifference/60;
        camera.position.y -= yDifference/60;
        camera.position.z -= zDifference/60;
        timesCameraMoved++;
        camera.lookAt(aarde.position);

        
    }
    

    renderer.render( scene, camera );
};

window.addEventListener( 'click', onMouseClick, false );

animate();

