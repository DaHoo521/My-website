async function fetchPosts() {
    try {
      const response = await fetch('http://artportfolio.infy.uk/wp-json/wp/v2/posts?_embed');
      const posts = await response.json();
  
      let postsHtml = '';
      posts.forEach((post, index) => {
        if (index === 0) {
          // Special layout for the first post (without image)
          postsHtml += `
            <div class="col-12 mb-5 text-center">
              <h1>${post.title.rendered}</h1>
              <div>${post.content.rendered}</div>
            </div>
          `;
        } else {
          // Default card layout for other posts
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
                </div>
              </div>
            </div>
          `;
        }
      });
  
      document.getElementById('posts').innerHTML = postsHtml;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  
  // Fetch posts on page load
  fetchPosts();
  
