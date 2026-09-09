// import api from "./axios";

// // ---------- PUBLIC ----------
// export const fetchPosts = (page = 1, limit = 9, tag = null) =>
//   api
//     .get("/blog", { params: { page, limit, tag } })
//     .then((res) => res.data);

// export const fetchPostBySlug = (slug) =>
//   api.get(`/blog/${slug}`).then((res) => res.data);

// // ---------- ADMIN ----------
// export const fetchAllPostsAdmin = () =>
//   api.get("/blog/admin").then((res) => res.data);

// export const fetchPostByIdAdmin = (id) =>
//   api.get(`/blog/admin/${id}`).then((res) => res.data);

// export const createPost = (data) =>
//   api.post("/blog/admin", data).then((res) => res.data);

// export const updatePost = (id, data) =>
//   api.put(`/blog/admin/${id}`, data).then((res) => res.data);

// export const togglePublish = (id) =>
//   api.patch(`/blog/admin/${id}/publish`).then((res) => res.data);

// export const deletePost = (id) =>
//   api.delete(`/blog/admin/${id}`).then((res) => res.data);

// export default api;



import api from "./axios";

// ---------- PUBLIC ----------
export const fetchPosts = (page = 1, limit = 9, tag = null) =>
  api
    .get("/blog", { params: { page, limit, tag } })
    .then((res) => res.data);

export const fetchPostBySlug = (slug) =>
  api.get(`/blog/${slug}`).then((res) => res.data);

// ---------- ADMIN ----------
export const fetchAllPostsAdmin = () =>
  api.get("/blog/admin").then((res) => res.data);

export const fetchPostByIdAdmin = (id) =>
  api.get(`/blog/admin/${id}`).then((res) => res.data);

export const createPost = (data) =>
  api.post("/blog/admin", data).then((res) => res.data);

export const updatePost = (id, data) =>
  api.put(`/blog/admin/${id}`, data).then((res) => res.data);

export const togglePublish = (id) =>
  api.patch(`/blog/admin/${id}/publish`).then((res) => res.data);

export const deletePost = (id) =>
  api.delete(`/blog/admin/${id}`).then((res) => res.data);

export default api;