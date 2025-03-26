const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": import.meta.env.VITE_API_BASE_URL,
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
  },
};

export default apiConfig;
