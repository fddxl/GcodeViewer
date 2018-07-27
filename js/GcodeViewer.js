
var GcodeReader = function(){

}
//ファイルの読み込み
GcodeReader.prototype.Load = function(_Gcode,scene){
  var place = [];
  var Gcode = _Gcode;
  var Gx=0,Gy=0,Gz=0;
  var gyo = Gcode.split("\n");

  for(var i=0;i<gyo.length;i++){
  var A = gyo[i].split(" ");

/*  var flagF = false;
//  var flahZ
  for(var q=0;q<A.length;q++){
    if(A[q][0]=="E"){
      flag = true;
      break;
    }
  }*/
  if(A[0]=="G1"){
    for(var p=1;p<A.length;p++){
      if(A[p].slice(0,1)=="X"){
        Gx=(parseFloat(A[p].slice(1))/100);
      }
      if(A[p].slice(0,1)=="Y"){
        Gz=-(parseFloat(A[p].slice(1)/100));
      }
      if(A[p].slice(0,1)=="Z"){
        Gy=(parseFloat(A[p].slice(1)/100)-0.2);
      }
      //console.log(Gx,Gy,Gz);
    }
    place.push(new THREE.Vector3(Gx,Gy,Gz));

     }

  }
/*
var GcodeReader = function(){}
//ファイルの読み込み
GcodeReader.prototype.Load = function(_Gcode,scene){
  var place = [];
  var Gcode = _Gcode;
  var Gx=0,Gy=0,Gz=0;
  var gyo = Gcode.split("\n");

  for(var i=0;i<gyo.length;i++){
      var A = gyo[i].split(" ");

      if(A[0]=="G1"){
          for(var q=1;q<A.length;q++){
              var Fvalue = A[q].split("");
              //break;
              //if(Fvalue[0]=="E"&&Fvalue[2]!="-"){
                //console.log(Fvalue);
                //console.log(A[q]);
                  for(var p=1;p<=A.length-1;p++){
                    //console.log(A[p]);
                      if(A[p].slice(0,1)=="X"){
                          Gx=(parseFloat(A[p].slice(1))/100);
                      }else if(A[p].slice(0,1)=="Y"){
                          Gz=-(parseFloat(A[p].slice(1)/100));
                      }else if(A[p].slice(0,1)=="Z"){
                          Gy=(parseFloat(A[p].slice(1)/100));
                      }
                  }
                  place.push(new THREE.Vector3(Gx,Gy,Gz));

              //}
          }
      }
  }
*/

  var material = new THREE.MeshPhongMaterial({color:0xaaaaaa, specular:0x111111, shininess:40});
  var geometry = new THREE.Geometry();
  geometry.vertices = place;
  var mesh = new THREE.Line(geometry,material);
  mesh.geometry.computeBoundingBox();
  var scaleMesh = mesh.geometry.boundingBox;
  //console.log(scaleMesh);
  var scaleResize = [scaleMesh.max.x - scaleMesh.min.x , scaleMesh.max.y - scaleMesh.min.y , scaleMesh.max.z - scaleMesh.min.z];
  //console.log(scaleResize);
  var scale = Math.max.apply(null,scaleResize);
  //console.log(scale);
  mesh.scale.set(1/scale,1/scale,1/scale);
  mesh.position.set(0,-0.25,0);
  scene.add(mesh);



  function Curve_(){}
  Curve_.prototype = Object.create( THREE.Curve.prototype );
  Curve_.prototype.constructor = Curve_;
  var count = 0;
  Curve_.prototype.getPoint = function ( t ) {
    var i = Math.round(t* place.length);
     if(i >= place.length){
      return new THREE.Vector3(0,0,0);
    }
     try{
       return new THREE.Vector3(place[i].x,place[i].y,place[i].z );
     }
     catch(e){
       //console.log(e);
       //console.log(i);
     }
  };

  var path = new Curve_();
  //console.log(path);
  path.arcLengthDivisions = place.length;
  path.updateArcLengths();
  //console.log(path.arcLengthDivisions);
  //console.log(place);
  //console.log(path);
  var _geometry = new THREE.TubeGeometry( path,place.length-1, 0.001, 20, false );
  var _material = new THREE.MeshBasicMaterial( { color: 0x088A85 } );
  var _mesh = new THREE.Mesh( _geometry, _material );
  //console.log(_mesh);

  _mesh.geometry.computeBoundingBox();
  var _scaleMesh = _mesh.geometry.boundingBox;
  //console.log(_scaleMesh);
  var _scaleResize = [_scaleMesh.max.x - _scaleMesh.min.x , _scaleMesh.max.y - _scaleMesh.min.y , _scaleMesh.max.z - _scaleMesh.min.z];
  //console.log(_scaleResize);
  var _scale = Math.max.apply(null,_scaleResize);
  //console.log(_scale);
  _mesh.scale.set(1/_scale,1/_scale,1/_scale);
  _mesh.position.set(0,-0.25,0);

  scene.add( _mesh );
  //console.log(count);

  }



//文字列のあれこれ




//書き出してベイク
