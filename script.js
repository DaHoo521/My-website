async function fetchPosts() {
    try {
      const response = await fetch('http://my-bootstrap-cms.local/wp-json/wp/v2/posts?_embed');
      const posts = await response.json();
  
      let postsHtml = '';
      posts.forEach(post => {
        const imageUrl = post._embedded && post._embedded['wp:featuredmedia'] 
                          ? post._embedded['wp:featuredmedia'][0].source_url 
                          : 'default-image.jpg';
  
        postsHtml += `
          <div class="col-md-4">
            <div class="card mb-4">
              <img src="${imageUrl}" class="card-img-top" alt="${post.title.rendered}">
              <div class="card-body">
                <h5 class="card-title">${post.title.rendered}</h5>
                <p class="card-text">${post.excerpt.rendered}</p>
                <a href="${post.link}" class="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
        `;
      });
  
      document.getElementById('posts').innerHTML = postsHtml;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  
  // Fetch posts on page load
  fetchPosts();
  