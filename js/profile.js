// Profile page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing profile manager');
    
    const passwordModal = document.getElementById('passwordModal');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    if (!passwordModal) {
        console.log('Password modal not found');
    }
    
    function openModal() {
        console.log('Opening password modal');
        passwordModal.classList.add('modal--open');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        console.log('Closing password modal');
        passwordModal.classList.remove('modal--open');
        document.body.style.overflow = '';
        const passwordForm = document.getElementById('passwordForm');
        if (passwordForm) {
            passwordForm.reset();
        }
    }
    
    function changePassword(e) {
        e.preventDefault();
        console.log('Password change requested');
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        
        // Basic validation
        if (newPassword !== confirmNewPassword) {
            alert('Новые пароли не совпадают');
            return;
        }
        
        if (newPassword.length < 8) {
            alert('Новый пароль должен содержать минимум 8 символов');
            return;
        }
        
        // Simulate password change
        alert('Пароль успешно изменен!');
        closeModal();
    }
    
    function switchTheme(selectedOption) {
        const theme = selectedOption.dataset.theme;
        console.log('Switching to theme:', theme);
        
        // Update active state
        themeOptions.forEach(option => {
            option.classList.remove('theme-option--active');
        });
        selectedOption.classList.add('theme-option--active');
        
        // Save theme preference
        localStorage.setItem('theme', theme);
        
        // Apply theme
        if (theme === 'light') {
            window.location.href = 'index_light.html';
        } else {
            window.location.href = 'index.html';
        }
    }
    
    // Password change modal events
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelPassword = document.getElementById('cancelPassword');
    const passwordForm = document.getElementById('passwordForm');
    
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (cancelPassword) {
        cancelPassword.addEventListener('click', closeModal);
    }
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', changePassword);
    }
    
    // Close modal when clicking outside
    if (passwordModal) {
        passwordModal.addEventListener('click', function(e) {
            if (e.target === passwordModal) {
                closeModal();
            }
        });
    }
    
    // Theme switching
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            switchTheme(this);
        });
    });
    
    console.log('Profile manager initialized successfully');
});