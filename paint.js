var c = document.getElementById("star")
var fresko_id = document.getElementById('star')
var cler = document.getElementById('cler')
var color = document.getElementById('color')
var fresko = document.getElementsByClassName('star')
var div_size = document.getElementsByClassName('div_size')
var grid = document.getElementsByClassName('grid')
var box = document.getElementsByClassName('smail')
var download = document.getElementById('download_canvas')
var sd = document.getElementById('inpot')
var mouseC = c.getContext("2d")
var mouseC_id = fresko_id.getContext("2d")
var size_pencil = document.getElementById('size_pencil')
var size_ctx_width = document.getElementById('size_width')
var size_ctx_height = document.getElementById('size_height')
var cX
var cY
var cord_cuke = []
var type_bol = [1]
var poi = []
var pi = Math.PI

////////////////////////////////////// DRAW ////////////////////////////////
c.width = 1150
c.height = 450


function drav_line(x, y, dx, dy, color, wight){
  mouseC.beginPath();
  mouseC.lineWidth = wight
  mouseC.strokeStyle = color
  mouseC.moveTo(x, y);
  mouseC.lineTo(x - dx, y - dy);
  mouseC.lineCap = "round"
  mouseC.stroke()
  mouseC.closePath()
}



fresko_id.onmousemove = function(event){
  if (event.which == 1){
    cX = event.pageX
    cY = event.pageY
    var x = event.offsetX;
    var y = event.offsetY;
    var dx = event.movementX;
    var dy = event.movementY;
    console.log(x, y, dx, dy);
    //mouseC.lineWidth = size_pencil.value
    if (type_bol[0] == 1){
      drav_line(cX-50, cY-50)
      drav_line(x, y, dx, dy, sd.value, size_pencil.value)
      cord_cuke.push([x, y, dx, dy, sd.value, size_pencil.value])
    }else if (type_bol[0] == 0){
      drav_line(cX-50, cY-50)
      cord_cuke.push([cX, cY, '#ffffff', size_pencil.value])
    }
  }
}

/////////////////////////////////////// AUTO_CLEAR //////////////////////////////

fresko_id.onmouseup = function(){
  mouseC.beginPath()
  cord_cuke.push(["beginPath"])
}


function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


fresko_id.onmousedown = function(e){
  if (e.which == 1) {
    console.log(rgbToHex(0, 0, 255));
  }
}


//////////////////////////////////////////// BUTTON BOAL ////////////////////////



function clear_bol(){
  type_bol[0] = 0
}



///////////////////////////////////////////// CTRL_Z ////////////////////////////

function back_cavas(){
  mouseC.clearRect(0, 0, c.width, c.height)
  mouseC.beginPath()

  for (let vret of cord_cuke){

    console.log(vret[0]);
    if (vret[0] == "beginPath"){
      mouseC.beginPath()
    }
    if (vret === cord_cuke[cord_cuke.length - 1]){
      cord_cuke.splice(cord_cuke.length-2 , 1)
      mouseC.beginPath()
      return

    }
    if (vret[0] == "fill"){
      ffloodFill(vret[1], vret[2], vret[3])
    }

    drav_line(vret[0], vret[1], vret[2], vret[3], vret[4], vret[5])
    //drav_line(vret)
  }
}


document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.code == 'KeyZ') {
    back_cavas()
  }
})

///////////////////////////////////////// CLEAR /////////////////////////////////
function clear(){
  mouseC.clearRect(0, 0, box.height, box.width)
  cord_cuke = [1]
  mouseC.beginPath()
  back_cavas()
  sd.value = '#000000'
}
cler.onclick = function(){
  clear()
}


///////////////////////////// DOWNLOAD //////////////////////////////////////
function SCREEN(){
  var url = c.toDataURL()
  download.href = url
}

//////////////////////////////// COLOR //////////////////////////////////////

mouseC.strokeStyle = sd.value
function Colored(){
  if (type_bol[0] == 1 || type_bol[0] == 2){
    mouseC.strokeStyle = sd.value
  }else if (type_bol[0] == 0){
    mouseC.strokeStyle = '#ffffff'
  }
}

