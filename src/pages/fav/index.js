import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Button, Modal } from 'antd-mobile'
import {NavBar, Icon} from 'antd-mobile'

import { BASE_URL, isAuth,removeToken, API } from '../../utils'
import axios from 'axios'

export default class Fav extends React.Component{
    state={
        favList:[]
    }
    componentDidMount() {
        const token= localStorage.getItem('hkzf_token')

        if(token!=null){
          localStorage.setItem('isLogin',true)      
        }
        else{
          localStorage.setItem('isLogin',false)     
        }
        
        //console.log('token',localStorage.getItem('isLogin'))
        this.getUserInfo()
      }

      async getUserInfo() {
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
    }
    render(){
        return <div>
            <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.go(-1)}
        >
            MY collection</NavBar>
            {this.state.favList.map(item => (
            <div>
              <div>
                <img src={`http://localhost:8080${item.houseImg}`}></img>
              </div>
              <div>
              House type:{item.title}
              </div>
              <div>
               <h5>Price: {item.price}RMB </h5>
               <button onClick={(e)=>this.collections(item,e)}>
                 Save to Collection
               </button>                         
              </div>
            </div>
          
          ))}
        </div>
    }
}


