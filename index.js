document.addEventListener('DOMContentLoaded', function() {
    const text = "NETWISE";
    const element = document.getElementById('netwise-text');
    const button = document.getElementById('getStartedBtn');
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 300);
        } else {
            button.disabled = false;
        }
    }
    
    typeWriter();
});

function showLoaderAndNavigate() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    
    setTimeout(() => {
        window.location.href = 'form.html';
    }, 3000);
}