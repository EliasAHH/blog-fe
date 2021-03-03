const baseUrl =  "http://localhost:3000/posts"
const form = document.getElementById("blogform")
form.addEventListener("submit", handleSubmit)
const container = document.getElementById("container")
const ul = document.getElementById("post-area")

document.addEventListener("DOMContentLoaded", init)


function init() {
    getAllPosts();
}


function handleSubmit(e) {
    e.preventDefault();
    // let title = document.getElementById("blog-title").value;
    // let author = document.getElementById("blog-author").value;
    // let content = document.getElementById("blog-content").value;
    const postInfo = {
        title: e.target[0].value,
        author: e.target[1].value,
        content: e.target[2].value
    }

    // by default Fetch makes a GET request, if you want to make any other request you HAVE to tell it what kind
    fetch(baseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postInfo)
    })
        .then(r => r.json())
        .then(data => {
            let post = new Post(p.id, p.title, p.content, p.author.name, p.likes);
            post.putPostOnDom();
        })
}

function getAllPosts() {
    fetch(baseUrl)
        // the result from baseURL is NOT JSON it's a String
        .then(r => r.json())
        .then(data => {
            data.forEach(p => {
                let post = new Post(p.id, p.title, p.content, p.author.name, p.likes);
                post.putPostOnDom();
            })
        })
}


