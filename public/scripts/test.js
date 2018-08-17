import {doApi} from './ajax';

doApi({
  url: 'https://jsonplaceholder.typicode.com/posts'
}).done(
  response => {
    let body = $('body'),
      counter = response.length;

    for (let post of response) {
      let postContainer = $('<div/>', {
        'class': 'post-container'
      });

      postContainer.append($('<h2/>', {
        'text': post.title,
        'class': 'post-title'
      }));

      postContainer.append($('<h3/>', {
        'text': post.body,
        'class': 'post-body',
        'style': 'font-weight: 400'
      }));

      let author = $('<div/>', {
        'class': 'post-author'
      });

      postContainer.append(author);

      if (--counter) {
        postContainer.append($('<hr/>'));
      }

      body.append(postContainer);

      doApi({
        url: `https://jsonplaceholder.typicode.com/users/${post.userId}`
      }).done(
        response => {
          author.append($('<p/>', {
            'text': `~ ${response.name}`
          }));
        }
      );
    }
  }
);
