const NEWAPPLICATION_FORM = document.getElementById('new-application-form');
const APPLICATIONS_CONTENT = document.getElementById('applications-container');
const CREATE_NEW_LINK = document.getElementById('create-new-link');
const exitNewModalBTN = document.getElementById('exit-new-modal-btn');
const exitEditModalBTN = document.getElementById('exit-edit-modal-btn');

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
        NEWAPPLICATION_FORM.style.display = 'none';
    })
    .catch((error) => {
        console.error('Error:', error);
        NEWAPPLICATION_FORM.style.display = 'none';
    })
});

APPLICATIONS_CONTENT.addEventListener('click', e => {
    if (e.target.classList.contains('edit-application-btn')) {
        let application = e.target.parentElement;
        let data = application.children();
        let position = data[]
        const editModal = document.getElementById('edit-application-form');
        
        editModal.style.display = 'block';
    }

    if (e.target.classList.contains('delete-application-btn')) {
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

CREATE_NEW_LINK.addEventListener('click', e => {
    e.preventDefault();

    const modal = document.getElementById('new-application-form');
    modal.style.display = 'block';
});

exitNewModalBTN.addEventListener('click', e => {
    const newModal = document.getElementById('new-application-form');
    newModal.style.display = 'none';
});

exitEditModalBTN.addEventListener('click', e => {
    const newModal = document.getElementById('edit-application-form');
    newModal.style.display = 'none';
});

window.addEventListener('click', e => {     
    const createNew_modal = document.getElementById('new-application-form');
    const edit_modal = document.getElementById('edit-application-form');
    
    if(e.target == createNew_modal) {
        createNew_modal.style.display = 'none';
        
    }
    if (e.target == edit_modal) {
        edit_modal.style.display = 'none';
    }
    
})