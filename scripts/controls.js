var CONTROLS = {
    accel: 1,

    movew:    0,
    moved:    0,
    moves:    0,
    movea:    0,

    keyw:  false,
    keyd:  false,
    keys:  false,
    keya:  false,

    mouseX:   0,
    mouseY:   0,

    lookX:    0,
    lookY:    0,

    init: function(){
        CONTROLS.keyDown();
        CONTROLS.keyUp();
        CONTROLS.mouseMove();
    },

    keyDown: function(){
        $(document).keydown(function(e){
            if (e.keyCode == 87){ //W Up
                CONTROLS.keyw = true;
                CONTROLS.movew = -0.1 * Math.cos(SCENE.camera.rotation.y);
                CONTROLS.movea = 0 - Math.sin(SCENE.camera.rotation.y) / 10;
                CONTROLS.moved = 0 - Math.sin(SCENE.camera.rotation.y) / 10;
            }
            if (e.keyCode == 68){ //D Right
                CONTROLS.keyd = true;
                CONTROLS.moved = 0.1 * Math.cos(SCENE.camera.rotation.y);
                CONTROLS.movew = 0 - Math.sin(SCENE.camera.rotation.y) / 10;
                CONTROLS.moves = 0 - Math.sin(SCENE.camera.rotation.y) / 10;
            }
            if (e.keyCode == 83){ //S Down
                CONTROLS.keys = true;
                CONTROLS.moves = 0.1 * Math.cos(SCENE.camera.rotation.y);
                CONTROLS.movea = Math.sin(SCENE.camera.rotation.y) / 10;
                CONTROLS.moved = Math.sin(SCENE.camera.rotation.y) / 10;
            }
            if (e.keyCode == 65){ //A Left
                CONTROLS.keya = true;
                CONTROLS.movea = -0.1 * Math.cos(SCENE.camera.rotation.y);
                CONTROLS.movew = Math.sin(SCENE.camera.rotation.y) / 10;
                CONTROLS.moves = Math.sin(SCENE.camera.rotation.y) / 10;
            }
            if(e.keyCode == 16){
                CONTROLS.accel = 2;
            }
        });
    },

    keyUp: function(){
        $(document).keyup(function(e){
            if (e.keyCode == 87){ //W Up
                CONTROLS.keyw = false;
                CONTROLS.movew = 0;
                if(CONTROLS.keya == false){
                    CONTROLS.movea = 0;
                }
                if(CONTROLS.keyd == false){
                    CONTROLS.moved = 0;
                }
            }
            if (e.keyCode == 68){ //D Right
                CONTROLS.keyd = false;
                CONTROLS.moved = 0;
                if(CONTROLS.keyw == false){
                    CONTROLS.movew = 0;
                }
                if(CONTROLS.keys == false){
                    CONTROLS.moves = 0;
                }
            }
            if (e.keyCode == 83){ //S Down
                CONTROLS.keys = false;
                CONTROLS.moves = 0;
                if(CONTROLS.keya == false){
                    CONTROLS.movea = 0;
                }
                if(CONTROLS.keyd == false){
                    CONTROLS.moved = 0;
                }
            }
            if (e.keyCode == 65){ //A Left
                CONTROLS.keya = false;
                CONTROLS.movea = 0;
                if(CONTROLS.keyw == false){
                    CONTROLS.movew = 0;
                }
                if(CONTROLS.keys == false){
                    CONTROLS.moves = 0;
                }
            }
            if(e.keyCode == 16){
                CONTROLS.accel = 1;
            }
        });
    },

    mouseMove: function(){
        $(document).mousemove(function(e){
            if(e.pageX > CONTROLS.mouseX){
                CONTROLS.lookX = -0.05;
            }
            else if(e.pageX < CONTROLS.mouseX){
                CONTROLS.lookX = 0.05;
            }
            else{
                CONTROLS.lookX = 0;
            }

            if(e.pageY > CONTROLS.mouseY && SCENE.camera.rotation.x > -1){
                CONTROLS.lookY = -0.05;
            }
            else if(e.pageY < CONTROLS.mouseY && SCENE.camera.rotation.x < 1){
                CONTROLS.lookY = 0.05;
            }
            else{
                CONTROLS.lookY = 0;
            }
            CONTROLS.mouseX = e.pageX;
            CONTROLS.mouseY = e.pageY;
            console.log("X: " + CONTROLS.mouseX + " Y: " + CONTROLS.mouseY);
            console.log("Camera X: " + SCENE.camera.rotation.y + " Camera Y: " + SCENE.camera.rotation.x);
        });
    },
}
