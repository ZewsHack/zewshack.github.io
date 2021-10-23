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
var sd_fip = document.getElementById('inpu-color-field')
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

var ClickMode = {
    Paint: 0,
    Fill: 1,
    Lwstick: 2,
    Fill_painting: 3
}

var currentMode = ClickMode.Paint;

items =["https://wallpapercave.com/wp/wb41glx.jpg","https://www.enjpg.com/img/2020/desktop-backgrounds-1.png",
        "https://www.zastavki.com/pictures/1366x768/2014/Drawn_wallpapers___Paintings_Painting_Edvard_Munch_-_Scream_068812_24.jpg",
        "https://upload.wikimedia.org/wikipedia/ru/d/dd/The_Persistence_of_Memory.jpg",
        "https://losko.ru/wp-content/uploads/2019/11/7702b9faef4382f33090b0b87b2c0ad0-1.jpg",
        "https://nyblog.ru/wp-content/uploads/2020/10/kubizm-v-iskusstve-foto-1-870x400.jpg",
        "https://img.wallpapersafari.com/desktop/1024/576/59/42/4AbaqM.jpg"]


var item = items[Math.floor(Math.random()*items.length)];
console.log(item);

$('body').css('background', `url(${item})`)
$('body').css('background-size', `${window.outerWidth}px ${window.outerHeight}px`)

////////////////////////////////////// DRAW ////////////////////////////////
c.width = 1400
c.height = 500

del = 4.4

function drav_line(x, y, dx, dy, color, wight){
  mouseC.beginPath();
  mouseC.lineCap = "round"
  mouseC.lineWidth = wight
  mouseC.strokeStyle = color
  mouseC.moveTo(x, y);
  mouseC.lineTo(x - dx + dx/del, y - dy + dy/del);
  mouseC.stroke()
  mouseC.closePath()
}

function uwu(){
  $('.star').css('background', sd_fip.value)
}

setInterval(uwu, 100)

function fill_painting(x, y, color){
  console.log(color);
  mouseC.strokeStyle = color
  mouseC.lineWidth = 1
  mouseC.lineCap = "round"
  mouseC.lineTo(x, y)
  mouseC.stroke()
  mouseC.fill()
}


fresko_id.onmousemove = function(event){
  if (event.which == 1){
    cX = event.pageX
    cY = event.pageY
    var x = event.offsetX;
    var y = event.offsetY;
    var dx = event.movementX;
    var dy = event.movementY;
    if (type_bol[0] == 1){
      drav_line(x, y, dx, dy, sd.value, size_pencil.value)
      cord_cuke.push([x, y, dx, dy, sd.value, size_pencil.value])
    }else if (type_bol[0] == 0){
      drav_line(x, y, dx, dy, '#ffffff', size_pencil.value)
      cord_cuke.push([x, y, dx, dy, '#ffffff', size_pencil.value])
    }else if (type_bol[0] == 3){
      fill_painting(x, y, sd.value)
      cord_cuke.push([3, x, y, sd.value])
  }
}
}



$('.draw').click(function(){
  type_bol[0] = 1
  currentMode = ClickMode.Paint
})

$('.lwstick').click(function(){
  type_bol[0] = 0
  currentMode = ClickMode.Lwstick
})

$('.fill').click(function(){
  type_bol[0] = 2
  currentMode = ClickMode.Fill
})

function fill_painting_bol(){
  type_bol[0] = 3
  currentMode = ClickMode.Fill_painting
}

/////////////////////////////////////// AUTO_CLEAR //////////////////////////////

$('#star').mouseup(function(){
  mouseC.beginPath()
  cord_cuke.push(["beginPath"])
})


///////////////////////////////////////////// CTRL_Z ////////////////////////////

function back_cavas(){
  mouseC.clearRect(0, 0, c.width, c.height)
  mouseC.beginPath()

  for (let vret of cord_cuke){

    if (vret[0] == "beginPath"){
      mouseC.beginPath()
    }
    if (vret === cord_cuke[cord_cuke.length - 1]){
      cord_cuke.splice(cord_cuke.length-2 , 1)
      mouseC.beginPath()
      return

    }if (vret[0] == 'fill'){
      fill_painting(mouseC, vret[1], vret[2], vret[3])
    }
    // if (vret[0] == "fill"){
    //   ffloodFill(mouseC, vret[1], vret[2], vret[3])
    // }

    drav_line(vret[0], vret[1], vret[2], vret[3], vret[4], vret[5])
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
  currentMode = ClickMode.Clear;
  clear()
}


///////////////////////////// DOWNLOAD //////////////////////////////////////
function SCREEN(){
  var url = c.toDataURL()
  download.href = url
}
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



///////// hex in android color ///////
function reverseString(str) {
  return str.split("").reverse().join("");
}




$('#star').mousedown(function(event){
    if (currentMode == ClickMode.Fill)
    {
      color_fill = '0xff' + reverseString(sd.value.replace("#", ''))
      //console.log(sd.value);
      ffloodFill(mouseC, event.offsetX, event.offsetY, color_fill)
      //floodFill(mouseC, event.offsetX, event.offsetY, 34, 0)
      cord_cuke.push(['fill', event.offsetX, event.offsetY, color_fill])
      currentMode = ClickMode.Paint;
      type_bol[0] = 1
      return false;
    }
})


// requestAnimationFrame(u)
// function u(){
//   requestAnimationFrame(u)
//   sd.value
// }


function getPixel(pixelData, x, y) {
  if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
    return -1;
  } else {
    return pixelData.data[y * pixelData.width + x];
  }
}



async function ffloodFill(ctx, x, y, fillColor) {
  //window.requestAnimationFrame(ffloodFill(mouseC, event.offsetX, event.offsetY, color_fill))
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);



  const pixelData = {
    width: imageData.width,
    height: imageData.height,
    data: new Uint32Array(imageData.data.buffer),
  };

  const targetColor = getPixel(pixelData, x, y);

  if (targetColor !== fillColor) {

    const ticksPerUpdate = 900;
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
