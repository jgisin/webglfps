var SCENE = {
    init: function(){
        SCENE.scene.background = new THREE.Color("#FFFFFF");
        SCENE.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( SCENE.renderer.domElement );

        for(var i = -10; i < 10; i++){
            var cube = new THREE.Mesh( SCENE.geometry, SCENE.material );
            cube.position.set(1 * i, 0, 0);
            SCENE.cubes.add( cube );
        }
        SCENE.scene.add( SCENE.cubes );
        SCENE.floor.position.y = -1;
        SCENE.floor.rotation.x = Math.PI / 2;
        SCENE.scene.add(SCENE.floor);

        SCENE.ceiling.position.y = 1;
        SCENE.ceiling.rotation.x = Math.PI / 2;
        SCENE.scene.add(SCENE.ceiling);

        SCENE.camera.position.z = 5;

        SCENE.camera.rotation.order = 'YXZ';
    },
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
    renderer: new THREE.WebGLRenderer(),


    geometry: new THREE.BoxGeometry( 1, 1, 1 ),
    material:  new THREE.MeshBasicMaterial( { color: '#2194CE',
                                              wireframe: false} ),
    cubes: new THREE.Object3D(),


    floorMaterial: new THREE.MeshBasicMaterial( {
        side: THREE.DoubleSide,
        color: "#000000"
    } ),
    floorGeometry: new THREE.PlaneGeometry(1000, 1000, 10, 10),
    floor: new THREE.Mesh(this.floorGeometry, this.floorMaterial),

    ceilingMaterial:  new THREE.MeshBasicMaterial( {
        side: THREE.DoubleSide,
        color: "#0944a3"
    } ),
    ceilingGeometry: new THREE.PlaneGeometry(1000, 1000, 10, 10),
    ceiling:  new THREE.Mesh(this.ceilingGeometry, this.ceilingMaterial),


    render: function (){
        SCENE.camera.position.x += ( CONTROLS.movea + CONTROLS.moved ) * CONTROLS.accel;
        SCENE.camera.position.z += ( CONTROLS.movew + CONTROLS.moves ) * CONTROLS.accel;
        SCENE.camera.rotation.y += CONTROLS.lookX;
        SCENE.camera.rotation.x += CONTROLS.lookY;
        CONTROLS.lookX = 0;
        CONTROLS.lookY = 0;
        requestAnimationFrame( SCENE.render );
        SCENE.renderer.render( SCENE.scene, SCENE.camera )
    }

}
