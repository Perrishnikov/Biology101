//helper function to rotate in degrees, not radians
function rotateObject(object,degreeX=0, degreeY=0, degreeZ=0){
   degreeX = (degreeX * Math.PI)/180;
   degreeY = (degreeY * Math.PI)/180;
   degreeZ = (degreeZ * Math.PI)/180;
   object.rotateX(degreeX);
   object.rotateY(degreeY);
   object.rotateZ(degreeZ);
}
