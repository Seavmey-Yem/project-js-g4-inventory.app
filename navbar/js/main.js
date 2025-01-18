// Toggle Sidebar Visibility
document.getElementById('toggleSidebar').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('d-none');
});

// Highlight Active Link
document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelector('.sidebar .nav-link.active')?.classList.remove('active');
        this.classList.add('active');
    });
});
