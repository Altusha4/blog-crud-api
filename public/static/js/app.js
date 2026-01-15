document.getElementById("blogForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const author = document.getElementById("author").value || "Anonymous";

    const blog = { title, body, author };

    fetch("http://localhost:3000/blogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(blog)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Blog created:", data);
            fetchBlogs();
        })
        .catch(error => console.log("Error creating blog:", error));
});

function fetchBlogs() {
    fetch("http://localhost:3000/blogs")
        .then(response => response.json())
        .then(data => {
            const blogList = document.getElementById("blogList");
            blogList.innerHTML = "";
            data.forEach(blog => {
                const li = document.createElement("li");
                li.textContent = `${blog.title} by ${blog.author}`;
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = function () {
                    showDeleteModal(blog._id);
                };
                li.appendChild(deleteBtn);
                blogList.appendChild(li);
            });
        })
        .catch(error => console.log("Error fetching blogs:", error));
}

function showDeleteModal(id) {
    const modal = document.getElementById("deleteModal");
    const confirmDelete = document.getElementById("confirmDelete");
    const cancelDelete = document.getElementById("cancelDelete");

    modal.style.display = "block";

    confirmDelete.onclick = function () {
        deleteBlog(id);
        modal.style.display = "none";
    };

    cancelDelete.onclick = function () {
        modal.style.display = "none";
    };

    document.getElementById("closeModal").onclick = function () {
        modal.style.display = "none";
    };
}

function deleteBlog(id) {
    fetch(`http://localhost:3000/blogs/${id}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {
            console.log("Blog deleted:", data);
            fetchBlogs();
        })
        .catch(error => console.log("Error deleting blog:", error));
}

fetchBlogs();