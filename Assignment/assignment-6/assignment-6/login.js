// =============================================================================
// MDT312 Assignment 6 login.js
// Modernized: ES6 (const/let), event.preventDefault(), and for loop
// =============================================================================
//เมื่อหน้า Login โหลดเสร็จ จะเรียกฟังก์ชัน loginLoad()
window.onload = loginLoad;
//สร้างฟังก์ชันชื่อ loginLoad()
function loginLoad() {
//หา Form ที่มี id myLogin แล้วกำหนดว่าเมื่อ Submit ให้เรียก checkLogin()
    document.getElementById("myLogin").onsubmit = checkLogin;
}
//สร้างฟังก์ชัน checkLogin() สำหรับตรวจสอบการ Login โดยรับ Event เข้ามา
function checkLogin(event) {
    // 1. ป้องกันหน้าเว็บรีเฟรชเองทันทีเมื่อกดปุ่ม Submit
    if (event) {
        event.preventDefault();
    }

    // 2. ดึงข้อมูลจาก localStorage ทีละตัว แล้วนำมาใส่ใน Array 
    //สร้างตัวแปร users เป็น Array และมี Object ของผู้ใช้ Default อยู่หนึ่งคน คือ Username admin และ Password 123456
    const users = [{username: "admin", password: "123456"}]; // เพิ่มผู้ใช้ default ไว้แล้ว
//ดึง Username ที่บันทึกไว้ใน localStorage ออกมาเก็บไว้ในตัวแปร storedUsername ครับ
    const storedUsername = localStorage.getItem("username");
//ดึง Password จาก localStorage มาเก็บไว้ใน storedPassword 
    const storedPassword = localStorage.getItem("password");

    // ถ้ามีข้อมูลใน localStorage ให้นำมาเก็บใส่ Array of Objects
    if (storedUsername && storedPassword) {
        users.push({
            username: storedUsername,
            password: storedPassword
        });
    }


    // 3. ตรวจสอบว่ามีข้อมูลผู้ใช้ในระบบหรือไม่
    if (users.length === 0) {
        alert("ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาลงทะเบียนที่หน้า Register ก่อน");
        window.location.href = "register.html";
        return false;
    }

    // 4. ดึงค่าที่ผู้ใช้กรอกในฟอร์ม Login ปัจจุบัน
//ดึง Username ที่ผู้ใช้กรอกในหน้า Login มาเก็บไว้ในตัวแปร username 
    const username = document.forms["myLogin"]["username"].value;
//ดึง Password ที่ผู้ใช้กรอกมาเก็บไว้ในตัวแปร password 
    const password = document.forms["myLogin"]["password"].value;


    // 5. ใช้ for loop วนหาใน Array ว่ามี username และ password ที่ตรงกับที่เรากรอกหรือไม่
//สร้างตัวแปร isLoginSuccess และกำหนดค่าเริ่มต้นเป็น false หมายถึงตอนแรกยังถือว่า Login ไม่สำเร็จ
    let isLoginSuccess = false;
//ใช้ for loop เพื่อวนตรวจสอบ User ใน Array ทีละคนครับlet i = 0 คือเริ่มจากตำแหน่งที่ 0 i < users.length คือวนไปจนกว่าจะครบจำนวน User i++ คือเพิ่มค่า i ทีละ 1 ครับ
    for (let i = 0; i < users.length; i++) {
        if (
//ตรวจสอบว่า Username ของ User ใน Array ตรงกับ Username ที่ผู้ใช้กรอกหรือไม่ และใช้ && เพื่อบอกว่าต้องตรงกับเงื่อนไขถัดไปด้วย
            users[i].username === username &&
//ตรวจสอบว่า Password ใน Array ตรงกับ Password ที่ผู้ใช้กรอกหรือไม่ครับ
            users[i].password === password
        ) {
//ถ้า Username และ Password ตรงกัน จะเปลี่ยนค่า isLoginSuccess จาก false เป็น true
            isLoginSuccess = true;
            break;
        }
    }


    // 6. ตรวจสอบผลลัพธ์จากการวนลูป
//ตรวจสอบว่า Login สำเร็จหรือไม่
    if (isLoginSuccess) {
        alert("Login success! ยินดีต้อนรับเข้าสู่ระบบ");
        return true;
    } else {
        alert("Username หรือ password ไม่ถูกต้อง");
        return false;
    }
}