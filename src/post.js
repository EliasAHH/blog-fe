class Post {

    // Is INDENTICAL to initialize from Ruby 
      
      // def initialize(name, breed)
          // self.name = name
          // self.breed = breed
          // @@all << self
      //end 
  
      // Class Method in RUBY
      static all = []
  
      constructor(id, title, content, authorName, likes) {
          this.id = id; 
          this.title = title; 
          this.content = content;
          this.authorName = authorName;
          this.likes = likes; 
          Post.all.push(this)
      }
  
  
      // static handlePosts(postsArr) {
      //     postsArr.forEach(p => {
      //         putPostOnDom(p)
      //     });
      // }
  
  
      putPostOnDom() {
  
          let div = document.createElement("div")
          let li = document.createElement("li")
          let p1 = document.createElement("p")
          let p2 = document.createElement("p")
          let p3 = document.createElement("p")
          let button = document.createElement("button")
          let span = document.createElement("span")
      
      
          p1.innerText = this.title
          p2.innerText = this.content
          p3.innerText = this.authorName
          button.innerText = "Likes"
          button.id = this.id
          span.innerText = this.likes.toString()
          button.append(span)
      
      
          li.append(p1, p2, p3, button)
          div.append(li)
          ul.append(div)
      
          // here you can give each seperate button it's own event listener without having to query on it.
          button.addEventListener("click", this.handleLikes)
      
      
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
  
  
      handleLikes = (e) => {
          let likes = parseInt(e.target.children[0].innerText)
          fetch(baseUrl + `/${this.id}`, {
              method: "PATCH",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({likes: likes += 1 })
          })
      
              .then(r => r.json())
              .then(data => this.updateDom(data))
      }
      
  
      updateDom(data) {
  
          let button = document.getElementById(`${this.id.toString()}`)   
          button.children[0].innerText = data.likes.toString()
      }
  