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
        .then(data => putPostOnDom(data))
}

function getAllPosts() {
    fetch(baseUrl)
        // the result from baseURL is NOT JSON it's a String
        .then(r => r.json())
        .then(handlePosts)
}

function handlePosts(postsArr) {
    postsArr.forEach(p => {
        putPostOnDom(p)
    });
  // You only do this IF and only IF  you're doing the innerHTML  += because you have to look through all the div's and give each button an event listener. 
    // let likebutton = Array.from(document.getElementsByClassName("blog-posts"));
    // likebutton.forEach(div => {
    //     let button = div.querySelector("button")
    //     button.addEventListener("click",handleLikes)
    // })

}


function putPostOnDom(post) {


    let div = document.createElement("div")
    let li = document.createElement("li")
    let p1 = document.createElement("p")
    let p2 = document.createElement("p")
    let p3 = document.createElement("p")
    let button = document.createElement("button")
    let span = document.createElement("span")


    p1.innerText = post.title
    p2.innerText = post.content
    p3.innerText = post.author.name
    button.innerText = "Likes"
    button.id = post.id
    span.innerText = post.likes
    button.append(span)


    li.append(p1, p2, p3, button)
    div.append(li)
    ul.append(div)

    // here you can give each seperate button it's own event listener without having to query on it.
    button.addEventListener("click", handleLikes)


  // if you do it this way you must iterate through all the div's and give each button an event listener
//     ul.innerHTML += `
//         <div class="blog-posts"> 
//             <li>
//                 <h1> Title: ${post.title} </h1>
//                 <h2> Content: ${post.content} </h2>  
//                 <h5> Author: ${post.author.name} </h5>  
//                 <button id=${post.id}> Likes <span> ${post.likes} </span> <button> 
//              </li> 
//         </div> 
//   `
    }


    // optimistic rendering - Which means we Update the DOM BEFORE we make any changes to our database. 
    // pesimistic rendering - Which means we update the database BEFORE we make any changes to our DOM

function handleLikes(e) {
  
    let likes = parseInt(e.target.children[0].innerText)
    fetch(baseUrl + `/${e.target.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({likes: likes += 1 })
    })

        .then(r => r.json())
        .then(data => updateDom(data,e.target.id))
}


function updateDom(data,id) {
    let button = document.getElementById(`${id}`)
    button.children[0].innerText = data.likes
}

