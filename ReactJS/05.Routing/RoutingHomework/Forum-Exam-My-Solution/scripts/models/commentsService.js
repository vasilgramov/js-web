let commentsService = (() => {
    function loadAllCommentsInPost(postId) {
        let endpoint = `comments?query={"postId":"${postId}"}`;

        return requester.get('appdata', endpoint, 'kinvey');
    }

    function createComment(author, content, postId) {
        let commentData = {
            author,
            content,
            postId
        };

        return requester.post('appdata', 'comments', 'kinvey', commentData);
    }

    function deleteComment(commentId) {
        return requester.remove('appdata', `comments/${commentId}`, 'kinvey');
    }

    return {
        loadAllCommentsInPost,
        createComment,
        deleteComment
    }
})()