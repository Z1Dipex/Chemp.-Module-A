// Admin panel functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing admin manager');
    
    const editModal = document.getElementById('editGameModal');
    const deleteModal = document.getElementById('deleteModal');
    let gameToDelete = null;
    
    function validateGameData(data) {
        if (!data.name || data.name.length > 30) {
            alert('Название игры обязательно и должно быть не длиннее 30 символов');
            return false;
        }
        
        if (!data.genre) {
            alert('Выберите жанр игры');
            return false;
        }
        
        if (!data.developer) {
            alert('Введите разработчика игры');
            return false;
        }
        
        if (!data.price || data.price < 0) {
            alert('Введите корректную цену');
            return false;
        }
        
        if (data.description && data.description.length > 100) {
            alert('Описание не должно превышать 100 символов');
            return false;
        }
        
        return true;
    }
    
    function addGame(e) {
        e.preventDefault();
        console.log('Adding new game');
        
        const formData = new FormData(e.target);
        const gameData = {
            name: formData.get('gameName'),
            genre: formData.get('gameGenre'),
            developer: formData.get('gameDeveloper'),
            price: formData.get('gamePrice'),
            description: formData.get('gameDescription'),
            image: formData.get('gameImage')
        };
        
        if (validateGameData(gameData)) {
            console.log('Game data valid:', gameData);
            alert('Игра успешно добавлена!');
            e.target.reset();
            const imagePreview = document.getElementById('imagePreview');
            if (imagePreview) {
                imagePreview.innerHTML = '';
            }
        }
    }
    
    function previewImage(e) {
        const file = e.target.files[0];
        const preview = document.getElementById('imagePreview');
        
        if (file && preview) {
            // Check file type
            if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/jpg')) {
                alert('Пожалуйста, выберите файл в формате JPG');
                e.target.value = '';
                return;
            }
            
            // Check file size (2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Файл слишком большой. Максимальный размер: 2MB');
                e.target.value = '';
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; border-radius: 8px;">`;
            };
            
            reader.readAsDataURL(file);
        }
    }
    
    function openEditModal(button) {
        const row = button.closest('tr');
        const gameData = {
            id: row.cells[0].textContent,
            name: row.cells[1].textContent,
            genre: row.cells[2].textContent,
            developer: row.cells[3].textContent,
            price: row.cells[4].textContent.replace('₽', '')
        };
        
        console.log('Editing game:', gameData);
        editModal.classList.add('modal--open');
        document.body.style.overflow = 'hidden';
    }
    
    function closeEditModal() {
        editModal.classList.remove('modal--open');
        document.body.style.overflow = '';
    }
    
    function openDeleteModal(button) {
        const row = button.closest('tr');
        gameToDelete = {
            id: row.cells[0].textContent,
            name: row.cells[1].textContent
        };
        
        console.log('Preparing to delete game:', gameToDelete);
        deleteModal.classList.add('modal--open');
        document.body.style.overflow = 'hidden';
    }
    
    function closeDeleteModal() {
        deleteModal.classList.remove('modal--open');
        document.body.style.overflow = '';
        gameToDelete = null;
    }
    
    function deleteGame() {
        if (gameToDelete) {
            console.log('Deleting game:', gameToDelete);
            alert(`Игра "${gameToDelete.name}" удалена!`);
            closeDeleteModal();
            
            // In real implementation, remove from DOM
            const row = document.querySelector(`tr:has(td:contains("${gameToDelete.id}"))`);
            if (row) {
                row.remove();
            }
        }
    }
    
    function refreshGamesList() {
        console.log('Refreshing games list');
        alert('Список игр обновлен!');
    }
    
    // Add game form
    const addGameForm = document.getElementById('addGameForm');
    if (addGameForm) {
        addGameForm.addEventListener('submit', addGame);
    }
    
    // Image preview
    const gameImageInput = document.getElementById('gameImage');
    if (gameImageInput) {
        gameImageInput.addEventListener('change', previewImage);
    }
    
    // Edit buttons
    const editButtons = document.querySelectorAll('.action-button--edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            openEditModal(this);
        });
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.action-button--delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            openDeleteModal(this);
        });
    });
    
    // Modal close buttons
    const closeEditModalBtn = document.getElementById('closeEditModal');
    const closeDeleteModalBtn = document.getElementById('closeDeleteModal');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');
    
    if (closeEditModalBtn) {
        closeEditModalBtn.addEventListener('click', closeEditModal);
    }
    
    if (closeDeleteModalBtn) {
        closeDeleteModalBtn.addEventListener('click', closeDeleteModal);
    }
    
    if (cancelDelete) {
        cancelDelete.addEventListener('click', closeDeleteModal);
    }
    
    if (confirmDelete) {
        confirmDelete.addEventListener('click', deleteGame);
    }
    
    // Close modals when clicking outside
    if (editModal) {
        editModal.addEventListener('click', function(e) {
            if (e.target === editModal) {
                closeEditModal();
            }
        });
    }
    
    if (deleteModal) {
        deleteModal.addEventListener('click', function(e) {
            if (e.target === deleteModal) {
                closeDeleteModal();
            }
        });
    }
    
    // Refresh games
    const refreshGames = document.getElementById('refreshGames');
    if (refreshGames) {
        refreshGames.addEventListener('click', refreshGamesList);
    }
    
    console.log('Admin manager initialized successfully');
});