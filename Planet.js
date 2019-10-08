let mainTxt = document.getElementById("Aarde_H1");


let moveToEarth = false;
let moveToMoon = false;
let isZoomedOut = true;
let moveToSaturn = false;
let moveToJupiter = false;
let moveToVenus = false;
let moveToMercurius = false;
let moveToMars = false;
let setupValues = true;

let countMercRing = 0;

let goToRotX;//DIT MOET MISCHIEN WEG:kjljdLKFJ;LKSJFLK;
let goToRotY;
let goToRotZ;

let hoekZon;
let hoekMercurius;
let hoekVenus;
let hoekMars;
let hoekJupiter;
let hoekSaturnus;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
scene.add(camera);

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();



var light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(1,0,0);
scene.add(light1);
var light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(0,0,1);
scene.add(light2);
var light3 = new THREE.DirectionalLight(0xffffff, 1);
light3.position.set(-1,0,0);
scene.add(light3);
var light4 = new THREE.DirectionalLight(0xffffff, 1);
light4.position.set(0,0,-1);
scene.add(light4);
var light5 = new THREE.DirectionalLight(0xffffff, 1);
light5.position.set(0,1,0);
scene.add(light5);
var light6 = new THREE.DirectionalLight(0xffffff, 1);
light6.position.set(0,-1,0);
scene.add(light6);


let geometry_ringMercurius = new THREE.TorusGeometry(10,.2, 128,128, countMercRing);
let material_ringMercurius = new THREE.MeshBasicMaterial({color: 0x3aa6c5, opacity: 0.3, transparent: true})
let ringMercurius = new THREE.Mesh(geometry_ringMercurius, material_ringMercurius);
scene.add(ringMercurius);
ringMercurius.rotateX(Math.PI / 2)

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

let geometry_zon = new THREE.SphereGeometry( 3, 256, 256 );
let material_zon = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Sun.jpg'), bumpMap: THREE.ImageUtils.loadTexture('Img/Sun.jpg'), bumpScale: 0.5});
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

let geometry_sterren = new THREE.SphereGeometry(90, 32, 32);
let material_sterren = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('Img/Starfield.jpg'),side: THREE.BackSide });
let sterren = new THREE.Mesh( geometry_sterren, material_sterren );
sterren.naam = "sterren"
scene.add(sterren);

let jupiter_rotator = new THREE.Mesh(mercury_rotator_geo, mercury_rotator_mat);
mars_rotator.naam = "Jupiter_rotator"
scene.add(jupiter_rotator)

let saturnus_rotator = new THREE.Mesh(mercury_rotator_geo, mercury_rotator_mat);
saturnus_rotator.naam = "Saturnus_rotator"
scene.add(saturnus_rotator)

let geometry = new THREE.SphereGeometry( 1, 256, 256 );
let material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Earth.jpg'),bumpMap: THREE.ImageUtils.loadTexture('Img/Earth_Bumpmap.jpg'), bumpScale: 0.5} );
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
let material_mercurius = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Mercury.jpg'), bumpMap: THREE.ImageUtils.loadTexture('Img/Mercury.jpg'), bumpScale: 0.5});
let mercurius = new THREE.Mesh( geometry_mercurius, material_mercurius);
mercurius.naam = "mercury";
scene.add(mercurius);


let geometry_venus = new THREE.SphereGeometry( 1, 256, 256 );
let material_venus = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Venus.png'), bumpMap: THREE.ImageUtils.loadTexture('Img/Venus.png'), bumpScale: 0.5});
let venus = new THREE.Mesh( geometry_venus, material_venus);
venus.naam = "Venus";
scene.add(venus);

let geometry_mars = new THREE.SphereGeometry( 0.8, 256, 256 );
let material_mars = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Mars.jpg'), bumpMap: THREE.ImageUtils.loadTexture('Img/Mars.jpg'), bumpScale: 0.5});
let mars = new THREE.Mesh( geometry_mars, material_mars);
mars.naam = "Mars";
scene.add(mars)
mars.position.z = 30;

let geometry_jupiter = new THREE.SphereGeometry( 2, 256, 256 );
let material_jupiter = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Jupiter.jpg'), bumpMap: THREE.ImageUtils.loadTexture('Img/Jupiter.jpg'), bumpScale: 0.5});
let jupiter = new THREE.Mesh( geometry_jupiter, material_jupiter);
jupiter.naam = "Jupiter";
scene.add(jupiter)
jupiter.position.z = 40;

