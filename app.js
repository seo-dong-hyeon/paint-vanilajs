const canvas = document.getElementById("jsCanvas"),
    colors = document.getElementsByClassName("jsColor"), // HTMLCollcection
    range = document.getElementById("jsRange"),
    mode = document.getElementById("jsMode"),
    saveBtn = document.getElementById("jsSave");
const ctx = canvas.getContext("2d");
const CANVAS_SIZE = 500;

/* canvas pixel modifier size 설정 필요*/
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width,canvas.height); // 초기 배경 색깔 -> HTML 배경외에도 canvas에 따로 색깔 설정 필요
ctx.strokeStyle = '#2c2c2c'; // 초기 글자 색깔
ctx.fillStyle = '#2c2c2c'; // 초기 채우는 색깔
ctx.lineWidth = 2.5; // 초기 line 너비

let painting = false,
    filling = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ // 마우스클릭x
        ctx.beginPath(); // path = line
        ctx.moveTo(x,y); // path를 만들면 x,y 좌표로 path를 옮김 -> 시작점
    }
    else{
        /* 마우스를 움직이는 내내 발생 */
        ctx.lineTo(x,y); // path의 이전 x,y부터 현재 x,y까지 line을 만듦 -> 이전 path 위치와 현재 path를 연결
        ctx.stroke(); // 현재의 sub-path를 stroke style로 획을 그음 
        //ctx.closePath(); path를 끝냄 -> 시작 x,y부터 현재 위치까지만 연결
    }
}

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}


function handleColorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor; // click이 일어난 태그의 background color
    ctx.fillStyle = ctx.strokeStyle; // 채우는 색깔도 선택한 색깔로 미리 설정
}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value; // range 태그가 위치한 곳의 값
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
        

    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height); // 현재 fillStyle로 영역을 채움
    }
}

/* 우클릭 방지 */
function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg"); // 현재 canvas의 이미지 정보를 url로 리턴
    const link = document.createElement("a");
    link.href = image // 브라우저에게 링크로 가는대신 url을 다운로드해라
    link.download = "paintJS"; // 생성 이미지 이름
    console.log(link);
    link.click();
}

if(canvas){
    /* 동시에 실행가능 */
    canvas.addEventListener("mousemove",onMouseMove); // 마우스가 움직임
    canvas.addEventListener("mousedown",startPainting); // click
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

// Array.from() -> Array로 리턴
Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}