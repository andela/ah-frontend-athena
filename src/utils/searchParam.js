const generateSearchParam = (tag, author, keyword) => {
  let searchParam = "";
  searchParam += `tag=${tag}`;

  if (keyword) {
    searchParam += `&keyword=${keyword}`;
  }
  if (author) {
    searchParam += `&author=${author}`;
  }

  return searchParam;
};

export default generateSearchParam;
