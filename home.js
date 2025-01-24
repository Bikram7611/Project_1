const commentInput = document.getElementById("commentInput");
const commentList = document.querySelector(".comment-list");
const submitBtn = document.getElementById("submit");
const logoutBtn = document.getElementById("logout-btn");
const postImg = document.getElementById("postImg");
const allPost = document.querySelector(".all-post");
const captionInput = document.querySelector("#caption");
const postBtn = document.querySelector("#post-btn");
const currentUserName = document.querySelector("#current-user-name");

let CURRENT_USER = {};
console.log( CURRENT_USER);

if (JSON.parse(localStorage.getItem("CURRENT_USER")) === null) {
  CURRENT_USER = {};
} else {
  CURRENT_USER = JSON.parse(localStorage.getItem("CURRENT_USER"));

  currentUserName.innerText = CURRENT_USER.name;
}

let currentImg = "";

const create_post = (captionText, imgLink) => {
  const div = document.createElement("div");
  div.classList.add("card");
  div.style = "width: 28rem;";

  const imgEl = document.createElement("img");
  imgEl.src = imgLink;

  div.appendChild(imgEl);
  allPost.appendChild(div);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const caption = document.createElement("h5");
  caption.classList.add("card-title");
  caption.innerText = captionText;

  const ul = document.createElement("ul");
  ul.classList.add("comment-list");

  const commentBox = document.createElement("div");
  commentBox.classList.add("form-floating");

  const textArea = document.createElement("textarea");
  textArea.id = "commentInput";
  textArea.classList.add("form-control");
  textArea.classList.add("textarea");

  const label = document.createElement("label");
  label.innerText = "Comments";

  commentBox.appendChild(textArea);
  commentBox.appendChild(label);

  cardBody.appendChild(caption);
  cardBody.appendChild(ul);
  cardBody.appendChild(commentBox);

  const submitBtn = document.createElement("button");
  submitBtn.classList = "mt-3 w-25 btn btn-primary";
  submitBtn.innerText = "Submit";
  cardBody.appendChild(submitBtn);

  div.appendChild(cardBody);

  allPost.appendChild(div);
};

let ALL_POSTS = [];

if (JSON.parse(localStorage.getItem("ALL_POSTS")) === null) {
  ALL_POSTS = [];
} else {
  ALL_POSTS = JSON.parse(localStorage.getItem("ALL_POSTS"));
  console.log(ALL_POSTS);

  ALL_POSTS.map((item) => {
    create_post(item.caption, item.img);
  });

  // ALL_POSTS.map((item) => {
  //   allPost.appendChild(item);
  // });
}

let currentComment = "";

// let names = ["Alay", "Bikram", "Sayan"];
let comments = [];

console.log(commentList);

commentInput.addEventListener("input", (e) => {
  currentComment = e.target.value;
});

submitBtn.addEventListener("click", () => {
  comments.push(currentComment);
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.src =
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

  const div = document.createElement("div");
  div.classList.add("comment");

  const title = document.createElement("h6");
  title.innerText = CURRENT_USER.name;
  // names.pop();

  const p = document.createElement("p");
  p.innerText = currentComment; 

  div.appendChild(title);
  div.append(p);

  li.appendChild(img);
  li.appendChild(div);

  commentList.appendChild(li);
});

logoutBtn.addEventListener("click", () => {
  CURRENT_USER = {};
  localStorage.removeItem("CURRENT_USER");

  window.location.href = "http://127.0.0.1:5500/index.html";
});

postImg.addEventListener("change", (e) => {
  console.log(e.target.files[0]);

  currentImg = URL.createObjectURL(e.target.files[0]);
});

let CAPTION = "";

captionInput.addEventListener("change", (e) => {
  CAPTION = e.target.value;
});

postBtn.addEventListener("click", (e) => {
  create_post(CAPTION, currentImg);

  const postItem = {
    caption: CAPTION,
    img: currentImg,
  };

  ALL_POSTS.push(postItem);

  localStorage.setItem("ALL_POSTS", JSON.stringify(ALL_POSTS));
});
