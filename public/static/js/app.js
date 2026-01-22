const blogForm = document.getElementById("blogForm");
const blogIdInput = document.getElementById("blogId");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEdit");
const formTitle = document.getElementById("formTitle");
const blogList = document.getElementById("blogList");
const refreshBtn = document.getElementById("refreshBtn");

blogForm.onsubmit = (e) => {
    e.preventDefault();

    const id = blogIdInput.value;
    const titleValue = document.getElementById("title").value;
    const bodyValue = document.getElementById("body").value;
    const authorValue = document.getElementById("author").value;

    if (titleValue.trim().length === 0 || bodyValue.trim().length === 0) {
        alert("Error: Title and Body cannot be empty or contain only spaces!");
        return;
    }

    const data = {
        title: titleValue.trim(),
        body: bodyValue.trim(),
        author: authorValue.trim() || "Anonymous"
    };

    fetch(id ? `/blogs/${id}` : "/blogs", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(async res => {
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Operation failed");
            return result;
        })
        .then(() => {
            resetForm();
            fetchBlogs();
        })
        .catch(err => alert(err.message));
};

function fetchBlogs() {
    fetch("/blogs")
        .then(res => res.json())
        .then(data => {
            blogList.innerHTML = "";
            data.forEach(blog => {
                const li = document.createElement("li");
                li.className = "blog-card";
                li.innerHTML = `
                    <h3>${blog.title}</h3>
                    <p>${blog.body}</p>
                    <span class="author">By: ${blog.author}</span>
                    <div class="card-actions">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `;
                li.querySelector(".edit-btn").onclick = () => fillForm(blog);
                li.querySelector(".delete-btn").onclick = () => deletePost(blog._id);
                blogList.appendChild(li);
            });
        });
}

function deletePost(id) {
    if (confirm("Are you sure you want to delete this post?")) {
        fetch(`/blogs/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error("Delete failed");
                fetchBlogs();
            })
            .catch(err => alert(err.message));
    }
}

function fillForm(blog) {
    blogIdInput.value = blog._id;
    document.getElementById("title").value = blog.title;
    document.getElementById("body").value = blog.body;
    document.getElementById("author").value = blog.author;
    formTitle.innerText = "Edit Post";
    submitBtn.innerText = "Update Post";
    cancelEditBtn.style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    blogForm.reset();
    blogIdInput.value = "";
    formTitle.innerText = "Create a New Blog Post";
    submitBtn.innerText = "Create Post";
    cancelEditBtn.style.display = "none";
}

cancelEditBtn.onclick = resetForm;
refreshBtn.onclick = fetchBlogs;

fetchBlogs();