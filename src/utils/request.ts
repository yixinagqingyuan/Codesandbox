import axios from 'axios'
const service = axios.create({
    baseURL: '',
    timeout: 5000
})
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
    }
)

service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
    }
)
export default service