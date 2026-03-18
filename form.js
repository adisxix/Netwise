const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    showLoaderAndNavigate(event);
});

function showLoaderAndNavigate(event) {
    const firstname = document.getElementById('firstname');
    
    const dateofbirth = document.getElementById('dateofbirth');
    const salary = document.getElementById('salary');
    
    if (!firstname.value || !dateofbirth.value || !salary.value) {
        alert('Please fill in all fields');
        return;
    }
    
    const birthDate = new Date(dateofbirth.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if (age < 18) {
        alert('You must be 18 years or older to submit this form');
        return;
    }
    
    const loader = document.getElementById('loader');
    loader.classList.add('show');
    loader.style.display = 'flex';
    
    setTimeout(function() {
        const params = new URLSearchParams({
            firstname: firstname.value,
            salary: salary.value,
            dateofbirth: dateofbirth.value
        });
        window.location.href = `home.html?${params.toString()}`;
    }, 3000);
}

document.getElementById('firstname').addEventListener('input', function(e) {
    this.value = this.value.replace(/[0-9]/g, '');
});