let mainTxt = document.getElementById("Aarde_H1");

let lightDensity = .08;


let moveToEarth = false;
let moveToMoon = false;
let isZoomedOut = true;
let moveToSaturn = false;
let moveToJupiter = false;
let moveToVenus = false;
let moveToMercurius = false;
let moveToNeptune = false;
let moveToUranus = false;
let moveToMars = false;
let setupValues = true;

let countMercRing = 0;

let goToRotX;//DIT MOET MISCHIEN WEG:kjljdLKFJ;LKSJFLK;
let goToRotY;
let goToRotZ;

let hoekZon;
let hoekMercurius;
let hoekVenus;
let hoekUranus;
let hoekMars;
let hoekJupiter;
let hoekSaturnus;
let hoekNeptunus;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
scene.add(camera);

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

/*_______________
De lichten rondom de zon
________________*/

var light1 = new THREE.PointLight(0xffffff, lightDensity);
light1.position.set(5,0,0);
scene.add(light1);
var light2 = new THREE.PointLight(0xffffff, lightDensity);
light2.position.set(0,0,5);
scene.add(light2);
var light3 = new THREE.PointLight(0xffffff, lightDensity);
light3.position.set(-5,0,0);
scene.add(light3);
var light4 = new THREE.PointLight(0xffffff, lightDensity);
light4.position.set(0,0,-5);
scene.add(light4);
var light5 = new THREE.PointLight(0xffffff, lightDensity);
light5.position.set(0,5,0);
scene.add(light5);
var light6 = new THREE.PointLight(0xffffff, lightDensity);
light6.position.set(0,-5,0);
scene.add(light6);
var light7 = new THREE.PointLight(0xffffff, lightDensity);
light7.position.set(5,5,0);
scene.add(light7);
var light8 = new THREE.PointLight(0xffffff, lightDensity);
light8.position.set(0,5,5);
scene.add(light8);
var light9 = new THREE.PointLight(0xffffff, lightDensity);
light9.position.set(5,0,5);
scene.add(light9);
var light10 = new THREE.PointLight(0xffffff, lightDensity);
light10.position.set(-5,-5,0);
scene.add(light10);
var light11 = new THREE.PointLight(0xffffff, lightDensity);
light11.position.set(0,-5,-5);
scene.add(light11);
var light12 = new THREE.PointLight(0xffffff, lightDensity);
light12.position.set(-5,0,-5);
scene.add(light12);
var light13 = new THREE.PointLight(0xffffff, lightDensity);
light13.position.set(5,-5,0);
scene.add(light13);
var light14 = new THREE.PointLight(0xffffff, lightDensity);
light14.position.set(0,5,-5);
scene.add(light14);
var light15 = new THREE.PointLight(0xffffff, lightDensity);
light15.position.set(5,0,-5);
scene.add(light15);
var light16 = new THREE.PointLight(0xffffff, lightDensity);
light16.position.set(-5,5,0);
scene.add(light16);
var light17 = new THREE.PointLight(0xffffff, lightDensity);
light17.position.set(0,-5,5);
scene.add(light17);
var light18 = new THREE.PointLight(0xffffff, lightDensity);
light18.position.set(-5,0,5);
scene.add(light18);

let geometry_ringMercurius = new THREE.TorusGeometry(10,.2, 128,128, countMercRing);
let material_ringMercurius = new THREE.MeshBasicMaterial({color: 0x3aa6c5, opacity: 0.3, transparent: true})
let ringMercurius = new THREE.Mesh(geometry_ringMercurius, material_ringMercurius);
scene.add(ringMercurius);
ringMercurius.rotateX(Math.PI / 2)

let geometry_ringNeptunus = new THREE.TorusGeometry(80, .2,256, 256);
let ringNeptunus = new THREE.Mesh(geometry_ringNeptunus, material_ringMercurius);
scene.add(ringNeptunus);
ringNeptunus.rotateX(Math.PI / 2);

let geometry_ringVenus = new THREE.TorusGeometry(16, .2,256, 256);
let ringVenus = new THREE.Mesh(geometry_ringVenus, material_ringMercurius);
scene.add(ringVenus);
ringVenus.rotateX(Math.PI / 2);

let geometry_ringAarde = new THREE.TorusGeometry(24, .2,256, 256);
let ringAarde = new THREE.Mesh(geometry_ringAarde, material_ringMercurius);
scene.add(ringAarde);
ringAarde.rotateX(Math.PI / 2);

