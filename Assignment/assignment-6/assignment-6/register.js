// =============================================================================
// MDT312 Assignment 6 register.js
// Modernized: ES6 (const/let), event.preventDefault(), and localStorage
// =============================================================================
//เมื่อหน้าเว็บโหลดเสร็จ window.onload จะเรียกฟังก์ชัน pageLoad() ครับ
window.onload = pageLoad;
//เป็นการสร้างฟังก์ชันชื่อ pageLoad 
function pageLoad() {
//บรรทัดนี้จะหา Form ที่มี id เป็น myRegister แล้วกำหนดว่าเมื่อมีการ Submit Form ให้เรียกฟังก์ชัน validateForm() 
    document.getElementById("myRegister").onsubmit = validateForm;
}
//เป็นการสร้างฟังก์ชัน validateForm สำหรับตรวจสอบข้อมูลในหน้า Register โดยรับ event เข้ามาด้วย
function validateForm(event) {
//สร้างตัวแปร errorMsg โดยไปหา Element ที่มี id เป็น errormsg เพื่อใช้แสดงข้อความ Error 
    const errorMsg = document.getElementById("errormsg");
//บรรทัดนี้ใช้ดึง Username ที่ผู้ใช้กรอกใน Form มาเก็บไว้ในตัวแปร username และใช้ trim() เพื่อตัดช่องว่างด้านหน้าและด้านหลัง
    const username = document.forms["myRegister"]["username"].value.trim();
//บรรทัดนี้ดึง Input ที่มีชื่อ password จาก Form myRegister มาเก็บไว้ในตัวแปร passwords เนื่องจากใน HTML มี Password อยู่ 2 ช่องที่ใช้ชื่อเดียวกัน
    const passwords = document.forms["myRegister"]["password"];
//บรรทัดนี้เอาค่าจาก Password ช่องแรก โดย [0] หมายถึงข้อมูลตัวแรก
    const password = passwords[0].value;
//บรรทัดนี้เอาค่าจาก Password ช่องที่สอง โดย [1] หมายถึงข้อมูลตัวที่สอง ซึ่งเป็น Retype Password 
    const retypePassword = passwords[1].value;


    // 1. ตรวจสอบว่า Password ทั้ง 2 ช่องตรงกันหรือไม่ ถ้าไม่ตรงกันให้แจ้งเตือน และให้return false
    if (password !== retypePassword) {
        errorMsg.innerHTML = "Password ไม่ตรงกัน กรุณากรอกใหม่";
        event.preventDefault();
        return false;
    }

    // 2. เคลียร์ข้อความแจ้งเตือนถ้าผ่านการตรวจสอบ
    //ถ้า Password ตรงกัน จะล้างข้อความ Error โดยกำหนด innerHTML เป็นค่าว่าง
    errorMsg.innerHTML = "";

    // 3. บันทึกข้อมูลลงใน localStorage ทีละตัว
    // เพื่อความปลอดภัย: รหัสผ่านไม่ปรากฏบน Browser Address Bar และ Browser History
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

//แสดงกล่องข้อความแจ้งผู้ใช้ว่าลงทะเบียนสำเร็จ
    alert("ลงทะเบียนสำเร็จ! ระบบบันทึกข้อมูลเรียบร้อย กำลังไปที่หน้า Login");

    // 4. นำทางไปหน้า login.html
    //ป้องกันการ Submit Form แบบปกติ เพราะเราต้องการควบคุมการเปลี่ยนหน้าเองด้วย
    event.preventDefault();
    //เปลี่ยนไปหน้า Login
    window.location.href = "login.html";
    return true;
}