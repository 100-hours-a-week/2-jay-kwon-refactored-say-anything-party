document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const helperText = document.querySelector(".text .helper");
    const loginButton = document.querySelector(".buttons .button");

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        if (emailValue === "" || emailValue.length < 5 || !validateEmail(emailValue)) {
            helperText.textContent = "*올바른 이메일 주소 형식을 입력해주세요";
            helperText.style.display = "block";
        } else if (passwordValue === "") {
            helperText.textContent = "*비밀번호를 입력해주세요";
            helperText.style.display = "block";
        } else if (!validatePassword(passwordValue)) {
            helperText.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다";
            helperText.style.display = "block";
        } else {
            fetch('users.json')
                .then(response => response.json())
                .then(users => {
                    const user = users.find(user => user.email === emailValue && user.password === passwordValue);
                    if (user) {
                        helperText.style.display = "none";
                        window.location.href = "posts.html";
                    } else {
                        helperText.textContent = "*아이디 또는 비밀번호를 확인해주세요";
                        helperText.style.display = "block";
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    helperText.textContent = "*로그인 중 오류가 발생했습니다. 다시 시도해주세요.";
                    helperText.style.display = "block";
                });
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        return re.test(password);
    }
});
