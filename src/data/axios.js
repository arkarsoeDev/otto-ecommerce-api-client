import axios from "axios";

function getAxiosClient(token) {
    const axiosClient = axios.create({
        baseURL: "http://127.0.0.1:8000",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    axiosClient.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return axiosClient
}

export { getAxiosClient };   