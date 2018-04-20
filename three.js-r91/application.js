var viewer;
var inflation = false;

$(window).on('load', function() {
  var modelName = 'models/bunny.stl';
  viewer = new Viewer('canvas-viewer', modelName);
  animate();
  eventListeners();
});

$(window).on('resize', function() {
  viewer.resize();
});

function animate() {
  requestAnimationFrame(animate);
  viewer.render();
};

function eventListeners() {
  $('#startInflation').on('click', function() {
    inflation = true;
  });

  $('#stopInflation').on('click', function() {
    inflation = false;
  });

  $('#exportSTL').on('click', function() {
    var filename = $('#filename').val();
    viewer.exportSTL(filename);
  });
};
