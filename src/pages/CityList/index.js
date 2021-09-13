import React from 'react'
import {NavBar, Icon} from 'antd-mobile'
import './index.scss'
import axios from 'axios'
import { getCurrentCity } from '../../utils'
import {List} from 'react-virtualized';
import { Toast } from 'antd-mobile'

const formatCityIndex=(letter)=>{
  switch(letter){
    case '#':
      return 'Current City'
    case 'hot':
      return 'popular City' 
    
    default:
      return letter.toUpperCase()
      
  }
}
// 索引（A、B等）的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

const HOUSE_CITY = ['北京', '上海', '广州', '深圳']
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
        console.log('res',res)
        const hotRes= await axios.get('http://localhost:8080/area/hot')
        //console.log(hotRes)
        const{cityList,cityIndex} = this.formatCityData(res.data.body)
        //cityList['hot']=hotRes.data.body
        // console.log(cityList)
        // console.log(cityIndex)
        cityList['hot']= hotRes.data.body
        console.log('formatCityList',cityList)
        cityIndex.unshift('hot')
        const curCity= await getCurrentCity()
        //console.log('Current City:',curCity)
        cityList['#']=[curCity]
        cityIndex.unshift('#')
        console.log(cityList['b'][0])
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
        const cityList= this.state.cityList
        //console.log('cityIndex',cityIndex)
        const letter= cityIndex[index]
        //console.log(this.state.cityList[letter])
        return (
          <div key={key} style={style} className="city">
            <div>{formatCityIndex(letter)}</div>
            {cityList[letter].map(item =>(
          <div
            className="name"
            key={item.value}
            onClick={() => this.changeCity(item)}
          >
            {item.label}
          </div>
        ))}
          </div>
        );
      }
      getRowHeight = ({ index }) => {
        // 索引标题高度 + 城市数量 * 城市名称的高度
        // TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
        const { cityList, cityIndex } = this.state
        return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
      }

      
      changeCity({ label, value }) {
        if (HOUSE_CITY.indexOf(label) > -1) {
          // 有
          localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
          this.props.history.go(-1)
        } else {
          Toast.info('该城市暂无房源数据', 1, null, false)
        }
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
          width={1300}
          height={1000}
          rowCount={this.state.cityIndex.length}
          rowHeight={this.getRowHeight}
          rowRenderer={this.rowRenderer}
        />
        {/* <ul className="city-index">
          {this.renderCityIndex()}
        </ul> */}
        </div>

        
    }
}
