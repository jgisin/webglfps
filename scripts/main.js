$(document).ready(function(){

    var scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFFFFF");
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: '#2194ce',
                                                  wireframe: false} );
    var cubes = new THREE.Object3D();

    for(var i = -10; i < 10; i++){
        var cube = new THREE.Mesh( geometry, material );
        cube.position.set(1 * i, 0, 0);
        cubes.add( cube );
    }
    scene.add( cubes );

    var floorMaterial = new THREE.MeshBasicMaterial( {
        side: THREE.DoubleSide,
        color: "#000000"
    } );
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -1;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    var ceilingMaterial = new THREE.MeshBasicMaterial( {
        side: THREE.DoubleSide,
        color: "#0944a3"
    } );
    var ceilingGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.position.y = 1;
    ceiling.rotation.x = Math.PI / 2;
    scene.add(ceiling);

    camera.position.z = 5;
    var accel = 1;

    var movew   = 0;
    var moved   = 0;
    var moves   = 0;
    var movea   = 0;

    var keyw = false;
    var keyd = false;
    var keys = false;
    var keya = false;

    var mouseX  = 0;
    var mouseY  = 0;

    var lookX   = 0;
    var lookY   = 0;

    $(document).keydown(function(e){
        if (e.keyCode == 87){ //W Up
            keyw = true;
            movew = -0.1 * Math.cos(camera.rotation.y);
            movea = 0 - Math.sin(camera.rotation.y) / 10;
            moved = 0 - Math.sin(camera.rotation.y) / 10;
        }
        if (e.keyCode == 68){ //D Right
            keyd = true;
            moved = 0.1 * Math.cos(camera.rotation.y);
            movew = 0 - Math.sin(camera.rotation.y) / 10;
            moves = 0 - Math.sin(camera.rotation.y) / 10;
        }
        if (e.keyCode == 83){ //S Down
            keys = true;
            moves = 0.1 * Math.cos(camera.rotation.y);
            movea = Math.sin(camera.rotation.y) / 10;
            moved = Math.sin(camera.rotation.y) / 10;
        }
        if (e.keyCode == 65){ //A Left
            keya = true;
            movea = -0.1 * Math.cos(camera.rotation.y);
            movew = Math.sin(camera.rotation.y) / 10;
            moves = Math.sin(camera.rotation.y) / 10;
        }
        if(e.keyCode == 16){
            accel = 2;
        }
    });
    $(document).keyup(function(e){
        if (e.keyCode == 87){ //W Up
            keyw = false;
            movew = 0;
            if(keya == false){
                movea = 0;
            }
            if(keyd == false){
                moved = 0;
            }
        }
        if (e.keyCode == 68){ //D Right
            keyd = false;
            moved = 0;
            if(keyw == false){
                movew = 0;
            }
            if(keys == false){
                moves = 0;
            }
        }
        if (e.keyCode == 83){ //S Down
            keys = false;
            moves = 0;
            if(keya == false){
                movea = 0;
            }
            if(keyd == false){
                moved = 0;
            }
        }
        if (e.keyCode == 65){ //A Left
            keya = false;
            movea = 0;
            if(keyw == false){
                movew = 0;
            }
            if(keys == false){
                moves = 0;
            }
        }
        if(e.keyCode == 16){
            accel = 1;
        }
    });

    $(document).mousemove(function(e){
        if(e.pageX > mouseX){
            lookX = -0.1;
        }
        else if(e.pageX < mouseX){
            lookX = 0.1;
        }
        else{
            lookX = 0;
        }

        if(e.pageY > mouseY && camera.rotation.x > -1){
            lookY = -0.1;
        }
        else if(e.pageY < mouseY && camera.rotation.x < 1){
            lookY = 0.1;
        }
        else{
            lookY = 0;
        }
        mouseX = e.pageX;
        mouseY = e.pageY;
        console.log("X: " + mouseX + " Y: " + mouseY);
        console.log("Camera X: " + camera.rotation.y + " Camera Y: " + camera.rotation.x);
    });

    camera.rotation.order = 'YXZ';
    function render(){
        camera.position.x += ( movea + moved ) * accel;
        camera.position.z += ( movew + moves ) * accel;
        camera.rotation.y += lookX;
        camera.rotation.x += lookY;
        lookX = 0;
        lookY = 0;
   	    requestAnimationFrame( render );
	      renderer.render( scene, camera ); 
    }

    render();
});
