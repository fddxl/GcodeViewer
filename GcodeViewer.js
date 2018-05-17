
var GcodeReader = function(){

}
//ファイルの読み込み
GcodeReader.prototype.Load = function(_Gcode,scene){
  var place = [];
  console.log(_Gcode);
  var Gcode = _Gcode;
  //Gcode.replace(/ /g,"");
  var Gx=0,Gy=0,Gz=0;
  var gyo = Gcode.split("\n");
  console.log(gyo);

  for(var i=0;i<gyo.length;i++){
  var A = gyo[i].split(" ");
  //console.log(A);
  /*var flagF = false;
  var flahZ
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

  var material = new THREE.MeshPhongMaterial({color:0xaaaaaa, specular:0x111111, shininess:40});
  var geometry = new THREE.Geometry();
  geometry.vertices = place;
  var mesh = new THREE.Line(geometry,material);
  scene.add(mesh);

};




//文字列のあれこれ




//書き出してベイク
