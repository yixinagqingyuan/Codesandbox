import axios from 'axios'
const service = axios.create({
    baseURL: 'https://idot.58corp.com',
    timeout: 5000
})
service.interceptors.request.use(
    config => {

    },
    error => {
    }
)

service.interceptors.response.use(
    response => {
    },
    error => {
    }
)
export default service