let enPosts = [];

function getFacebookPosts() {
  const baseUrl = "https://graph.facebook.com";
  const pageId = "100563959805362";
  const accessToken =
    "";
  const endpoint = `/${pageId}/feed`;

  const url = `${baseUrl}${endpoint}?fields=permalink_url,message&access_token=${accessToken}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      data.data.forEach((element) => {
        if (element.message) {
          const post = element.message;
          const textFrame = post.slice(0, 10);
          const enTextOnly = textFrame.replace(/[^a-zA-Z\s]/g, "").trim();
          if (enTextOnly.length > 0) {
            enPosts.push(element);
          }
        }
      });
    })
    .then(() => {
      // render
      const posts = document.querySelectorAll(".fb-post iframe");
      let counter = 0;
      posts.forEach((post) => {
        post.setAttribute(
          "src",
          `https://www.facebook.com/plugins/post.php?href=${enPosts[counter].permalink_url}`
        );
        counter += 1;
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
getFacebookPosts();
