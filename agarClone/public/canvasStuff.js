function init() {
  draw();
  console.log(orbs)
}

//Draw logic
player.locX = Math.floor(500 * Math.random() + 10);
player.locY = Math.floor(500 * Math.random() + 10);

function draw() {
  
  context.setTransform(1,0,0,1,0,0);
  context.clearRect(0,0,canvas.width,canvas.height);
  const camX = -player.locX +canvas.width/2
  const camY = -player.locY +canvas.height/2
  context.translate(camX,camY);
  context.beginPath();
  context.fillStyle = "rgb(255,0,0)";
  context.arc(player.locX,player.locY, 10, 0, Math.PI * 2);
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = "rgb(0,255,0)";
  context.stroke();
  orbs.forEach(orb=>{
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.locX,orb.locY,orb.radius,0,Math.PI * 2)
    context.fill();
  })
  requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', (e) => {
  const mousePosition = {
    x: event.clientX,
    y: event.clientY
  };
  const angleDeg = Math.atan2(mousePosition.y - (canvas.height / 2), mousePosition.x - (canvas.width / 2)) * 180 / Math.PI;
  if (angleDeg >= 0 && angleDeg < 90) {
    // console.log("Mouse is in the lower right quad")
    xVector = 1 - (angleDeg / 90);
    yVector = -(angleDeg / 90);
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    // console.log("Mouse is in the lower left quad")
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - ((angleDeg - 90) / 90));
  } else if (angleDeg >= -180 && angleDeg < -90) {
    // console.log("Mouse is in the upper left quad")
    xVector = (angleDeg + 90) / 90;
    yVector = (1 + ((angleDeg + 90) / 90));
  } else if (angleDeg < 0 && angleDeg >= -90) {
    // console.log("Mouse is in the upper right quad")
    xVector = (angleDeg + 90) / 90;
    yVector = (1 - ((angleDeg + 90) / 90));
  }
  speed = 10
  xV = xVector;
  yV = yVector;
  if ((player.locX < 5 && xV < 0) || (player.locX > 500) && (xV > 0)) {
    player.locY -= speed * yV;
  } else if ((player.locY < 5 && yV > 0) || (player.locX > 500) && (yV < 0)) {
    player.locX += speed * yV;
  } else {
    player.locX += speed * xV;
    player.locY -= speed * yV;
  }
  console.log(player)
})
