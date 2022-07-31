document.addEventListener("DOMContentLoaded", (_ev) => {
    setDate();
    addPostBtnEvent();
    addGetBtnEvent();
    addPutBtnEvent();
    addDeleteBtnEvent();
});

function addGetBtnEvent() {
    let btn = document.getElementById('get-btn');

    btn.addEventListener('click', () => {
        // if (toggle) {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            let query = new URLSearchParams(getForm()).toString();
            xhr.open('GET', `https://httpbin.org/get?${query}`, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    document.getElementById('response-output').innerHTML = JSON.stringify(xhr.response, null, 1);
                    // console.log(xhr.response);
                }
            }
            xhr.send(null);

        // } else {
        //     let query = new URLSearchParams(getForm()).toString();
        //     fetch(`http://httpbin.org/get?${query}`, {
        //         method: 'GET'
        //     })
        //         .then(response => response.json())
        //         .then(response => document.getElementById('response-output').textContent = JSON.stringify(response))
        // }
        });
}

function addPostBtnEvent() {
    let btn = document.getElementById('post-btn');
    btn.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://httpbin.org/post', true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById('response-output').textContent = xhr.responseText;
                // console.log(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(getForm()));
    //     fetch('http://httpbin.org/post', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(getForm())
    //     })
    //         .then(response => response.json())
    //         .then(response => document.getElementById('response-output').textContent = JSON.stringify(response))
    });
}

function addPutBtnEvent() {
    let btn = document.getElementById('put-btn');
    btn.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', 'https://httpbin.org/put', true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById('response-output').textContent = xhr.responseText;
                // console.log(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(getForm()));

    //     fetch('http://httpbin.org/put', {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(getForm())
    //     })
    //         .then(response => response.json())
    //         .then(response => document.getElementById('response-output').textContent = JSON.stringify(response))
    });


}

function addDeleteBtnEvent() {
    let btn = document.getElementById('delete-btn');
    btn.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'https://httpbin.org/delete', true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById('response-output').textContent = xhr.responseText;
                // console.log(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(getForm()));
    //
    //     fetch('http://httpbin.org/delete', {
    //         method: 'DELETE',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(getForm())
    //     })
    //         .then(response => response.json())
    //         .then(response => document.getElementById('response-output').textContent = JSON.stringify(response))
    });
}

function getForm() {
    const form = document.getElementById('record-form');
    const formData = new FormData(form);

    const JSONObj = {};
    for (const [key, value] of formData) {
        JSONObj[key] = value;
    }
    return JSONObj;
}

function setDate() {
    let date = new Date().toUTCString();
    const dateInput = document.getElementById('article-date');
    dateInput.value = date;
    // console.log(date);
}