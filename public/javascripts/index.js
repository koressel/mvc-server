const NEWAPPLICATION_FORM = document.getElementById('new-application-form');
const APPLICATIONS_CONTENT = document.getElementById('applications-container');
const EDITAPPLICATION_BTN = document.getElementById('edit-btn');
const CREATE_NEW_LINK = document.getElementById('create-new-link');
const EXIT_SPAN = document.querySelector('.close');

NEWAPPLICATION_FORM.addEventListener('submit', e => {
    e.preventDefault();

    const _position = document.getElementById('position').value;
    const _company = document.getElementById('company').value;
    const _date = document.getElementById('date').value;
    const data = {
        position: _position,
        company: _company,
        date: _date
    }

    fetch('/applications/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        NEWAPPLICATION_FORM.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    })
});

APPLICATIONS_CONTENT.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('delete-application-btn')) {
        const DELETE_BTN = e.target;
        const APPLICATION_DIV = DELETE_BTN.parentElement;
        const _position = APPLICATION_DIV.children[1].textContent;
        const _company = APPLICATION_DIV.children[2].textContent;
        const _date = APPLICATION_DIV.children[3].textContent;
        
        if (confirm(`${_position} at ${_company}\n${_date}\n\nAre you sure you want to delete this application?\nThis action cannot be undone.`)) {
            const data = {
                position: _position,
                company: _company
            }
    
            fetch('/applications/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.status === 200) {
                    console.log('response status: 200')
                    console.log(APPLICATION_DIV)
                    APPLICATION_DIV.style.display = 'none';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        }
    }
});

EDITAPPLICATION_BTN.addEventListener('click', e => {
    e.preventDefault();

    const EDIT_FORM = document.getElementById('edit-application-form');
    NEWAPPLICATION_FORM.classList = 'hidden input-form outline';
    EDIT_FORM.classList = 'show input-form outline';
    EDIT_FORM.focus();
});

CREATE_NEW_LINK.addEventListener('click', e => {
    e.preventDefault();

    const modal = document.getElementById('new-application-form');
    modal.style.display = 'block';
});

EXIT_SPAN.addEventListener('click', e => {
    const modal = document.getElementById('new-application-form');
    modal.style.display = 'none';
});