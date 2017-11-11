let postsService = (() => {
    function loadAllPosts() {
        return requester.get('appdata', 'posts', 'kinvey');
    }
    
    function createPost(author, title, description, url, imageUrl) {
        let postObj = {
            author,
            title,
            description,
            url,
            imageUrl
        };

        return requester.post('appdata', 'posts', 'kinvey', postObj);
    }

    function editPost(postId, author, title, description, url, imageUrl) {
        let updatedPostObj = {
            author,
            title,
            description,
            url,
            imageUrl
        };

        return requester.update('appdata', `posts/${postId}`, 'kinvey', updatedPostObj)
    }

    function deletePost(postId) {
        return requester.remove('appdata', `posts/${postId}`, 'kinvey');
    }

    function loadOwnPosts(username) {
        let endpoint = `posts?query={"author":"${username}"}`;

        return requester.get('appdata', endpoint, 'kinvey');
    }

    function loadPostById(postId) {
        let endpoint = `posts/${postId}`;

        return requester.get('appdata', endpoint, 'kinvey');
    }

    return {
        loadAllPosts,
        createPost,
        editPost,
        deletePost,
        loadOwnPosts,
        loadPostById
    }
})()