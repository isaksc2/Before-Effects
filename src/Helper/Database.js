export function parsePosts(document) {
  return document.posts.split("¤").map((post) => {
    const es = post.split(";");
    return { vID1: es[0], vID2: es[1], title: es[2], postID: es[3] };
  });
}

export function postsExist(document) {
  return document && document.posts;
}
