function getXhr() {
    const content = document.getElementById("content");
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function (event) {
        content.innerHTML = event.target.responseText;
        rescanContent();
    });
    xhr.addEventListener("error", function (event) {
        content.innerHTML = 'Oops! Something went wrong.';
    });
    return xhr;
}

function handleFormSubmit(event) {
    event.preventDefault();
    const xhr = getXhr();
    const form = event.target;
    xhr.open(form.getAttribute('method') || 'GET', form.getAttribute('action'));
    const formData = new FormData(form);
    xhr.send(formData);
}

function rescanContent() {
    const content = document.getElementById('content');
    Array.from(content.getElementsByTagName('form')).
        filter(f => !f.hasAttribute('owie_procesed')).forEach((f) => {
            f.setAttribute('owie_procesed', '1');
            f.addEventListener("submit", handleFormSubmit);
        });
}

document.querySelectorAll("button[data-route]").forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = btn.getAttribute('data-route');
    });
})

window.addEventListener('DOMContentLoaded', rescanContent);