const canvas = document.getElementById("jsCanvas");//캔버스 불러오기
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange"); // 선 굵기
const mode = document.getElementById("jsMode"); // 버튼
const saveBtn = document.getElementById("jsSave"); // save 버튼 기능 만들기

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";//fill과 stroke을 검은색 디폴트로 하기 전에 캔버스 배경색 설정
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;// 선 색의 디폴트값
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;// 그리는 선의 굵기

let painting = false;// 클릭 이벤트에 대해서 페인팅 추가
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {// 마우스 이벤트 주기
  const x = event.offsetX;// 캔버스 위 마우스 좌표 정보 가져오기
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }// console.log(x, y); // x와 y의 값을 브라우저 콘솔 로그에 찍어줌
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";// paint 동작 시 버튼 노출
  } else {
    filling = true;
    mode.innerText = "Paint";// fill 동작 시 버튼 노출
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL(); // 이미지 저장 타입을 만듬, 기본 png
  const link = document.createElement("a"); // 이미지 링크를 만듬
  link.href = image; // href는 image(url)가 되어야 하고
  link.download = "PaintJS[🎨]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // 마우스가 움직였을때 설정
  canvas.addEventListener("mousedown", startPainting); // 마우스 클릭했을때 발생하는 설정
  canvas.addEventListener("mouseup", stopPainting); //마우스 클릭 후 땠을때 발생하는 설정
  canvas.addEventListener("mouseleave", stopPainting); // 마우스가 캔버스 벗어나면 발생하는 설정, stopPainting을 직접 입력
  canvas.addEventListener("click", handleCanvasClick); // 색채워넣기 fill
  canvas.addEventListener("contextmenu", handleCM); // 마우스 오른쪽 금지
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}
// object로 부터 array 만드는 array.form 메소드 호출
// color네임은 array안에 있는 각 아이템들을 대표하는 것 아무거나 넣어줘도 됨
if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

//업로드
function getImageFiles(e) {
  const file = e.target.files[0];
  console.log(file);
  const reader = new FileReader();
  const img = new Image();

  reader.readAsDataURL(file);
  reader.onload = (e) => {
    img.src = e.target.result;
    img.onload = () => {
      // canvas.width = img.width;
      // canvas.height = img.height;
      ctx.drawImage(img, 0, 0, 700, 700);
      //기존에 ctx.drawImage(img, 0, 0); 이런식으로 입력했더니 사진 크기가 정상적으로 나오지 않고 그림이 제대로 그려지지 않았음
      //이후 뒤에 입력을 추가해서 그림의 크기를 강제로 캔버스와 동일하게 지정하여 설정...
    };
  };

  res.appendChild(canvas);
  //res는 DIV태그를 선언한 값 입니다. res안에 만든 canvas를 자식 요소로 삽입하기 위한 코드입니다! 라는 작성자의 답변
  //appendChild()로 캔버스를 넣어주지 않으면 만든 캔버스를 브라우저에서 확인 할 수 없다고 함(하지만 없어도 동작은함)
}

const input = document.querySelector("#real-input");
const upBtn = document.querySelector("#jsUpload");

upBtn.addEventListener("click", () => input.click());

if (input) {
  input.addEventListener("change", getImageFiles);
}

// 이미지 업로드 참고 : https://juni-official.tistory.com/209
