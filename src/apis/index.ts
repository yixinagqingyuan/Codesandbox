import request from '@/utils/request'

export function templatesOfficial() {
    return request({
        url: '/api/v1/sandboxes/templates/official',
        method: 'get'
    })
}
