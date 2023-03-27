
function showMessage(message, delay) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        alert(message);
        resolve();
      }, delay);
    });
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const radius = 10;
  
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  
  let isMoving = false;
  const targets = [];
  
  canvas.addEventListener("click", function(event) {
    if (!isMoving) {
      targets.push({
        x: event.offsetX,
        y: event.offsetY
      });
  
      isMoving = true;
      moveBallToTarget();
    } else {
      targets.push({
        x: event.offsetX,
        y: event.offsetY
      });
    }
  });
  
  async function moveBallToTarget() {
    if (targets.length === 0) {
      isMoving = false;
      return;
    }
  
    var target = targets[0];
    var dx = target.x - x;
    var dy = target.y - y;
    var distance = Math.sqrt(dx * dx + dy * dy);
  
    var speed = 3;
  
    if (distance <= speed) {
      x = target.x;
      y = target.y;
      targets.shift(); 
    } else {
      var angle = Math.atan2(dy, dx);
      x += speed * Math.cos(angle);
      y += speed * Math.sin(angle);
    }
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  
    await new Promise(resolve => setTimeout(resolve, 10));
    await moveBallToTarget();
  }
  