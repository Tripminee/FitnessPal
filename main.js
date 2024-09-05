document.getElementById('logIn').addEventListener('submit', function(event) {
    event.preventDefault(); // หยุดการ submit form แบบปกติ
    
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    
    // ตรวจสอบความถูกต้องของเบอร์โทรและพาสเวิร์ด
    if (!validatePhone(phone) || !validatePassword(password)) {
        alert("เบอร์โทรศัพหรือพาสเวิร์ด ไม่ถูกต้อง");
        return;
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    fetch('https://us-central1-system-lean-structure.cloudfunctions.net/FitnessPal_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone: phone,
            password: password,
            date: date,
            time: time
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.result === "success") {
            alert("เริ่มบันทึกสารอาหารกัน");
        } else {
            alert("เบอร์โทรศัพ หรือ รหัสผิดพลาด ลองใหม่อีกครั้ง");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("เกิดข้อผิดพลาดบางอย่าง ลองใหม่อีกครั้ง");
    });
});

// ฟังก์ชันตรวจสอบเบอร์โทรศัพท์
function validatePhone(phone) {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone); // ตรวจสอบว่ามี 10 หลักหรือไม่
}

// ฟังก์ชันตรวจสอบพาสเวิร์ด
function validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordPattern.test(password); // ตรวจสอบความยาวและรูปแบบพาสเวิร์ด
}
