export const mobileRules = [
  { required: true, message: '请填写手机号' },
  {
    pattern:
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
    message: '手机号格式错误'
  }
]
export const codeRules = [
  { required: true, message: '请填写密码' },
  {
    pattern: /[0-9]{6}/,
    message: '密码格式错误'
  }
]
