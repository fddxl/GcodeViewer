var Viewer = function (elementId, modelName) {

  this.cameraDistance = 1.0;
  this.boxSize = 0.4418847653807891;
  this.container = document.getElementById(elementId);

  // Camera
  this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 15);
  this.camera.position.set(0, 0, this.cameraDistance);
  this.camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Control

  // Scene
  this.scene = new THREE.Scene();
  this.scene.fog = new THREE.Fog(0xffffff, 2, 15);

  // Objects
  this.loadMesh();
  this.loadLine();
  this.helpers();

  // Lights
  this.scene.add(new THREE.HemisphereLight(0x443333, 0x111122));
  this.addShadowedLight(1, 1, 1, 0xdddddd, 0.5);
  this.addShadowedLight(0.5, 1, -1, 0xaaaaaa, 1);

  // renderer
  this.renderer = new THREE.WebGLRenderer({antialias:true, preserveDrawingBuffer:true});
  this.renderer.setClearColor(this.scene.fog.color);
  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  this.renderer.gammaInput = true;
  this.renderer.gammaOutput = true;
  this.renderer.shadowMap.enabled = true;
  this.renderer.shadowMap.renderReverseSided = false;
  this.container.appendChild(this.renderer.domElement);
};

Viewer.prototype.resize = function () {
  this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
};

Viewer.prototype.render = function () {
  this.renderer.render(this.scene, this.camera);
}

Viewer.prototype.loadMesh = function () {
  var Gn = 10;  //Gコードの行数
  var place = [];
  var Gx,Gy,Gz;
  for(var i=0 ; i<Gn ; i++){
    Gx = (Math.sin(i)*20)/200;
    Gy = (Math.cos(i)*20)/200;
    Gz = (0+i)/20;
    //文字列から各座標を引っ張ってくる
    //var place[i] = [Gx,Gy,Gz];
    //place.push([Gx,Gy,Gz]);
    place.push(new THREE.Vector3(Gx,Gy,Gz));
  };
  console.log(place);
  var material = new THREE.MeshPhongMaterial({color:0xaaaaaa, specular:0x111111, shininess:40});
  var geometry = new THREE.Geometry();
 /*for(var i=0 ; i<Gn ; i++){
  geometry.vertices.push(

    new THREE.Vector3(place[i][0], place[i][1], place[i][2]));

  };*/
  geometry.vertices = place;
  /*geometry.vertices.push(
  new THREE.Vector3(0.1, 0.1, 0),
  new THREE.Vector3(0, 0.1, 0),
  new THREE.Vector3(0.1, 0, 0),
);*/

//geometry.faces.push(
//    new THREE.Face3(0,1,2),
//  );
  var mesh = new THREE.Line(geometry,material);
  this.scene.add(mesh);
};

Viewer.prototype.loadLine = function () {
  var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( -1, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( 0, 54, 0) );
  geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

  var line = new THREE.Line( geometry, material );
  this.scene.add( line );
};

Viewer.prototype.helpers = function () {
  // Box
  var box = new THREE.Box3();
  var boxSize = this.boxSize;
  box.setFromCenterAndSize(new THREE.Vector3(0, 0, 0), new THREE.Vector3(boxSize, boxSize, boxSize));
  var boxHelper = new THREE.Box3Helper(box, 0x777777);
  this.boxHelper = boxHelper;
  this.scene.add(boxHelper);

  // Sphere
  // var radius = Math.sin(deg2rad(22.5));
  // var sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
  // var sphereMaterial = new THREE.MeshBasicMaterial({color:0xff0000, transparent:true, opacity:0.1});
  // var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  // this.scene.add(sphere);
};

Viewer.prototype.addShadowedLight = function (x, y, z, color, intensity) {
  var directionalLight = new THREE.DirectionalLight(color, intensity);
  directionalLight.position.set(x, y, z);
  this.scene.add(directionalLight);
  var d = 1;
  directionalLight.shadow.camera.left = -d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = -d;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.bias = -0.005;
  directionalLight.castShadow = true;
}

Viewer.prototype.cameraPosition = function (degT, degP) {
  var radT = deg2rad(degT);
  var radP = deg2rad(degP);
  var z = Math.sin(radT) * Math.cos(radP);
  var x = Math.sin(radT) * Math.sin(radP);
  var y = Math.cos(radT);
  this.camera.position.set(x, y, z);
  this.render();
};
