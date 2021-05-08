const URL = "https://jsonplaceholder.typicode.com";

const getUsers = async () => {
  const response = await fetch(`${URL}/users`);
  const data = await response.json();
  renderUsers(data);
  usersListener();
};

const renderUsers = (users) => {
  const sect = document.querySelector("#users");
  users.forEach((user) => {
    sect.innerHTML += `<div id="user_${user.id}">
      <h2>${user.username}</h2>
      </div>`;
  });
};

const usersListener = () => {
  const list = document.querySelectorAll("#users div");
  for (let item of list) {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const [, id] = event.currentTarget.id.split("_"); // -> [user, id]
      document.querySelector("#tabs").classList.remove("hidden");
      getInfo(id);
      getTodos(id);
      getPosts(id);
      getAlbums(id);
    });
  }
};

//// info
const getInfo = async (id) => {
  const response = await fetch(`${URL}/users/${id}`);
  const data = await response.json();
  document.querySelector(
    "#info_content"
  ).innerHTML = `<h4>Name:</h4> ${data.name}; <br>
        <h4>E-Mail:</h4> ${data.email}; <br>
        <h4>Adress:</h4> City - ${data.address.city}, Street - ${data.address.street}, Suit -  ${data.address.suite}; <br>
        <h4>Phone:</h4> ${data.phone};  <br>
        <h4></h4>`;
};
/////todos
const getTodos = async (id) => {
  const response = await fetch(`${URL}/todos?userId=${id}`);
  const data = await response.json();
  renderToDos(data);
};

const renderToDos = (todos) => {
  document.querySelector("#todo_content").innerHTML = "";
  todos.forEach((todo) => {
    document.querySelector(
      "#todo_content"
    ).innerHTML += `<li>${todo.title}</li> </br>`;
  });
};

/////posts

const getPosts = (id) => {
  fetch(`${URL}/posts?userId=${id}`)
    .then((response) => response.json())
    .then((data) => {
      renderPost(data);
    });
};

const renderPost = (posts) => {
  document.querySelector("#posts_content").innerHTML = "";
  posts.forEach((post) => {
    document.querySelector("#posts_content").innerHTML += `
        <h3>${post.title}</h3>
        <p>${post.body}</p>`;
  });
};
////// albums
const getAlbums = (id) => {
  fetch(`${URL}/albums?userId=${id}`)
    .then((response) => response.json())
    .then((data) => {
      renderAlbum(data);
    });
};

const renderAlbum = (albums) => {
  document.querySelector("#albums_content").innerHTML = "";
  albums.forEach((album) => {
    document.querySelector("#albums_content").innerHTML += `
          <h3>${album.title}</h3>`;
  });
};

//////слушатель на табсы

const tabsListener = () => {
  const tabs = document.querySelectorAll("#tabsWrapper div");
  for (let tab of tabs) {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      const divs = document.querySelectorAll("#content div");
      const id = event.currentTarget.id;
      for (let div of divs) {
        if (id === div.id.split("_")[0]) {
          div.classList.remove("hidden");
          continue;
        }
        div.classList.add("hidden");
      }
    });
  }
};

const main = () => {
  getUsers();
  tabsListener();
};

main();
