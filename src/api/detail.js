import request from '@/utils/request'

export const getArticleDetailsAPI = (integer) => {
  return request({
    url: `/v1_0/articles/${integer}`
  })
}

/**
 * 点击关注
 * @param {String} id 文章id
 * @returns
 */
export const getFocusAPI = (id) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: { target: id }
  })
}

/**
 * 取消关注请求
 * @param {String|Number} id 取消关注的id
 * @returns
 */
export const unSubscribeAPI = (id) => {
  return request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取对文章的评论
 * @param {String|Number} id 文章的id
 * @returns Promise
 */
export const getCommentsAPI = (id) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source: id
    }
  })
}

/**
 * 获取对评论的评论
 * @param {String|Number} id
 * @returns Promise
 */
export const getSecondaryCommentsAPI = (id) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'c',
      source: id
    }
  })
}

export const getSendCommentsAPI = (a, b) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: a,
      content: b
    }
  })
}
