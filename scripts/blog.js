/**
 * @typedef {{
 *  title: string,
 *  summary: string,
 *  summary: string
 * }} Post
 */


export function definePostElements() {
    console.info("Registering custom elements...");
}

export function generatePostId() {
    return crypto.randomUUID();
}

function loadPosts() {

    return JSON.parse(localStorage.getItem('posts')) || {};
}

function storePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

export function insertPost(post) {
    const posts = loadPosts();
    const postId = generatePostId();

    posts[postId] = post;
    storePosts(posts);

    return postId;
}

export function selectPost(postId) {
    const posts = loadPosts();

    return posts[postId];
}

export function selectAllPosts() {
    const posts = loadPosts();
    return posts;
}

export function updatePost(postId, post) {
    const posts = loadPosts();

    posts[postId] = post;

    storePosts();
}


export function deletePost(postId, post) {
    const posts = loadPosts();

    if (!(postId in posts)) {
        return false;
    }

    delete posts[postId];

    storePosts(posts);
    return true;
}

export function countPosts() {
    const posts = loadPosts();
    return Object.keys(posts).length;
}

export function renderPost(postId, post) {
    // pose element (title, date, summary)
    const temp = document.getElementById('post-template');

    const postElement = temp.content.cloneNode(true);
    postElement.children[0].dataset.postId = postId;

    const postTitle = postElement.querySelector('post-title > h1');
    postTitle.textContent = post.title;

    const postDate = postElement.querySelector('post-date > p');
    postDate.textContent = post.date;

    const postSummary = postElement.querySelector('post-summary > p');
    postSummary.textContent = post.summary;


    // delete button for the current postId
    const deleteButton = postElement.getElementById('delete-button');
    deleteButton.addEventListener('click', (ev) => {
            ev.target.parentElement.parentElement.remove();
            deletePost(postId, post);

    })

    // edit button for the current postId
    const editButton = postElement.getElementById('edit-button');
    editButton.addEventListener('click', (ev) => {

        // create an edit dialog and get the (title, data, summary) from the current post
        const temp = document.getElementById('edit-template');
        const editElement = temp.content.cloneNode(true);

        const postTitle = editElement.querySelector('post-title > input');
        postTitle.value = post.title;

        const postDate = editElement.querySelector('post-date > input');
        postDate.value = post.date;

        const postSummary = editElement.querySelector('post-summary > textarea');
        postSummary.value = post.summary;

        const dialogMessage = editElement.getElementById('edit-post-dialog');


        // edit button inside the template dialog
        const editButton = editElement.querySelector('post-options > input');
        editButton.addEventListener('click', (eve) => {
            eve.preventDefault();

            // get the current post from the database
            let JSONPosts = localStorage.getItem('posts');
            let allPosts = JSON.parse(JSONPosts);
            let modifiedPost = allPosts[postId];

            // update the content base on the edit template dialog result
            modifiedPost.title = postTitle.value;
            modifiedPost.date = postDate.value;
            modifiedPost.summary = postSummary.value;

            if (validatePost(new FormData(eve.target.parentElement.parentElement.parentElement))) { // basic validation
                localStorage.setItem('posts', JSON.stringify(allPosts)); // store back to the database

                // update the DOM element data
                const t = ev.target.parentElement.parentElement.querySelector('post-title > h1');
                t.textContent = postTitle.value;

                const d = ev.target.parentElement.parentElement.querySelector('post-date > p');
                d.textContent = postDate.value;

                const s = ev.target.parentElement.parentElement.querySelector('post-summary > p');
                s.textContent = postSummary.value;

                dialogMessage.close();
                dialogMessage.remove();
            }

        });

        // cancel button within the edit template dialog
        const cancelButton = editElement.querySelector('post-options > button');
        cancelButton.addEventListener('click', () => {
            dialogMessage.close();
            dialogMessage.remove();
        });


        document.body.appendChild(editElement);
        dialogMessage.showModal();
    });

    return postElement;
}


export function redisplayPost(postId, post, container) {
    const postElement = renderPost(postId, post);

    const existingPost = container.querySelector(`[data-post-id="${postId}"]`);
    if (existingPost) {
        existingPost.remove();
    }

    if (post) {
        container.appendChild(postElement)
    }
}


export function redisplayAllPosts(container) {
    const posts = selectAllPosts();

    for (const [id, post] of Object.entries(posts)) {
        redisplayPost(id, post, container);
    }
}

export function validatePostTitle(post) {
    const title = post.get('title');

    if (!title) {
        renderPostDialog('Title cannot be empty!');
        return false;
    }
    return true;
}

export function validatePostDate(post) {
    const date = post.get('date');

    if (!date) {
        renderPostDialog('Date cannot be empty!');
        return false;
    }
    return true;
}

export function validatePostSummary(post) {
    const summary = post.get('summary');

    if (!summary) {
        renderPostDialog('Summary cannot be empty!');
        return false;
    }
    return true;
}

export function validatePost(post) {
    return (validatePostTitle(post) && validatePostDate(post) && validatePostSummary(post))
}

export function renderPostDialog(message) {
    const temp = document.getElementById('dialog-template');

    const dialogElement = temp.content.cloneNode(true);

    const dialogMessage = dialogElement.getElementById('dialog-message');
    dialogMessage.textContent = message;

    const okButton = dialogElement.getElementById('ok-button');
    okButton.addEventListener('click', () => dialog.remove());

    document.body.appendChild(dialogElement);
    const dialog = document.getElementById('custom-dialog');
    dialog.showModal();
}
