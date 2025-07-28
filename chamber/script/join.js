document.getElementById('timestamp').value = new Date().toISOString();

document.querySelectorAll('.cards a').forEach(a => {
    a.addEventListener('click', e => {
    const id = a.getAttribute('data-modal');
    const modal = document.getElementById(id);
    modal.style.display = 'flex'
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    });
});

document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', e => {
        const modal = btn.closest('.modal');
        modal.style.display = 'none';
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});