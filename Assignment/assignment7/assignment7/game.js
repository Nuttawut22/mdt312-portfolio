// =============================================================================
// MDT312 Assignment 7  - Square Game
// Modern JavaScript: DOM, Event, Timer
// =============================================================================

// กำหนดให้เรียก pageLoad() เมื่อหน้าเว็บโหลดเสร็จ
window.onload = pageLoad;

// ตัวแปรสำหรับเก็บ Timer ID
let timer = null;


// ฟังก์ชันทำงานเมื่อหน้าเว็บโหลดเสร็จ
function pageLoad(){

	// หา Button Start จาก HTML
	const startBtn = document.getElementById("start");

	// เมื่อกดปุ่ม Start ให้เรียกฟังก์ชัน startGame()
	startBtn.onclick = startGame;


	// หาพื้นที่เกมจาก HTML
	const gameLayer = document.getElementById("layer");

	// ใช้ Event Delegation ตรวจจับการคลิกภายในพื้นที่เกม
	gameLayer.onclick = function(event) {

		// ตรวจสอบว่าสิ่งที่คลิกมี class ชื่อ square หรือไม่
		if (event.target.classList.contains("square")) {

			// ลบ Square ที่ถูกคลิกออกจากหน้าเว็บ
			event.target.remove();
		}
	};
}


// ฟังก์ชันเริ่มเกม
function startGame(){

	// แสดงข้อความ Ready ก่อนเริ่มเกม
	alert("Ready");

	// ลบ Square เก่าที่อาจเหลืออยู่
	clearScreen();

	// สร้าง Square ใหม่ตามจำนวนที่กำหนด
	addBox();

	// เริ่มจับเวลา
	timeStart();
}


// ฟังก์ชันเริ่ม Timer
function timeStart(){

	// กำหนดให้ Timer ทำงานทุก 1 วินาที
	const TIMER_TICK = 1000;

	// ถ้ามี Timer เดิมอยู่ ให้หยุด Timer ก่อน
	if (timer !== null) {

		// หยุด Timer เดิม
		clearInterval(timer);

		// กำหนดค่า Timer กลับเป็น null
		timer = null;
	}


	// กำหนดเวลาเริ่มต้น 30 วินาที
	const min = 0.15;
	let second = 10 ;

	// หา Element ที่ใช้แสดงเวลา
	const clockDisplay = document.getElementById('clock');

	// แสดงเวลาเริ่มต้นบนหน้าเว็บ
	clockDisplay.textContent = second;


	// เรียก timeCount() ทุก ๆ 1 วินาที
	timer = setInterval(timeCount, TIMER_TICK);


	// ฟังก์ชันสำหรับนับเวลา
	function timeCount(){

		// เลือก Square ทั้งหมดที่อยู่ในพื้นที่เกม
		const allbox = document.querySelectorAll("#layer div");


		// ถ้าลบ Square หมดก่อนหมดเวลา แสดงว่าชนะ
		if (allbox.length === 0 && second > 0) {

			// หยุด Timer
			clearInterval(timer);

			// กำหนด Timer เป็น null
			timer = null;

			// แสดงข้อความว่าชนะ
			alert("You win!");

			// จบการทำงานของฟังก์ชัน
			return;
		}


		// ถ้าหมดเวลาแต่ยังมี Square เหลืออยู่ แสดงว่าแพ้
		if (second <= 0 && allbox.length > 0) {

			// หยุด Timer
			clearInterval(timer);

			// กำหนด Timer เป็น null
			timer = null;

			// แสดงข้อความ Game over
			alert("Game over");

			// ลบ Square ที่เหลือทั้งหมด
			clearScreen();

			// จบการทำงานของฟังก์ชัน
			return;
		}


		// ถ้ายังมี Square เหลืออยู่ ให้ลดเวลาลง 1 วินาที
		if (allbox.length > 0) {

			// ลดเวลาลง 1 วินาที
			second--;

			// แสดงเวลาที่เหลือบนหน้าเว็บ
			clockDisplay.textContent = second;
		}
	}
}


// ฟังก์ชันสร้าง Square
function addBox(){

	// รับจำนวน Square จากช่อง Input
	const numbox = parseInt(document.getElementById("numbox").value) || 0;

	// หา Element ที่เป็นพื้นที่เกม
	const gameLayer = document.getElementById("layer");

	// รับสีที่ผู้ใช้เลือกจาก Select
	const colorDrop = document.getElementById("color").value;


	// วน Loop ตามจำนวน Square ที่ผู้ใช้กำหนด
	for (let i = 0; i < numbox; i++){

		// สร้าง div ใหม่สำหรับเป็น Square
		const tempbox = document.createElement("div");

		// กำหนด class square และสีที่เลือก
		tempbox.className = "square " + colorDrop;

		// กำหนด ID ให้ Square แต่ละอัน
		tempbox.id = "box" + i;

		// สุ่มตำแหน่งแนวนอนของ Square
		tempbox.style.left = Math.random() * (500 - 25) + "px";

		// สุ่มตำแหน่งแนวตั้งของ Square
		tempbox.style.top = Math.random() * (500 - 25) + "px";


		// เพิ่ม Square เข้าไปในพื้นที่เกม
		gameLayer.appendChild(tempbox);
	}
}


// ฟังก์ชันลบ Square ทั้งหมด
function clearScreen(){

	// เลือก Square ทั้งหมดในพื้นที่เกม
	const allbox = document.querySelectorAll("#layer div");


	// วน Loop เพื่อลบ Square ทีละอัน
	for (let i = 0; i < allbox.length; i++) {

		// ลบ Square ออกจากหน้าเว็บ
		allbox[i].remove();
	}
}