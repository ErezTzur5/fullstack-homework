const form = document.getElementById("commentForm");
form.addEventListener("submit", function (event){event.preventDefault()});


function addComment(newComment) {
    axios.post('http://localhost:8001/comments', newComment)
        .then(response => {
            console.log(response.data);
            updateDom("posted", "Comment added successfully!"+ JSON.stringify(response.data));
        })
        .catch(error => {
            console.error('There was an error adding the comment!', error);
            updateDom("posted", "Error adding comment.");
        });
}

function deleteComment() {
    const commentId = document.getElementById("commentId").value;
    axios.delete(`http://localhost:8001/comments/${commentId}`)
        .then(response => {
            console.log(response.data);
            updateDom("deleted", "Comment deleted successfully!"+JSON.stringify(response.data)  );
        })
        .catch(error => {
            console.error('There was an error deleting the comment!', error);
            updateDom("deleted", "Error deleting comment.");
        });
}

function updateDom(elementId, text) {
    document.getElementById(elementId).innerText = text;
}

function getData() {
    const titleInput = document.getElementById("title").value;
    const commentInput = document.getElementById("comment").value;

    console.log("Title: ", titleInput);
    console.log("Comment: ", commentInput);

    const newComment = {
        text: titleInput, // Assuming this should be the comment text
        postId: commentInput // Change as necessary for your logic
    };

    addComment(newComment);
    updateDom("posted", "Adding comment: " + newComment);
}
