// Form validation for registration and other forms
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing form validation');
    
    const registrationForm = document.getElementById('registrationForm');
    
    if (!registrationForm) {
        console.log('Registration form not found, skipping validation');
        return;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.name}Error`);
        
        // Clear previous error
        clearFieldError(field);
        
        // Check required fields
        if (field.hasAttribute('required') && !value) {
            showError(field, errorElement, 'Это поле обязательно для заполнения');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(field, errorElement, 'Введите корректный email адрес');
                return false;
            }
        }
        
        // Password validation
        if (field.name === 'password' && value) {
            if (value.length < 8) {
                showError(field, errorElement, 'Пароль должен содержать минимум 8 символов');
                return false;
            }
            
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_#!%])/;
            if (!passwordRegex.test(value)) {
                showError(field, errorElement, 
                    'Пароль должен содержать буквы верхнего и нижнего регистра, цифры и спецсимволы (_#!%)');
                return false;
            }
        }
        
        // Confirm password
        if (field.name === 'confirmPassword' && value) {
            const password = document.getElementById('password').value;
            if (value !== password) {
                showError(field, errorElement, 'Пароли не совпадают');
                return false;
            }
        }
        
        return true;
    }
    
    function showError(field, errorElement, message) {
        field.classList.add('form-input--error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('form-error--visible');
        }
    }
    
    function clearFieldError(field) {
        field.classList.remove('form-input--error');
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.classList.remove('form-error--visible');
        }
    }
    
    function validateForm(e) {
        e.preventDefault();
        console.log('Form submission attempted');
        
        const fields = registrationForm.querySelectorAll('[required]');
        let isValid = true;
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            console.log('Form is valid, submitting...');
            // Simulate form submission
            alert('Форма успешно отправлена!');
            registrationForm.reset();
        } else {
            console.log('Form has validation errors');
        }
    }
    
    // Add event listeners
    registrationForm.addEventListener('submit', validateForm);
    
    // Add real-time validation
    const fields = registrationForm.querySelectorAll('[required]');
    fields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    console.log('Form validation initialized successfully');
});