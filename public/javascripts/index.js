let NEWAPPLICATION_FORM = document.getElementById('new-application-form');

NEWAPPLICATION_FORM.addEventListener('submit', e => {
    e.preventDefault();

    let NEWAPPLICATION_FORM_NEW = document.getElementById('new-application-form');
    let position = document.getElementById('position').value;
    let company = document.getElementById('company').value;
    let date = document.getElementById('date').value;

    let fd = new FormData();
    fd.append('position', position);
    fd.append('company', company);
    fd.append('date', date);
    
    console.log('Form Data:',fd)

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });
        return response.json();
    }

  

    postData('/applications/createNew', fd)
        .then(res => {
            console.log(res)
        })
})
