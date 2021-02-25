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
    // console.log(e)
    // const post = {
    //     title: e.target[0].value,
    //     content: e.target[1].value,
    //     author: e.target[2].value
    // }
    // fetch(baseUrl, { 
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: post

    // })
    //     .then(r => r.json())
    //     .then(data => putPostOnDom(data))
}

function getAllPosts() {
    fetch(baseUrl)
        // the result from baseURL is NOT JSON it's a String
        .then(r => r.json())
        .then(handlePosts)
}

function handlePosts(postsArr) {
    postsArr.forEach(p => putPostOnDom(p));
}


function putPostOnDom(post) {
    // let div = document.createElement("div")
    // let li = document.createElement("li")
    // let p1 = document.createElement("p")
    // let p2 = document.createElement("p")
    // let p3 = document.createElement("P")
    // p1.innerText = post.title
    // p2.innerText = post.content
    // p3.innerText = post.author

    // li.append(p1, p2, p3)
    // div.append(li)
    // ul.append(div)
    ul.innerHTML += `
        <div id=${post.id} class="blog-posts"> 
            <li>
                <h1> Title: ${post.title} </h1>
                <h2> Content: ${post.content} </h2>  
                <h5> Author: ${post.author.name} </h5> 
             </li> 
        </div> 
    `
}