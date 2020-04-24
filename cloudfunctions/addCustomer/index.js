// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;

  //根据openId 查询是否已经存在
  //若存在，返回code-1,msg:'用户已存在'
  //若不存在，向数据库增加数据，增加成功，返回code0
  //增加失败，返回code-1,msg:'新增失败'

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}