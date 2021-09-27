import React from 'react'
import { withRouter } from 'react-router-dom'
import SearchHeader from '../../components/SearchHeader'
import{Flex} from 'antd-mobile'
import PropTypes from 'prop-types'
// import Filter from './components/Filter'
import { PickerView, WhiteSpace } from 'antd-mobile';
import axios from 'axios'
import './index.module.css'


const {label,value}=JSON.parse(localStorage.getItem('hkzf_city'))
// const season = [
//   {
//     label: '春',
//     value: '春',
//   },
//   {
//     label: '夏',
//     value: '夏',
//   },
// ];
  
export default class HouseList extends React.Component{
  state = {
    value: null,
    cityList:[],
    list1:[],
    list2:[],
    houseList:[]

    // cityfilter: [
    //   cityList,
    //   season
    // ],
    // province : [
    //   {
    //     label: '北京',
    //     value: '01',
    //     children: [
    //       {
    //         label: '东城区',
    //         value: '01-1',
    //       },
    //       {
    //         label: '西城区',
    //         value: '01-2',
    //       },
    //       {
    //         label: '崇文区',
    //         value: '01-3',
    //       },
    //       {
    //         label: '宣武区',
    //         value: '01-4',
    //       },
    //     ],
    //   },
      
    // ]
    
  }
  //AREA|e4940177-c04c-383d

  componentDidMount(){
    //this.getHouseInfo()
    this.getCity('AREA|88cff55c-aaa4-e2e0')
    this.getCity('AREA|e4940177-c04c-383d')
    this.getCityList()
    
    // console.log('1',this.state.cityList)
    // console.log('2',this.state.season)
  }
  
  async getHouseInfo(){
    const res= await axios.get(`http://localhost:8080/houses?cityId=${value}`)
    console.log('basicRes',res)
    
  }

  async getCityList(){
    const CityList= []
    const hotRes= await axios.get('http://localhost:8080/area/hot')
    console.log('hotres',hotRes.data.body)
    this.formatCityList(hotRes.data.body)
    //console.log('cityList',this.state.cityList)
    // this.setState(
    //   {
    //     cityList:CityList
    //   }
    // )
    // console.log('citylist',this.state.cityList)
 }
 matchList(num){
   if(num==1){
     return this.state.list1
   }
   else{
     return this.state.list2
   }
 }
 async formatCityList(data){
  const ityList= []
  var count=0
  data.forEach(
    item=>{
      count=count+1
      //console.log('result',this.state.list2) 
      var list= this.matchList(count)   
      var city={
        label: item.label,
        value: item.value,
        children: list
      }
      ityList.push(city)
    }
  )
  //console.log('citylist',ityList)
  this.setState(
      {
        cityList:ityList
      }
    )
 }
 async getCity(id){
   const res= await axios.get(`http://localhost:8080/area?id=${id}`)
   const result=[]
   const list=res.data.body
   for(var i=0;i<list.length;i++){
    var c={
      label: list[i].label,
      value: list[i].value
    }
    result.push(c)
   
   }
    //console.log('list',result)
    
   if(id=='AREA|88cff55c-aaa4-e2e0'){
   this.setState(
    {
      list1: result
    }
  )
   }
   else{
     this.setState(
       {
         list2: result
       }
     )
   }
  }


 
  onChange = (value) => {
    this.setState({
      value,
    });
    //console.log(this.state.value[1]);
    this.getHouseList(this.state.value[1])
  }
  async getHouseList(id){
    const res= await axios.get(`http://localhost:8080/houses?cityId=${id}`)
    this.setState(
      {
        houseList:res.data.body.list
      }
    )
    console.log('rress',this.state.houseList)

  }
  onScrollChange = (value) => {
    console.log(value);
  }
  handleSubmit= (e) =>{
    e.preventDefault()
    console.log('click')
  }
    render(){
      return(
        <div>
          {/* <PickerView
          onChange={this.onChange}
          onScrollChange={this.onScrollChange}
          value={this.state.value}
          data={this.state.province}
          cascade={false}
        /> */}
        <WhiteSpace /><WhiteSpace />
        <PickerView
          data={this.state.cityList}
          value={this.state.value}
          onChange={this.onChange}
          // onScrollChange={this.onScrollChange}
        /> 
        <div>
          <div>
            <h1>Housing INFO</h1>
          </div>
          <div>
          {this.state.houseList.map(item => (
            <div>
              <div>
                <img src={`http://localhost:8080${item.houseImg}`}></img>
              </div>
              <div>
              House type:{item.title}
              </div>
              <div>
               <h5>Price: {item.price}RMB</h5>
               <form onSubmit={this.handleSubmit}>
               <button  type="submit">
              Login
            </button>
               </form>
              </div>
            </div>
          
          ))}
          </div>
          </div>
         
          
        </div>
      )   
    }
}