let geometry_ringMars = new THREE.TorusGeometry(30, .2,256, 256);
let ringMars = new THREE.Mesh(geometry_ringMars, material_ringMercurius);
scene.add(ringMars);
ringMars.rotateX(Math.PI / 2);

let geometry_ringJupiter = new THREE.TorusGeometry(40, .2,256, 256);
let ringJupiter = new THREE.Mesh(geometry_ringJupiter, material_ringMercurius);
scene.add(ringJupiter);
ringJupiter.rotateX(Math.PI / 2);

let geometry_ringSaturnus = new THREE.TorusGeometry(60, .2,256, 256);
let ringSaturnus = new THREE.Mesh(geometry_ringSaturnus, material_ringMercurius);
scene.add(ringSaturnus);
ringSaturnus.rotateX(Math.PI / 2);

let geometry_ringUranus = new THREE.TorusGeometry(70, .2,256, 256);
let ringUranus = new THREE.Mesh(geometry_ringUranus, material_ringMercurius);
scene.add(ringUranus);
ringUranus.rotateX(Math.PI / 2);

let geometry_zon = new THREE.SphereGeometry( 3, 256, 256 );
let material_zon = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('Img/Sun.jpg'), bumpMap: THREE.ImageUtils.loadTexture('Img/Sun.jpg'), bumpScale: 0.1});
let zon = new THREE.Mesh( geometry_zon, material_zon);
zon.naam = "sun";
scene.add(zon);

let mercury_rotator_geo = new THREE.SphereGeometry(1, 3, 3);
let mercury_rotator_mat = new THREE.Color( 0xff0000);
let mercury_rotator = new THREE.Mesh(mercury_rotator_geo, mercury_rotator_mat);
mercury_rotator.naam = "Mercury_rotator"
scene.add(mercury_rotator)

let venus_rotator = new THREE.Mesh(mercury_rotator_geo, mercury_rotator_mat);
venus_rotator.naam = "Venus_rotator"
scene.add(venus_rotator)

let mars_rotator = new THREE.Mesh(mercury_rotator_geo, mercury_rotator_mat);
mars_rotator.naam = "Mars_rotator"
scene.add(mars_rotator)

let uranus_rotator = new THREE.Mesh(mercury_rotator_geo, mercury_rotator_mat);
uranus_rotator.naam = "Uranus_rotator"
scene.add(uranus_rotator);

let geometry_sterren = new THREE.SphereGeometry(140, 256, 256);
let material_sterren = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('Img/Starfield.jpg'),side: THREE.BackSide });
let sterren = new THREE.Mesh( geometry_sterren, material_sterren );
sterren.naam = "sterren"
scene.add(sterren);

let jupiter_rotator = new THREE.Mesh(mercury_rotator_geo, mercury_rotator_mat);
jupiter_rotator.naam = "Jupiter_rotator"
scene.add(jupiter_rotator)

let neptunus_rotator = new THREE.Mesh(mercury_rotator_geo, mercury_rotator_mat);
neptunus_rotator.naam = "Neptunus_rotator"
scene.add(neptunus_rotator)

let saturnus_rotator = new THREE.Mesh(mercury_rotator_geo, mercury_rotator_mat);
saturnus_rotator.naam = "Saturnus_rotator"
scene.add(saturnus_rotator)

let geometry = new THREE.SphereGeometry( 1, 256, 256 );
let material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Earth.jpg'),bumpMap: THREE.ImageUtils.loadTexture('Img/Earth_Bumpmap.jpg'), bumpScale: 0.2} );
let aarde = new THREE.Mesh( geometry, material );
aarde.naam = "earth";
//aarde.position.z = 24;
scene.add( aarde );

let geometry_maan = new THREE.SphereGeometry ( 0.2,256,256 );
let material_maan = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('Img/Moon.jpg'),bumpMap: THREE.ImageUtils.loadTexture('Img/Moon.jpg'), bumpScale: 0.1});
let maan = new THREE.Mesh( geometry_maan, material_maan);
maan.naam = "moon";
aarde.add(maan);
maan.position.z = 3;

let geometry_wolken = new THREE.SphereGeometry( 1.005,128,128 ); 
let material_wolken = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('Img/Earth_cloud.png'),transparent: true});
let wolken = new THREE.Mesh( geometry_wolken, material_wolken );
wolken.naam = "clouds";
aarde.add(wolken);

