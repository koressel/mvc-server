const applicationsContainer = document.getElementById('applications-container');

const newModal = document.getElementById('new-application-form');
const openNewModalButton = document.getElementById('create-new-link');
const closeNewModalButton = document.getElementById('exit-new-modal-btn');
const addNewFileButton = document.getElementById('add-new-file');

const editModal = document.getElementById('edit-application-form');
let editModalContent = document.getElementById('edit-modal-content');
const closeEditModalButton = document.getElementById('exit-edit-modal-btn');

// Update local storage after page is loaded
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
                    console.log(applications)
                    if (!isDeeplyEqual(applications,data)) {
                        console.log('Server data ahead of local storage. Updating...')
                        populateStorage(data)
                    } else {console.log('Local storage matches server data')}
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

// handle application button clicks
applicationsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('edit-application-btn')) {
        editModal.style.display = 'block';
        editModal.reset();
     
        const parentElemId = e.target.parentElement.dataset.id;
        let positionModalInput = document.getElementById('position');
        let companyModalInput = document.getElementById('company');
        let dateModalInput = document.getElementById('date');
        let appId = document.getElementById('edit-id');
        const applications = JSON.parse(localStorage.getItem('applications'));

        applications.forEach(app => {
            if(app.id === Number(parentElemId)) {
                // This is gross
                editModalContent.childNodes[9].textContent = parentElemId;
                editModalContent.childNodes[11].value = app.position;
                editModalContent.childNodes[15].value = app.company;
                editModalContent.childNodes[19].value = app.date;
            }
        })

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
        updateApplications();
    })
    .catch((error) => {
        console.error('Error:', error);
        newModal.style.display = 'none';
    })
});

addNewFileButton.addEventListener('click', e => {
    e.preventDefault();
    const fileContainer = document.getElementById('file-container');
    const lastFileId = fileContainer.children[(fileContainer.children.length - 1)].id;
    const id = Number(lastFileId.substr(lastFileId.length-1));
    const nextId = (id + 1);
    const input = document.createElement('input');
    input.type = 'file';
    input.id = `file-${nextId}`;
    input.name = `file-${nextId}`;
    fileContainer.appendChild(input);
})

editModal.addEventListener('submit', e => {
    e.preventDefault();

    //
    // a check if the application is actually changed is needed
    //

    const _position = document.getElementById('edit-position').value;
    const _company = document.getElementById('edit-company').value;
    const _date = document.getElementById('edit-date').value;
    const _id = document.getElementById('edit-id');
    const data = {
        position: _position,
        company: _company,
        date: _date,
        id: _id.textContent
    }

    fetch('/applications/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        editModal.reset();
        editModal.style.display = 'none';
    })
    .catch((error) => {
        console.error('Error:', error);
        editModal.style.display = 'none';
    })
});


openNewModalButton.addEventListener('click', e => {
    e.preventDefault();

    const modal = document.getElementById('new-application-form');
    modal.style.display = 'block';
    modal.reset();
});

closeNewModalButton.addEventListener('click', e => {
    const newModal = document.getElementById('new-application-form');
    newModal.style.display = 'none';
});

closeEditModalButton.addEventListener('click', e => {
    const newModal = document.getElementById('edit-application-form');
    newModal.style.display = 'none';
});

// Close modal if the user clicks outside of the modal
window.addEventListener('click', e => {     
    const createNew_modal = document.getElementById('new-application-form');
    const edit_modal = document.getElementById('edit-application-form');
    
    if(e.target == createNew_modal) {
        createNew_modal.style.display = 'none';
        
    }
    if (e.target == edit_modal) {
        edit_modal.style.display = 'none';
    }
    
});

function updateApplications() {
    fetch('/applications',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        response.json()
        .then(data => {
            const container = document.getElementById('flex-container');
            const localApplicationData = JSON.parse(localStorage.getItem('applications'));
            localApplicationData.forEach(app => {
                const container = document.createElement('div');
                container.classList.add('applications');
                container.dataset.id = app.id;

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-application-btn');
                const deleteButtonText = document.createTextNode('Delete');
                deleteButton.appendChild(deleteButtonText);

                const editButton = document.createElement('button');
                editButton.id = 'edit-btn';
                editButton.classList.add('edit-application-btn');
                const editButtonText = document.createTextNode('Edit');
                editButton.appendChild(editButtonText);


            });
        })
        .catch('')
    })
    .catch(error => {
        console.log('Error fetching applications from the server',error);
    });
}

function populateStorage(data) {
    let stringifiedData = JSON.stringify(data);
    localStorage.setItem('applications', stringifiedData);
}

function isDeeplyEqual(obj1, obj2) {
    return _(obj1).xorWith(obj2, _.isEqual).isEmpty();
}