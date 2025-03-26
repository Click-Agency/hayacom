const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
    "Access-Control-Allow-Headers": "",
  },
};

export default apiConfig;