setInterval(Colored, 10)

/////////////////////// CHECK DRAW AREA /////////////////////////



var $button = $('.star');

var offset = $.extend($button.offset(), {
	width : $button.outerWidth(),
  height : $button.outerHeight()
});

$('body').mousemove(function(e){
	var x = e.pageX;
  var y = e.pageY;


  if((x >= offset.left && x <= offset.left + offset.width) && (y >= offset.top && y <= offset.top + offset.height)) {
    //passssssssssssssssssss
  }else{
    if ((cord_cuke[cord_cuke.length - 1]) == "beginPath"){
      //passssssssssssssssssss
    }else{
      cord_cuke.push(["beginPath"])
      mouseC.beginPath()
    }
  }
})




//////////////////// FILL ///////////////////////////


var ClickMode = {
    Paint: 0,
    Fill: 1
};

var currentMode = ClickMode.Paint;

function reverseString(str) {
  return str.split("").reverse().join("");
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}



$('#star').mousedown(function(event){
    if (currentMode == ClickMode.Fill)
    {
      faca = '0xff' + reverseString(String((sd.value).slice(1)))
      console.log(faca, sd.value);
      floodFill(mouseC, event.offsetX, event.offsetY, faca);
      cord_cuke.push(['fill', event.offsetX, event.offsetY, faca])
      return false;
    }
})

function fill_rand(){
  type_bol[0] = 2
  currentMode = ClickMode.Fill;
}

function drav_bol(){
  type_bol[0] = 1
  currentMode = ClickMode.Paint;
}



function getPixel(pixelData, x, y) {
  if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
    return -1;
  } else {
    return pixelData.data[y * pixelData.width + x];
  }
}

async function ffloodFill(ctx, x, y, fillColor) {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);


  const pixelData = {
    width: imageData.width,
    height: imageData.height,
    data: new Uint32Array(imageData.data.buffer),
  };

  const targetColor = getPixel(pixelData, x, y);

  if (targetColor !== fillColor) {

    const ticksPerUpdate = 50;
    let tickCount = 0;
    const pixelsToCheck = [x, y];
    while (pixelsToCheck.length > 0) {
      const y = pixelsToCheck.pop();
      const x = pixelsToCheck.pop();

      const currentColor = getPixel(pixelData, x, y);
      if (currentColor === targetColor) {
        pixelData.data[y * pixelData.width + x] = fillColor;

        ctx.putImageData(imageData, 0, 0);
        ++tickCount;
        if (tickCount % ticksPerUpdate === 0) {
          await wait();
        }

        pixelsToCheck.push(x + 1, y);
        pixelsToCheck.push(x - 1, y);
        pixelsToCheck.push(x, y + 1);
        pixelsToCheck.push(x, y - 1);
      }
    }
  }
}

function wait(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}


async function floodFill(ctx, x, y, fillColor) {

  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  const pixelData = {
    width: imageData.width,
    height: imageData.height,
    data: new Uint32Array(imageData.data.buffer),
  };

  const targetColor = getPixel(pixelData, x, y);

  if (targetColor !== fillColor) {

    const ticksPerUpdate = 90;
    let tickCount = 0;
    const pixelsToCheck = [x, y];
    while (pixelsToCheck.length > 0) {
      const y = pixelsToCheck.pop();
      const x = pixelsToCheck.pop();

      const currentColor = getPixel(pixelData, x, y);
      if (currentColor === targetColor) {
        pixelData.data[y * pixelData.width + x] = fillColor;

        ctx.putImageData(imageData, 0, 0);
        ++tickCount;
        if (tickCount % ticksPerUpdate === 0) {
          await wait();
        }

        pixelsToCheck.push(x + 1, y);
        pixelsToCheck.push(x - 1, y);
        pixelsToCheck.push(x, y + 1);
        pixelsToCheck.push(x, y - 1);
      }
    }
  }
}