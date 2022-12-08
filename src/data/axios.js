import axios from "axios";

function getAxiosClient() {
    const token = sessionStorage.getItem("TOKEN");
    const axiosClient = axios.create({
        baseURL: "http://127.0.0.1:8000/api/v1",
        headers: {
            Accept: "application/json",
        },
    });

    if (token) {
        axiosClient.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
    }

    return axiosClient;
}

export { getAxiosClient };
