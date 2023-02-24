const newFormHandler = async (event) => {
  event.preventDefault();

//querySelectors must reference const with exact name in database Model

  const title = document.querySelector('#project-name').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  const body = document.querySelector('#project-desc').value.trim();

  if (title && body) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title,  body }),//shortcuts must match Model and const above
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create profile');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

const editButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      response.json().then((post) => {
        document.querySelector('#project-name').value = post.title;
        document.querySelector('#project-desc').value = post.body;
        document.location.replace('/profile');
        console.log(post);
      });
    } else {
      alert('Failed to find post post');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('#delete')
  .addEventListener('click', delButtonHandler);

  document
  .querySelector('#edit')
  .addEventListener('click', editButtonHandler);
