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
            fetchBlogs(); // Refresh the blog list
        })
        .catch(error => console.log("Error creating blog:", error));
});

function fetchBlogs() {
    fetch("http://localhost:3000/blogs")
        .then(response => response.json())
        .then(data => {
            const blogList = document.getElementById("blogList");
            blogList.innerHTML = "";  // очищаем перед добавлением новых элементов
            data.forEach(blog => {
                const li = document.createElement("li");
                li.textContent = `${blog.title} by ${blog.author}`;
                blogList.appendChild(li);
            });
        })
        .catch(error => console.log("Error fetching blogs:", error));
}

fetchBlogs();