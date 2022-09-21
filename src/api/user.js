// user.js划分是根据后端接口文档
import request from '@/utils/request'

/**
 *
 * @param {String} mobile 手机号
 * @param {Number} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户信息
 * @returns Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}

export const uploadPhoto = (file) => {
  const fm = new FormData()
  fm.append('photo', file)

  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

/**
 * 获取个人资料
 * @returns Promise
 */
export const getProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 *
 * @param {String} name  昵称
 * @param {String} gender  性别
 * @param {String} birthday  生日
 * @param {String} real_name  真实姓名
 * @param {String} intro   个人介绍
 * @returns
 */
/* eslint-disable */
export const savePersonalDataAPI = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: data
  })
}
