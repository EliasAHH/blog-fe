const baseUrl =  "http://localhost:3000/posts"
const form = document.getElementById("blogform")
form.addEventListener("submit", handleSubmit)
const container = document.getElementById("container")
const ul = document.getElementById("post-area")
const sortButton = document.getElementById("sort");
sortButton.addEventListener("click", handleSort);
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", handleSearch);

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


function handleSort(e) {    
    // in this function I have to sort and display the sorted information.
    let posts = Post.all.slice();
    let sortedArray = posts.sort(function (a, b) {
        
        let nameA = a.title.toUpperCase(); // ignore upper and lowercase
        let nameB = b.title.toUpperCase(); // ignore upper and lowercase


        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
    });
    // setting innerHTML to "" will clear out the whole tag it self and the contents that are inside of it 
    ul.innerHTML = ""
    
    // allows us to use the sorted Array and for each one post it onto the dom
    sortedArray.forEach(p => {
        p.putPostOnDom();
    })

}


function handleSearch(e) {
    // let inputValue = e.target.previousElementSibling.value;
    let inputValue = document.getElementById("search").value;
    let filterdArray = Post.all.filter(p => {
        return p.authorName.toLowerCase() === inputValue.toLowerCase()
    })

    ul.innerHTML = ""
    
    // allows us to use the sorted Array and for each one post it onto the dom
    filterdArray.forEach(p => {
        p.putPostOnDom();
    })

}



