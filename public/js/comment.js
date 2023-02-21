const newCommentHandler = async (event) => {
  event.preventDefault();

//querySelectors must reference const with exact name in database Model

  const post_id = document.querySelector('#post_id').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  const comment = document.querySelector('#comment-input').value.trim();

  if (post_id && comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ post_id, comment }),//shortcuts must match Model and const above
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete comment');
    }
  }
};

document
  .querySelector('#make-comment')
  .addEventListener('click', newCommentHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
