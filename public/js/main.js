const output = document.querySelector("#output");
const button = document.querySelector("#get-posts-btn");
// const formBtn = document.querySelector("#dd-post-form");
const form = document.querySelector("#add-post-form");
// Get and show posts
async function showPosts() {
  try {
    const res = await fetch("http://localhost:8000/api/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await res.json();
    output.innerHTML = "";

    posts.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.textContent = post.title;
      output.appendChild(postEl);
    });
  } catch (err) {
    console.log("Error fetching posts: ", err);
  }
}

// Submit new post
const addPost = async (e) => {
  console.log("Hello");
  e.preventDefault();
  const formData = new FormData(e.target);
  const title = formData.get("title");

  try {
    const res = await fetch("http://localhost:8000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      throw new Error("Failed to submit post");
    }

    const newPost = await res.json();
    const postEl = document.createElement("div");
    postEl.textContent = newPost.title;
    output.appendChild(postEl);
    showPosts();
  } catch (error) {
    console.log("Error not posting: ", error);
  }
};

// Event Listeners
button.addEventListener("click", showPosts);
form.addEventListener("submit", addPost);
