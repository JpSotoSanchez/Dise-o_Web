function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();


  // Draw the edge circle with gradient
  // TODO: (Optional) add a gradient circle


  // Center circle
  // TODO: make the central black circle
  ctx.beginPath(); //dibujar
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI); //hacer un arco con ciertas medidas
  ctx.fillStyle = "#333"; //color del circulo
  ctx.fill(); //que este relleno y no sea solo borde
}

function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  //Tambien se puede poner numero por numero jajajajaja
  for(var num=1;num<13;num++){
    var ang;
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  //TODO ESTA EN RADIANES AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  
  hour = (hour % 12)* Math.PI / 6;
  drawHand(ctx, hour, radius * 0.4, radius * 0.07);
  
  minute = (minute % 60)* Math.PI / (6*5);
  drawHand(ctx, minute, radius * 0.70, radius * 0.07);

  second = (second % 60)* Math.PI /(6*5);
  drawHand(ctx, second, radius * 0.8, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