let geometry_mercurius = new THREE.SphereGeometry( 1, 256, 256 );
let material_mercurius = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Mercury.jpg'), bumpMap: THREE.ImageUtils.loadTexture('Img/Mercury.jpg'), bumpScale: 0.05});
let mercurius = new THREE.Mesh( geometry_mercurius, material_mercurius);
mercurius.naam = "mercury";
scene.add(mercurius);


let geometry_venus = new THREE.SphereGeometry( 1, 256, 256 );
let material_venus = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Venus.png'), bumpMap: THREE.ImageUtils.loadTexture('Img/Venus.png'), bumpScale: 0.05});
let venus = new THREE.Mesh( geometry_venus, material_venus);
venus.naam = "Venus";
scene.add(venus);

let geometry_mars = new THREE.SphereGeometry( 0.8, 256, 256 );
let material_mars = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Mars.jpg'), bumpMap: THREE.ImageUtils.loadTexture('Img/Mars.jpg'), bumpScale: 0.05});
let mars = new THREE.Mesh( geometry_mars, material_mars);
mars.naam = "Mars";
scene.add(mars)
mars.position.z = 30;

let geometry_jupiter = new THREE.SphereGeometry( 2, 256, 256 );
let material_jupiter = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Jupiter.jpg'), bumpMap: THREE.ImageUtils.loadTexture('Img/Jupiter.jpg'), bumpScale: 0.05});
let jupiter = new THREE.Mesh( geometry_jupiter, material_jupiter);
jupiter.naam = "Jupiter";
scene.add(jupiter)
jupiter.position.z = 40;

let geometry_saturnus = new THREE.SphereGeometry( 2, 256, 256 );
let material_saturnus = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Saturnus.jpg'), bumpMap: THREE.ImageUtils.loadTexture('Img/Saturnus.jpg'), bumpScale: 0.05});
let saturnus = new THREE.Mesh( geometry_saturnus, material_saturnus);
saturnus.naam = "Saturn";
scene.add(saturnus);
saturnus.position.z = 45;

let geometry_neptunus = new THREE.SphereGeometry ( 1.5,256,256 );
let material_neptunus = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('Img/Neptunus.jpg'), bumpMap: THREE.ImageUtils.loadTexture('Img/Neptunus.jpg'), bumpScale: 0.05});
let neptunus = new THREE.Mesh( geometry_neptunus, material_neptunus);
neptunus.naam = "Neptune";
scene.add(neptunus);
neptunus.position.z = 50;


let geometry_rings = new THREE.TorusGeometry(3 , 0.6, 2 , 256);
let material_rings = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('Img/SaturnusRing.jpg')})
let saturnus_rings = new THREE.Mesh(geometry_rings, material_rings);
saturnus.add(saturnus_rings);
saturnus_rings.rotateX(Math.PI / 2)


let geometry_uranus = new THREE.SphereGeometry ( 1.5,256,256 );
let material_uranus = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('Img/Uranus.jpg'), bumpMap: THREE.ImageUtils.loadTexture('Img/Uranus.jpg'), bumpScale: 0.05});
let uranus = new THREE.Mesh( geometry_uranus, material_uranus);
uranus.naam = "Uranus";
scene.add(uranus);


camera.position.y = 100;
camera.position.z = 10;
camera.lookAt(zon.position);

