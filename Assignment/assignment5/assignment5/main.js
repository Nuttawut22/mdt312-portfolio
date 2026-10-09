// ========================================================
// Assignment 5: JavaScript Post and Reply
// ========================================================

// เมื่อหน้าเว็บโหลดเสร็จ ให้เรียก setupFunction()
window.onload = setupFunction;


// ตัวแปรนับลำดับการโพสต์
let postCount = 0;


// ========================================================
// Setup Function
// ========================================================

function setupFunction() {

    // กำหนดชื่อหัวข้อของหน้าเว็บ
    document.getElementById("top").innerHTML = "Welcome to the Forum";

    // เชื่อมปุ่ม Post กับ postFunction()
    document.querySelectorAll("button")[0].onclick = postFunction;

    // เชื่อมปุ่ม Clear กับ clearFunction()
    document.querySelectorAll("button")[1].onclick = clearFunction;
}


// ========================================================
// Post Function
// ========================================================

function postFunction() {

    // อ่านข้อความจาก textarea
    let message = document.getElementById("message").value;

    // ถ้าไม่ได้พิมพ์ข้อความ
    if (message.trim() === "") {
        alert("Please enter your message.");
        return;
    }


    // ====================================================
    // Post ครั้งที่ 1
    // ====================================================

    if (postCount === 0) {

        document.getElementById("topic").innerHTML = message;

    }


    // ====================================================
    // Post ครั้งที่ 2
    // ====================================================

    else if (postCount === 1) {

        document.getElementById("reply1").innerHTML = message;

    }


    // ====================================================
    // Post ครั้งที่ 3
    // ====================================================

    else if (postCount === 2) {

        document.getElementById("reply2").innerHTML = message;

    }


    // ====================================================
    // Post เกิน 3 ครั้ง
    // ====================================================

    else {

        alert("สามารถ Post ได้สูงสุด 3 ครั้ง");
        return;
    }


    // เคลียร์ข้อความใน textarea
    document.getElementById("message").value = "";

    // เพิ่มจำนวนการโพสต์
    postCount++;
}


// ========================================================
// Clear Function
// ========================================================

function clearFunction() {

    // ล้างข้อความใน topic
    document.getElementById("topic").innerHTML = "";

    // ล้างข้อความใน reply1
    document.getElementById("reply1").innerHTML = "";

    // ล้างข้อความใน reply2
    document.getElementById("reply2").innerHTML = "";

    // ล้างข้อความใน textarea
    document.getElementById("message").value = "";

    // รีเซ็ตจำนวนการโพสต์
    postCount = 0;
}