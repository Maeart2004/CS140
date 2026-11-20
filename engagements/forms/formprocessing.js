
        document.getElementById('myForm').addEventListener('submit', function(event) {
            event.preventDefault();
            alert("Form Submitted");

            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('pass').value;
            const bdate = document.getElementById('bdate').value;

            if (!fullname || !email) {
                alert("You need a name and email.");
                return;
            }

            if (!bdate) {
                alert("You need to enter your birthday.");
                return;
            }

            const birthDate = new Date(bdate + "T00:00:00");
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 18) {
                alert("You need to be at least 18 years old.");
                return;
            }

            const formData = {
                name: fullname,
                email: email,
                password: password,
                age: age
            };

            console.log(formData);
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "submit.json", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const message = document.getElementById('message');
                    const response = JSON.parse(xhr.responseText);
                    message.textContent = response.message;
                    const form = document.getElementById('myForm');
                    form.reset();
                    //form.textContent = '';
                } else if (xhr.readyState === 4) {
                    alert('Error submitting form.');
                }
            };
            xhr.send(JSON.stringify(formData));
            alert(`Success: ${fullname}`);
        });