function onMouseClick( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children, true );
    if(intersects.length > 0){

        for(var i = 0; i < intersects.length; i++){
            if(intersects[i].object.naam == "earth"){
                mainTxt.innerHTML = "AARDE";
                setupValues = true;
                moveToJupiter = false;
                moveToMoon = false;
                moveToSaturn = false;
                moveToVenus = false;
                moveToMercurius = false;
                moveToMars = false;
                moveToNeptune = false;
                moveToUranus = false;
                moveToEarth = true;
               
                lookAtTarget[1] = aarde.position;               
            }else if(intersects[i].object.naam == "moon"){
                mainTxt.innerHTML = "MAAN";
                setupValues = true;
                moveToJupiter = false;
                moveToEarth = false;
                moveToSaturn = false;
                moveToVenus = false;
                moveToMercurius = false;
                moveToMars = false;
                moveToNeptune = false;
                moveToUranus = false;
                moveToMoon = true;
            }else if(intersects[i].object.naam == "Saturn"){
                mainTxt.innerHTML = "SATURNUS";
                setupValues = true;
                moveToJupiter = false;
                moveToEart = false;
                moveToMoon = false;
                moveToVenus = false;
                moveToMercurius = false;
                moveToMars = false;
                moveToNeptune = false;
                moveToUranus = false;
                moveToSaturn = true;
            }else if(intersects[i].object.naam == "Jupiter"){
                mainTxt.innerHTML = "JUPITER";
                setupValues = true;
                moveToEarth = false;
                moveToMoon = false;
                moveToSaturn = false;
                moveToMercurius = false;
                moveToVenus = false;
                moveToMars = false;
                moveToNeptune = false;
                moveToUranus = false;
                moveToJupiter = true;
            }else if(intersects[i].object.naam == "Mars"){
                mainTxt.innerHTML = "MARS";
                //setupValues = true;
                moveToEarth = false;
                moveToMoon = false;
                moveToSaturn = false;
                moveToJupiter = false;
                moveToMercurius = false;
                moveToVenus = false;
                moveToNeptune = false;
                moveToUranus = false;
                moveToMars = true;
                
            }else if(intersects[i].object.naam == "Venus"){
                mainTxt.innerHTML = "VENUS";
                setupValues = true;
                moveToEarth = false;
                moveToMoon = false;
                moveToSaturn = false;
                moveToJupiter = false;
                moveToMercurius = false;
                moveToMars = false;
                moveToNeptune = false;
                moveToUranus = false;
                moveToVenus = true;
            }else if(intersects[i].object.naam == "mercury"){
                mainTxt.innerHTML = "MERCURIUS";
                setupValues = true;
                moveToEarth = false;
                moveToMoon = false;
                moveToSaturn = false;
                moveToJupiter = false;
                moveToVenus = false;
                moveToMars = false;
                moveToNeptune = false;
                moveToUranus = false;
                moveToMercurius = true;

            }else if(intersects[i].object.naam == "sun"){
                console.log("Zon")
            }else if(intersects[i].object.naam == "Uranus"){
                mainTxt.innerHTML = "URANUS";
                moveToEarth = false;
                moveToMoon = false;
                moveToSaturn = false;
                moveToJupiter = false;
                moveToVenus = false;
                moveToMars = false;
                moveToNeptune = false;
                moveToMercurius = false;
                moveToUranus = true;
            }else if(intersects[i].object.naam == "Neptune"){
                mainTxt.innerHTML = "NEPTUNUS";
                moveToEarth = false;
                moveToMoon = false;
                moveToSaturn = false;
                moveToJupiter = false;
                moveToVenus = false;
                moveToMars = false;
                moveToMercurius = false;
                moveToUranus = false;
                moveToNeptune = true;
            }
        }        
    }
}

