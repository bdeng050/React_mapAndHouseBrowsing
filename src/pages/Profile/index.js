import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Button, Modal } from 'antd-mobile'
import {NavBar, Icon} from 'antd-mobile'

import { BASE_URL, isAuth,removeToken, API } from '../../utils'
import axios from 'axios'
import styles from './index.module.css'

// 菜单数据
const menus = [
  { id: 1, name: 'My Collection', iconfont: 'icon-coll', to:'./fav'},
  { id: 2, name: 'My rent', iconfont: 'icon-ind', to: '/rent' },
  // { id: 3, name: '看房记录', iconfont: 'icon-record' },
  // {
  //   id: 4,
  //   name: '成为房主',
  //   iconfont: 'icon-identity'
  // },
  // { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  // { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]

// 默认头像
const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'

const alert = Modal.alert
/* 
  1 给退出按钮绑定单击事件，创建方法 logout 作为事件处理程序。
  2 导入 Modal 对话框组件（文档）。
  3 在方法中，拷贝 Modal 组件文档中确认对话框的示例代码。
  4 修改对话框的文字提示。
  5 在退出按钮的事件处理程序中，先调用退出接口（让服务端退出），再移除本地token（本地退出）。
  6 将登陆状态 isLogin 设置为 false。
  7 清空用户状态对象。
*/

export default class Profile extends Component {
  state = {
    tokens:'',
    // 是否登录
    isLogin: '',
    // 用户信息
    userInfo: {
      avatar: '',
      nickname: ''
    },
    favList:[],
    showFavList:true
  }


  // 注意：不要忘了在进入页面时调用方法 ！
  componentDidMount() {
    const token= localStorage.getItem('hkzf_token')
    if(token!=null){
      localStorage.setItem('isLogin',true)      
    }
    else{
      localStorage.setItem('isLogin',false)     
    }
    this.getUserInfo()
  }

  logout = () => {
    alert('提示', '是否确定退出?', [
      { text: '取消' },
      {
        text: '退出',
        onPress: async () => {
          // 调用退出接口
          await API.post('/user/logout')

          // 移除本地token
          removeToken()

          // 处理状态
          this.setState({
            isLogin: false,
            userInfo: {
              avatar: '',
              nickname: ''
            }
          })
        }
      }
    ])
  }

  async getUserInfo() {
      //this.isAuth()
      
    // if (!this.state.isLogin) {
    //   // 未登录
    //   return
    // }

    // 发送请求，获取个人资料
    const token= localStorage.getItem('hkzf_token')
    console.log('TOKEN',token)
    console.log('LOGIN',localStorage.getItem('isLogin'))
    const res= await axios.get('http://localhost:8080/user/favorites',{
        headers:{
            authorization: token
        }
    })
    this.setState({
      favList: res.data.body
    })
     console.log('userFav',this.state.favList)
    if (res.data.status === 200) {
      const { avatar, nickname } = res.data.body
      this.setState({
        userInfo: {
          avatar: 'http://localhost:8080' + avatar,
          nickname
        }
      })
    } else {
      // token 失效的情况，这种情况下， 应该将 isLogin 设置为 false
      localStorage.setItem('isLogin',false)  
    }
    //console.log('avatar',this.state.userInfo)
  }
  render() {
    const { history } = this.props

    const {
      userInfo: { avatar, nickname }
    } = this.state
    const isLogin= localStorage.getItem('isLogin')
    console.log('islog',isLogin)
    console.log('info',this.state.userInfo)

    return (

      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={'http://localhost:8080/img/profile/bg.png'}
            alt="背景图"
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img
                className={styles.avatar}
                src={avatar || DEFAULT_AVATAR}
                alt="icon"
              />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{nickname || '游客'}</div>
              {/* 登录后展示： */}
              {isLogin ? (
                <>
                  <div className={styles.auth}>
                    <span onClick={this.logout}>退出</span>
                  </div>
                  <div className={styles.edit}>
                    编辑个人资料
                    <span className={styles.arrow}>
                      <i className="iconfont icon-arrow" />
                    </span>
                  </div>
                </>
              ) : (
                <div className={styles.edit}>
                  <button
                    type="primary"
                    size="small"
                    inline
                    onClick={() => history.push('/login')}
                    onClick={()=>console.log('click')}
                  >
                    去登录
                  </button>
                </div>
              )}

              {/* 未登录展示： */}
            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={2}
          hasLine={false}
          renderItem={item =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem} onClick={()=>this.state.showFavList=true}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <div className={styles.menuItem} onClick={()=>this.state.showFavList=true}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            )
          }
        />       
      </div>
    )
  }
}
