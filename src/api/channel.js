import request from '@/utils/request'

/**
 * 获取用户自己的频道
 * @returns Promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 * 删除频道
 * @param {Number|string}id 频道的id
 * @returns Promise
 */
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**
 *新增频道
 * @param {String|Number} id 新增频道的id
 * @param {Number} seq 新增频道添加到索引
 * @returns Promise
 */
export const addAllChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
