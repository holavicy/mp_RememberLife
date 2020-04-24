// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();
const $ = db.command.aggregate;
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;

  //根据openId 查询是否已经存在
  const res = await db.collection('customers').where({
    id: openId
  }).get();
  const arr = res.data;
  console.log(arr);

  if (arr.length > 0) {//若存在，返回code-1,msg:'用户已存在'
    return{
      code:0,
      openid: openId,
      msg:'用户已存在'
    }
  } else {//若不存在，向数据库增加数据，增加成功，返回code0
    let data = {
      id: openId,
      status:1,
      is_admin:false,
      create_time: db.serverDate()
    }
    return await db.collection('customers').add({
      data: data
    }).then((res) => {
      if(res._id){
        return{
          code:0,
          openid: openId
        }
      } else {
        return{
          code:-1,
          msg:'新增失败'
        }
      }
    }).catch((err) => {
      return err
    })
  }
  
  
  //增加失败，返回code-1,msg:'新增失败'

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}