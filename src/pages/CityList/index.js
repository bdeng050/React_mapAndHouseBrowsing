import React from 'react'
import {NavBar, Icon} from 'antd-mobile'
import './index.scss'
import axios from 'axios'
import { getCurrentCity } from '../../utils'
import {List} from 'react-virtualized';

const formatCityIndex=(letter)=>{
  switch(letter){
    case '#':
      return 'Current City'
    case 'hot':
      return 'popular City' 
    
    default:
      return letter
      
  }
}

export default class CityList extends React.Component{
  state ={
    cityList: {},
    cityIndex:[]
  }
    componentDidMount(){
        this.getCityList()
    }

    async getCityList(){
        const res= await axios.get('http://localhost:8080/area/city?level=1')
        //console.log(res)
        const hotRes= await axios.get('http://localhost:8080/area/hot')
        //console.log(hotRes)
        const{cityList,cityIndex} = this.formatCityData(res.data.body)
        //cityList['hot']=hotRes.data.body
        // console.log(cityList)
        // console.log(cityIndex)
        cityList['hot']= hotRes.data.body
        console.log(cityList)
        cityIndex.unshift('hot')
        const curCity= await getCurrentCity()
        console.log('Current City:',curCity)
        cityList['#']=[curCity]
        cityIndex.unshift('#')
        //console.log('cityIndex',cityIndex)
        this.setState(
          {
            cityList,
            cityIndex
          }
        )
    }

     formatCityData(list){
        const cityList = {}
        list.forEach(item => {
          const first = item.short.substr(0, 1)
          if (cityList[first]) {
            cityList[first].push(item)
          } else {
            cityList[first] = [item]
          }
        })
      
        const cityIndex = Object.keys(cityList).sort()
      
        return {
          cityList,
          cityIndex
        }
      }
      rowRenderer=({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
      }) =>{
        const cityIndex= this.state.cityIndex
        //console.log('cityIndex',cityIndex)
        const letter= cityIndex[index]
        //console.log(letter)
        return (
          <div key={key} style={style} className="city">
            <div>{formatCityIndex(letter)}</div>
            <div>ShangHai</div>
          </div>
        );
      }

    render(){
        return <div>
            <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.go(-1)}
        >
            城市选择</NavBar>
            <List
          width={300}
          height={300}
          rowCount={this.state.cityIndex.length}
          rowHeight={80}
          rowRenderer={this.rowRenderer}
        />
        </div>

        
    }
}