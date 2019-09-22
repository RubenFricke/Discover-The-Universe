let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

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
//aarde.add(wolken);


let bol = new THREE.Mesh(geometry, material_wolken);
scene.add(bol);
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
        
        for(var i = 0; i < intersects.length; i++){
            console.log(intersects[i]);
            console.log(intersects[i].naam)
            console.log(intersects[ i ].object.naam);
            
            if(intersects[i].naam == "earth"){
            console.log("This doesn't work!")
            aarde.add(wolken);
        }
        }
        
    }
}


let animate = function () {
    requestAnimationFrame( animate );

    aarde.rotation.y += 0.003;
    wolken.rotation.y += 0.002;
    
    //

    

    renderer.render( scene, camera );
};

window.addEventListener( 'click', onMouseClick, false );

animate();

