import {request} from './request';


export function CategoryData() {
  return request({
    url: '/category'
  })
}

export function SubCategoryData(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey,
    }
  })
}

export function CategoryDetail(miniWallKey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallKey,
      type
    }
  })
}