let geometry_saturnus = new THREE.SphereGeometry( 2, 256, 256 );
let material_saturnus = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Img/Saturnus.jpg')});
let saturnus = new THREE.Mesh( geometry_saturnus, material_saturnus);
saturnus.naam = "Saturn";
scene.add(saturnus);
saturnus.position.z = 45;


let geometry_rings = new THREE.TorusGeometry(3 , 0.6, 2 , 256);
let material_rings = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('Img/SaturnusRing.jpg')})
let saturnus_rings = new THREE.Mesh(geometry_rings, material_rings);
saturnus.add(saturnus_rings);
saturnus_rings.rotateX(Math.PI / 2)

camera.position.y = 100;
camera.position.z = 10;
camera.lookAt(zon.position);




//TWEEN





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
                moveToMercurius = true;

            }else if(intersects[i].object.naam == "sun"){
                console.log("Zon")
            }
        }        
    }
}

var lookAtTarget = [new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0)]
let animate = function () {
    requestAnimationFrame( animate );

    saturnus.rotation.y += 1/1000;
    mercury_rotator.rotation.y += /*1/800*/ 1/50;
    venus_rotator.rotation.y += /*1/2250*/ 1/100;
    mars.rotation.y += 1/400;
    //if(hoek <=10){
    zon.rotation.y += /*3650*/ 1/225;
    //}
    aarde.rotation.y += /*1 / 240*/ 1/175;
    wolken.rotation.y += 0.002;
    maan.rotation.y -= /*1 / 240*/ 1/ 175;
    
    mars_rotator.rotation.y += /*1 / 6780*/ 1/250;
    jupiter_rotator.rotation.y += /*1/43800*/ 1/350;
    saturnus_rotator.rotation.y += /*1/105850*/ 1 / 600;
    sterren.rotation.x += 0.0001;
    sterren.rotation.y += 0.0001;
    sterren.rotation.z += 0.0001;
    
    hoekZon = THREE.Math.radToDeg(zon.rotation.y);
    hoekMercurius = THREE.Math.radToDeg(mercury_rotator.rotation.y) % 360;
    hoekVenus = THREE.Math.radToDeg(venus_rotator.rotation.y) % 360;
    hoekMars = THREE.Math.radToDeg(mars_rotator.rotation.y) % 360;
    hoekJupiter = THREE.Math.radToDeg(jupiter_rotator.rotation.y) % 360;
    hoekSaturnus = THREE.Math.radToDeg(saturnus_rotator.rotation.y) % 360;
    
    
    countMercRing += 0.0001;
    //console.log(countMercRing);
    
    //console.log(vectorMoon);
    
    
    //console.log(vectorMoon.setFromMatrixPosition( scene.matrixWorld ));

    if(moveToEarth){
        /*
        let xDifference = camera.position.x - aarde.position.x;
        let yDifference = camera.position.y - aarde.position.y;
        let zDifference = camera.position.z - aarde.position.z - 3;
        camera.position.x -= xDifference/90;
        camera.position.y -= yDifference/90;
        camera.position.z -= zDifference/90;
        camera.lookAt(aarde.position);
        //console.log(zDifference);
        if(zDifference < 2){
            document.getElementById('Aarde_H1').style.opacity = '1';    
        }
        if(zDifference < 1){
            document.getElementById('Aarde_P').style.opacity = '1';
            isZoomedOut = false;
            moveToEarth = false;
        }*/
        //let goToRot;
        //let goFromRotX = camera.rotation.x;
        //let goFromRotY = camera.rotation.y;
        //let goFromRotZ = camera.rotation.z;
        //if(setupValues == true){
          //  camera.position.x = aarde.position.x;
            //camera.position.y = aarde.position.y + 2;
            //camera.position.z = aarde.position.z + 4;
            //camera.lookAt(aarde.position);
            //goToRotX = camera.rotation.x;
            //goToRotY = camera.rotation.y;
            //console.log(goToRotY);
            //goToRotZ = camera.rotation.z;
            //camera.position.x = zon.position.x;
            //camera.position.y = 100;
            //camera.position.z = 10;
            //camera.lookAt(zon.position);
            //setupValues = false;
        //}
        //goToRotY = camera.rotation.y;
        //console.log(goToRotY);
        //let rotDifX =  goFromRotX - goToRotX;
        //let rotDifY = goFromRotY - goToRotY;
        //let rotDifZ = goFromRotZ - goToRotZ;
        //console.log(camera.rotation);
        //console.log(goToRotX);
        let xDifference = camera.position.x - aarde.position.x;
        let yDifference = camera.position.y - aarde.position.y - 2;
        let zDifference = camera.position.z - aarde.position.z - 4;
        camera.position.x -= xDifference/90;
        camera.position.y -= yDifference/90;
        camera.position.z -= zDifference/90;
        //------------------

        lookAtTarget[1].x = lookAtTarget[0].x +15- (lookAtTarget[0].x - lookAtTarget[1].x)*0.002
        lookAtTarget[1].y = lookAtTarget[0].y + 15-(lookAtTarget[0].y - lookAtTarget[1].y)*0.002
        lookAtTarget[1].z = lookAtTarget[0].z + 15-(lookAtTarget[0].z - lookAtTarget[1].z)*0.002
        //------------------
        //camera.rotation.x -= rotDifX / 90;
        //camera.rotation.y -= rotDifY / 90;
        //camera.rotation.z -= rotDifZ / 90;
        
        //camera.position.x = aarde.position.x;
        //camera.position.y = 2;
        //camera.position.z = aarde.position.z + 4;
        //camera.lookAt(aarde.position);
        isZoomedOut = false;
        camera.lookAt(lookAtTarget[1]);
    }
    if(!moveToEarth){/*//dit is niet alleen van move from earth, maar eigenlijk van elke planeet. Dit reset de camera
        document.getElementById('Aarde_H1').style.opacity = '0';
        document.getElementById('Aarde_P').style.opacity = '0';
        let xDifference = camera.position.x + aarde.position.x;
        let yDifference = 5
        let zDifference = 10
        camera.position.x += xDifference/90;
        camera.position.y += yDifference/90;
        camera.position.z += zDifference/90;
        camera.lookAt(aarde.position);
        //if(camera.position.z > 10){
          //  moveFromEarth = false;
            //isZoomedOut = true;
        //}
    */
        camera.position.x = zon.position.x;
        camera.position.y = 100;
        camera.position.z = 10
        camera.lookAt(zon.position)
    }
    
    if(moveToMars){
        /*let goFromRot;
        let goToRot;*/
        camera.position.x = mars.position.x;
        camera.position.y = 2;
        camera.position.z = mars.position.z + 4;
        camera.lookAt(mars.position);
        /*if(setupValues == true){
            goFromRot = camera.rotation.x;
            camera.lookAt(mars.position);
            goToRot = camera.rotation.x;
            camera.lookAt(zon.position);
            setupValues = false;
            console.log("D")
        }
        rotDif = goToRot - goFromRot;
        camera.position.x += */
        //camera.rotation.x += (goFromRot - goToRot) / 600000000;
        
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
    
    //console.log(maan.localToWorld(maan.position));
    if(moveToSaturn){
        camera.position.x = saturnus.position.x;
        camera.position.y = 2;
        camera.position.z = saturnus.position.z + 10;
        camera.lookAt(saturnus.position);
    }
    
    if(moveToMoon){
        console.log(maan.position);
        camera.position.x = maan.position.x;
        camera.position.y = 2;
        camera.position.z = maan.position.z + 4;
        camera.lookAt(maan.position);
        
        //maan.geometry.computeBoundingSphere();
        //var vector = maan.geometry.center;
        //camera.lookAt(vector);d
        //console.log("lll");
        //console.log(maan.localToWorld(maan.position));
        //hier bij het converten van local naar world gaat het ergens helemaal fout
        //vanaf hier uitzoeken wat er nou precies fout gaat!!!
        //?!!?!?!?!?!?!?!??!?!?!!??!?!?/!?!
        //let moonPos = maan.localToWorld(maan.position);
//        lookAtMoon = new THREE.Vector3(maan.position);
        
        //aarde.localToWorld(maan.position);
        //camera.lookAt(maan.position);
        //scene.position.copy(maan);
        //scene.add(maan);
        
        //let xDifference = camera.position.x - maan.position.x;
        //let yDifference = camera.position.y - maan.position.y;
        //let zDifference = camera.position.z - maan.position.z - 3;
        //camera.position.x -= xDifference/90;
        //camera.position.y -= yDifference/90;
        //camera.position.z -= zDifference/90;
       // camera.lookAt(aarde.position);
        //console.log(zDifference);
    }
    
    //console.log(5 * Math.sin(hoek2)) ;
    //console.log(5 * Math.cos(hoek2));
    
    aarde.position.x = 24 * Math.sin(THREE.Math.degToRad(hoekZon));
    aarde.position.z = 24 * Math.cos(THREE.Math.degToRad(hoekZon));
    aarde.position.y = 0;
    
    

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
        mainTxt.innerHTML = "HET ZONNESTELSEL";
    }
})

animate();

