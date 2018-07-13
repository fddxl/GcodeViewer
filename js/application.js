var viewer;
var GcodeTobashi = new GcodeReader();
var inflation = false;
var controls;


$(window).on('load', function() {
  var modelName = 'woman.Gcode';
  viewer = new Viewer('canvas-viewer', modelName);
  controls = new THREE.OrbitControls(viewer.camera);
  animate();
  eventListeners();
});

$(window).on('resize', function() {
  viewer.resize();
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  viewer.render();
};

function ReadGcode(event){
  var files;
  var reader = new FileReader();

  if(event.target.files){
    files = event.target.files;
  }else{
    files = event.dataTransfer.files;
  }

  reader.onload = function(event){
    GcodeTobashi.Load(reader.result,viewer.scene);
  }

  if(files[0]){
    reader.readAsText(files[0]);
  }

}




function eventListeners() {
  $('#startInflation').on('click', function() {
    inflation = true;
  });

  $('#canvas-viewer').on('mouseover', function() {
    controls.enabled = true;
  });
  $('#canvas-viewer').on('mouseout', function() {
    controls.enabled = false;
  });

  $('#savepng').on('click', function() {
    viewer.savepng();
    //inflation = true;
  });

  $('#saveSTL').on('click', function() {
    viewer.expoterSTL();
    //inflation = true;
  });

  $('#stopInflation').on('click', function() {
    inflation = false;
  });

  $('#exportSTL').on('click', function() {
    var filename = $('#filename').val();
    viewer.exportSTL(filename);
  });
};
