    var scene, camera, renderer, controls, dirLight, hemiLight;;

    var WIDTH  = 520;
    var HEIGHT = $(window).height() - 120;
    
    var SPEED = 0.01;
    
    var loader;    
    var img;
    var theJson;
    
    function init(pokemon) {
        $('#view3d').html('');
        scene = new THREE.Scene();
        theJson = 'http://pokemon.dev/assets/jsonModels/'+pokemon+'/'+pokemon+'.json';
        
        initMesh(theJson);
        initCamera();
        initLights();
        initRenderer();
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        document.getElementById('view3d').appendChild(renderer.domElement);
            
        render();
        
    }
    
    function initCamera() {
        camera = new THREE.PerspectiveCamera(90, WIDTH / HEIGHT, 1, 1000);
        camera.position.set(0, 5, 5);
        camera.lookAt(scene.position);
    }
    
    
    function initRenderer() {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(WIDTH, HEIGHT);
    }
    
    function initLights() {

        hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL( 1, 1, 1 );
        hemiLight.groundColor.setHSL( 1, 1, 1 );
        hemiLight.position.set( 0, 500, 0 );
        scene.add( hemiLight );

        //

        dirLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -1, 1.75, 1 );
        dirLight.position.multiplyScalar( 50 );
        scene.add( dirLight );

        dirLight.castShadow = true;

        dirLight.shadowMapWidth = 2048;
        dirLight.shadowMapHeight = 2048;

        var d = 50;

        dirLight.shadowCameraLeft = -d;
        dirLight.shadowCameraRight = d;
        dirLight.shadowCameraTop = d;
        dirLight.shadowCameraBottom = -d;

        dirLight.shadowCameraFar = 3500;
        dirLight.shadowBias = -0.0001;
        //dirLight.shadowCameraVisible = true;
    }
    
    var mesh = null;
    
    function initMesh(theJson) {
       loader = new THREE.JSONLoader();
       loader.load(theJson, function(geometry, materials) {
            mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
           // mesh.translation = THREE.GeometryUtils.center(geometry);
            scene.add(mesh);
        });
    }
    
    function rotateMesh() {
        if (!mesh) {
            return;
        }
   
        mesh.rotation.x -= SPEED * 2;
        mesh.rotation.y -= SPEED;
        mesh.rotation.z -= SPEED * 3;
    }
    
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        renderer.setClearColor( 0xd8d8d8 );
        controls.update();
    }

function showModel(pokemon){
    if($('#article').css('display') == 'block'){
        init(pokemon);
    }
}