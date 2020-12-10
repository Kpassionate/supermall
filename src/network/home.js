import {request} from './request';

export function HomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}

export function HomeGoodsData(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}