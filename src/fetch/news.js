import {get} from './get'
import {post} from './post'

export function getCarouselNewsData(type) {
    const result = get('/api/carousel/'+type);
    return result;
}

export function getNewsData(type) {
    const result = get('/api/news/'+type);
    return result;
}

export function getSubscribeNewsData(type) {
    const result = get('/api/subscribe/newsList/'+type);
    return result;
}

export function postAddNewsData(page) {
    const result = post('/api/addNews', {
        page: page,
    });
    return result
}

export function getNewsDetailData(id) {
    const result = get('/api/detail/'+id);
    return result;
}