let NEWAPPLICATION_FORM = document.getElementById('new-application-form');

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
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success', data);
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // })
    
});
