const URL_POSTS = 'https://jsonplaceholder.typicode.com/posts';
const URL_COMMENTS = 'https://jsonplaceholder.typicode.com/comments?postId';
const bodyHtml = document.querySelector('body');
renderPost(2);

async function renderPost(postId) {
  try{
    const urlPost = await fetch(`${URL_POSTS}/${postId}`);     
    const urlComment = await fetch(`${URL_COMMENTS}=${postId}`)
    const post = await urlPost.json();                       
    const commentJson = await urlComment.json();
    bodyHtml.append(newPost(post.title,post.body)); //создаем блок с постом 
    commentJson.forEach(element => {
      const post = document.querySelector('.post') //получаем к нему доступ  и добавляем комменты           
      return post.append(newComment(element.email,element.body))
    })
  }catch(error){
    console.log(error)
  }

}

function newPost(title,body) {
  const divPost = document.createElement('div');
    divPost.id = 'post';
    divPost.className = 'post';
  const h1Html = document.createElement('h1');
    h1Html.className = 'post__title';
    h1Html.textContent = title;
  const pHtml = document.createElement('p');
    pHtml.className = 'post__text';
    pHtml.textContent = body
  const bHtml = document.createElement('b');
    bHtml.className = 'post__comments-text';
    bHtml.textContent = 'Комментарии';

  divPost.append(h1Html,pHtml,bHtml)
  return divPost
}

function newComment(email,comment){
  const divPostComments = document.createElement('div');
  divPostComments.className = 'post__comments';
  const divPostComment = document.createElement('div');
    divPostComment.className = 'post-comment';
  const spanPostCommentAuthor = document.createElement('span');
    spanPostCommentAuthor.className = 'post-comment__author';
    spanPostCommentAuthor.textContent = email;
  const spanPostCommentText = document.createElement('span')
    spanPostCommentText.className = 'post-comment__text';
    spanPostCommentText.textContent = comment;

  divPostComment.append(spanPostCommentAuthor,spanPostCommentText);
  divPostComments.append(divPostComment);
  return divPostComments
}