var lookAtTarget = [new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0)]
let animate = function () {
    requestAnimationFrame( animate );

    neptunus_rotator.rotation.y += 1/800;
    neptunus.rotation.y += 1/800;
    saturnus_rotator.rotation.y += /*1/105850*/ 1 / 600;
    saturnus.rotation.y += 1/1000;
    uranus_rotator.rotation.y += 1/700;
    uranus.rotation.y += 1/700;
    mercury_rotator.rotation.y += /*1/800*/ 1/50;
    mercurius.rotation.y += 1/200;
    venus_rotator.rotation.y += /*1/2250*/ 1/100;
    venus.rotation.y += 1/300;
    mars.rotation.y += 1/500;
    //if(hoek <=10){
    zon.rotation.y += /*3650*/ 1/225;
    //}
    aarde.rotation.y += /*1 / 240*/ 1/175;
    wolken.rotation.y += 0.002;
    maan.rotation.y -= /*1 / 240*/ 1/ 175;
    
    mars_rotator.rotation.y += /*1 / 6780*/ 1/250;
    jupiter_rotator.rotation.y += /*1/43800*/ 1/350;

    sterren.rotation.x += 0.0001;
    sterren.rotation.y += 0.0001;
    sterren.rotation.z += 0.0001;
    
    hoekUranus = THREE.Math.radToDeg(uranus_rotator.rotation.y) % 360;
    hoekZon = THREE.Math.radToDeg(zon.rotation.y);
    hoekMercurius = THREE.Math.radToDeg(mercury_rotator.rotation.y) % 360;
    hoekVenus = THREE.Math.radToDeg(venus_rotator.rotation.y) % 360;
    hoekMars = THREE.Math.radToDeg(mars_rotator.rotation.y) % 360;
    hoekJupiter = THREE.Math.radToDeg(jupiter_rotator.rotation.y) % 360;
    hoekSaturnus = THREE.Math.radToDeg(saturnus_rotator.rotation.y) % 360;
    hoekNeptunus = THREE.Math.radToDeg(neptunus_rotator.rotation.y) % 360;
    
    
    countMercRing += 0.0001;


    if(moveToEarth){
        camera.position.x = aarde.position.x;
        camera.position.y = 2;
        camera.position.z = aarde.position.z + 4;
        camera.lookAt(lookAtTarget[1]);
    }
    if(!moveToEarth){
        camera.position.x = zon.position.x;
        camera.position.y = 100;
        camera.position.z = 10
        camera.lookAt(zon.position)
    }
    
    if(moveToMars){

        camera.position.x = mars.position.x;
        camera.position.y = 2;
        camera.position.z = mars.position.z + 4;
        camera.lookAt(mars.position);
    }
    
    if(moveToVenus){
        camera.position.x = venus.position.x;
        camera.position.y = 2;
        camera.position.z = venus.position.z + 4;
        camera.lookAt(venus.position);
    }
    
    if(moveToJupiter){
        camera.position.x = jupiter.position.x;
        camera.position.y = 2;
        camera.position.z = jupiter.position.z + 4;
        camera.lookAt(jupiter.position);
    }
    
    if(moveToMercurius){
        camera.position.x = mercurius.position.x;
        camera.position.y = 2;
        camera.position.z = mercurius.position.z + 4;
        camera.lookAt(mercurius.position);
    }
    
    if(moveToSaturn){
        camera.position.x = saturnus.position.x;
        camera.position.y = 2;
        camera.position.z = saturnus.position.z + 10;
        camera.lookAt(saturnus.position);
    }

    if(moveToNeptune){
        camera.position.x = neptunus.position.x;
        camera.position.y = 2;
        camera.position.z = neptunus.position.z + 5;
        camera.lookAt(neptunus.position);
    }

    if(moveToUranus){
        camera.position.x = uranus.position.x;
        camera.position.y = 2;
        camera.position.z = uranus.position.z + 5;
        camera.lookAt(uranus.position);
    }
    
    if(moveToMoon){
        console.log(maan.position);
        camera.position.x = maan.position.x;
        camera.position.y = 2;
        camera.position.z = maan.position.z + 4;
        camera.lookAt(maan.position);
        
    }

    
    aarde.position.x = 24 * Math.sin(THREE.Math.degToRad(hoekZon));
    aarde.position.z = 24 * Math.cos(THREE.Math.degToRad(hoekZon));
    aarde.position.y = 0;
    
    uranus.position.x = 70 * Math.sin(THREE.Math.degToRad(hoekUranus));
    uranus.position.z = 70 * Math.cos(THREE.Math.degToRad(hoekUranus));
    uranus.position.y = 0;

    mercurius.position.x = 10 * Math.sin(THREE.Math.degToRad(hoekMercurius));
    mercurius.position.z = 10 * Math.cos(THREE.Math.degToRad(hoekMercurius));
    mercurius.position.y = 0;
    
    venus.position.x = 16 * Math.sin(THREE.Math.degToRad(hoekVenus));
    venus.position.z = 16 * Math.cos(THREE.Math.degToRad(hoekVenus));
    venus.position.y = 0;
    
    mars.position.x = 30 * Math.sin(THREE.Math.degToRad(hoekMars));
    mars.position.z = 30 * Math.cos(THREE.Math.degToRad(hoekMars));
    mars.position.y = 0;
    
    jupiter.position.x = 40 * Math.sin(THREE.Math.degToRad(hoekJupiter));
    jupiter.position.z = 40 * Math.cos(THREE.Math.degToRad(hoekJupiter));
    jupiter.position.y = 0;
    
    saturnus.position.x = 60 * Math.sin(THREE.Math.degToRad(hoekSaturnus));
    saturnus.position.z = 60 * Math.cos(THREE.Math.degToRad(hoekSaturnus));
    saturnus.position.y = 0;
    
    neptunus.position.x = 80 * Math.sin(THREE.Math.degToRad(hoekNeptunus));
    neptunus.position.z = 80 * Math.cos(THREE.Math.degToRad(hoekNeptunus));
    neptunus.position.y = 0
    
    renderer.render( scene, camera );
};


window.addEventListener( 'click', onMouseClick, false );
window.addEventListener('keydown', function(e){
    if(e.which == 27){
        moveToJupiter = false;
        moveToEarth = false;
        moveToMoon = false;
        moveToSaturn = false;
        moveToVenus = false;
        moveToMercurius = false;
        moveToMars = false;
        moveToUranus = false;
        moveToNeptune = false;
        mainTxt.innerHTML = "HET ZONNESTELSEL";
    }
})

animate();