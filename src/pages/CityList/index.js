import React from 'react'
import {NavBar, Icon} from 'antd-mobile'
import axios from 'axios'
import { getCurrentCity } from '../../utils'
import {List} from 'react-virtualized';
import { Toast } from 'antd-mobile'
import { Button, Space } from 'antd-mobile'
import './index.scss'

export default class CityList extends React.Component{
  state ={
    cityList: ['北京', '上海', '广州', '深圳']

  }
  componentDidMount(){
    this.getCity()
    console.log(this.getCity(1))
  }
  async getCity(){
    const hotRes= await axios.get('http://localhost:8080/area/hot')
    console.log('hot',hotRes.data.body)
  }
      changeCity({ label, value }) {
   

          localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
          this.props.history.go(-1)
      }
    render(){
        return <div>
            <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.go(-1)}
        >
            Choose Your Current City
            </NavBar> 
          <Button color='primary'onClick={()=>this.changeCity({label: 'Beijing', value: 'AREA|88cff55c-aaa4-e2e0'})}>Beijing</Button>
          <Button color='success'onClick={()=>this.changeCity({label: 'ShangHai', value: 'AREA|dbf46d32-7e76-1196'})}>ShangHai</Button>
          <Button color='danger'onClick={()=>this.changeCity({label: 'GuangZhou', value: 'AREA|e4940177-c04c-383d'})}>GuangZhou</Button>
          <Button color='warning'onClick={()=>this.changeCity({label: 'ShenZhen', value: 'AREA|a6649a11-be98-b150'})}>ShenZhen</Button> 
        </div>        
    }
}
