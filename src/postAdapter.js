class PostAdapter {


    constructor(url) {
        this.baseUrl = url; 
    }

    getPost() {
        return fetch(this.baseUrl)
            .then(r => r.json())
            .then(data => console.log(data))
    }

    fetchPost() {
        // 
    }

    deletePost() {
        
    }

    editPost() {
        
    }


}