const video = document.getElementById('video');
let model;
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d")

var start = new Date();   
var dateStart = start.getHours() + ":" + start.getMinutes() + ":" + start.getSeconds() + ":" + start.getMilliseconds();
console.log("Start Time = "+ dateStart);

// const setupCamera = () => {
//   navigator.mediaDevices
//     .getUserMedia({
//       video: {width: 720, height: 560},
//       audio: false,
//     })
//     .then((stream) => {
//       video.srcObject = stream;
//     });
// };

async function detectFaces(){
  const prediction = await model.estimateFaces(video, false);

  ctx.drawImage(video, 0, 0, 720, 560)
  prediction.forEach((pred) => {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "blue";
    ctx.rect(
      pred.topLeft[0],
      pred.topLeft[1],
      pred.bottomRight[0] - pred.topLeft[0],
      pred.bottomRight[1] - pred.topLeft[1]
    );
    ctx.stroke();
  });
}

// setupCamera();
video.addEventListener('play', () => {
  setInterval(async () => {
    model = await blazeface.load();
    detectFaces();
    var end = new Date(); 
    var dateEnd = end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds() + ":" + end.getMilliseconds();
    console.log("End Time = " + dateEnd)
  }, 100)
})
