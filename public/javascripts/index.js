/*
* Fetch data after load
* Save to local storage
* Add pre-fetch check to local storage

applications = []
*/

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        fetch('/applications', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            response.json()
            .then(data => {
                let applications = JSON.parse(localStorage.getItem('applications'));
                if(!applications) {
                    populateStorage(data);
                } else {
                    console.log('server data saved as')
                    if (isDeeplyEqual(applications,data)) {
                        console.log('Yay they are equal')
                    } else {
                        console.log('Fuck no they arent')
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }
}

function populateStorage(data) {
    let stringifiedData = JSON.stringify(data);
    localStorage.setItem('applications', stringifiedData);
}

function isDeeplyEqual(object1, object2) {
    return _(object1).xorWith(object2, _.isEqual).isEmpty();
}

const applicationsContainer = document.getElementById('applications-container');
const newModal = document.getElementById('new-application-form');
const openNewModalButton = document.getElementById('create-new-link');
const closeNewModalButton = document.getElementById('exit-new-modal-btn');
const editModal = document.getElementById('edit-application-form');
const closeEditModalButton = document.getElementById('exit-edit-modal-btn');

newModal.addEventListener('submit', e => {
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
        newModal.reset();
        newModal.style.display = 'none';
    })
    .catch((error) => {
        console.error('Error:', error);
        newModal.style.display = 'none';
    })
});

applicationsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('edit-application-btn')) {
        let application = e.target.parentElement;
        let data = application.children;
        let position = data[2].textContent;
        let company = data[3].textContent;
        company = company.substr(4);
        let date = data[4].textContent;
        date = date.substr(0,7);
        console.log(position,company,date)

        // const editModal = document.getElementById('edit-application-form');
        
        editModal.style.display = 'block';
    }

    if (e.target.classList.contains('delete-application-btn')) {
        const DELETE_BTN = e.target;
        const APPLICATION_DIV = DELETE_BTN.parentElement;
        const _position = APPLICATION_DIV.children[2].textContent;
        const _company = APPLICATION_DIV.children[3].textContent;
        const _date = APPLICATION_DIV.children[4].textContent;
        
        if (confirm(`${_position} at ${_company}\n${_date}\n\nAre you sure you want to delete this application?\nThis action cannot be undone.`)) {
            const data = {
                position: _position,
                company: _company.substr(4) // substr removes the "at " form the text content
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

openNewModalButton.addEventListener('click', e => {
    e.preventDefault();

    const modal = document.getElementById('new-application-form');
    modal.style.display = 'block';
});

closeNewModalButton.addEventListener('click', e => {
    const newModal = document.getElementById('new-application-form');
    newModal.style.display = 'none';
});

closeEditModalButton.addEventListener('click', e => {
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