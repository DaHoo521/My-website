async function fetchPosts() {
  try {
    const response = await fetch('https://jsonproxy.io/api/v1?url=' + encodeURIComponent('https://artportfolio.infy.uk/wp-json/wp/v2/posts?_embed'));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      throw new Error("No content received from the API");
    }

    const posts = data; // JSONProxy directly returns parsed content

    let postsHtml = '';
    posts.forEach((post, index) => {
      if (index === 0) {
        postsHtml += `
          <div class="col-12 mb-5 text-center">
            <h1>${post.title.rendered}</h1>
            <div>${post.content.rendered}</div>
          </div>
        `;
      } else {
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

fetchPosts();
