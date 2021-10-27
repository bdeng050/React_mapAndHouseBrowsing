// import React from 'react'
// import { withRouter } from 'react-router-dom'
// import SearchHeader from '../../components/SearchHeader'
// import {
//   Flex,
//   List,
//   InputItem,
//   Picker,
//   PickerView,
//   ImagePicker,
//   TextareaItem,
//   Modal,
//   Toast
// } from 'antd-mobile'

// import PropTypes from 'prop-types'

// // import Filter from './components/Filter'

// import axios from 'axios'
// import { BASE_URL, isAuth, removeToken, API } from '../../utils'
// import './index.module.css'


// const {label,value}=JSON.parse(localStorage.getItem('hkzf_city'))
// const seasons = [
//   [
//     {
//       label: '4000',
//       value: '4000',
//     },
//     {
//       label: '5000',
//       value: '5000',
//     },
//     {
//       label: '6000',
//       value: '6000',
//     },
//     {
//       label: '6000',
//       value: '6000',
//     },
// ]
// ]
  
// export default class HouseList extends React.Component{
//   state = {
//     value: null,
//     cityList :[
//       [
//         {
//           label: 'Beijing',
//           value: 'AREA|88cff55c-aaa4-e2e0',
//         },                    
//         {
//           label: 'GuangZhou',
//           value: 'AREA|e4940177-c04c-383d',
//         },
//         {
//           label: 'ShangHai',
//           value: 'AREA|dbf46d32-7e76-1196',
//         },
//         {
//           label: 'ShenZhen',
//           value: 'AREA|a6649a11-be98-b150',
//         },
//     ]
//     ],
//     list1:[],
//     list2:[],
//     houseList:[],

    
//     price:null
    
//   }


//   componentDidMount(){
//     //this.getHouseInfo()
//     this.getCity('AREA|88cff55c-aaa4-e2e0')
//     this.getCity('AREA|e4940177-c04c-383d')
//     this.getCityList()
    
//   }
  
//   async getHouseInfo(){
//     const res= await axios.get(`http://localhost:8080/houses?cityId=${value}`)
//     console.log('basicRes',res)
    
//   }

//   async getCityList(){
//     const CityList= []
//     const hotRes= await axios.get('http://localhost:8080/area/hot')
//     console.log('hotres',hotRes.data.body)
//     // this.formatCityList(hotRes.data.body)
//     //console.log('cityList',this.state.cityList)
//     // this.setState(
//     //   {
//     //     cityList:CityList
//     //   }
//     // )
//     // console.log('citylist',this.state.cityList)
//  }
//  matchList(num){
//    if(num==1){
//      return this.state.list1
//    }
//    else{
//      return this.state.list2
//    }
//  }
// //  async formatCityList(data){
// //   const ityList= []
// //   var count=0
// //   data.forEach(
// //     item=>{
// //       count=count+1
// //       //console.log('result',this.state.list2) 
// //       var list= this.matchList(count)   
// //       var city={
// //         label: item.label,
// //         value: item.value,
// //         children: list
// //       }
// //       ityList.push(city)
// //     }
// //   )
// //   console.log('citylist',ityList)
// //   this.setState(
// //       {
// //         cityList:ityList
// //       }
// //     )
// //  }
//  async getCity(id){
//    const res= await axios.get(`http://localhost:8080/area?id=${id}`)
//    const result=[]
//    const list=res.data.body
//    console.log('llllll',list)
//    for(var i=0;i<list.length;i++){
//     var c={
//       label: list[i].label,
//       value: list[i].value
//     }
//     result.push(c)
   
//    }
//     //console.log('list',result)
    
//    if(id=='AREA|88cff55c-aaa4-e2e0'){
//    this.setState(
//     {
//       list1: result
//     }
//   )
//    }
//    else{
//      this.setState(
//        {
//          list2: result
//        }
//      )
//    }
//    console.log('noting',this.state.list1)
//   }


 
//   onChange = (value) => {
//     this.setState({
//       value,
//     });
//     //console.log(this.state.value[1]);
//     this.getHouseList(this.state.value[1])
//   }
//   async getHouseList(id){
//     const res= await axios.get(`http://localhost:8080/houses?cityId=${id}`)
//     this.setState(
//       {
//         houseList:res.data.body.list
//       }
//     )
//     console.log('rress',this.state.houseList)

//   }
//   onScrollChange = (value) => {
//     console.log(value);
//   }
//   async collections(e,houseCode){
//     if(localStorage.getItem('isLogin')){
//       const token=localStorage.getItem('hkzf_token')
//       console.log('token',token)
//       const hosecode=e.houseCode
//       console.log('code',hosecode)
//       // const res= await API.post(`/user/favorites/${hosecode}`)
    
//       const res= await axios.post(`http://localhost:8080/user/favorites/${hosecode}`,null,{
//         headers:{
//             authorization: token
//         }
//     })
//     // const res= await axios.post(`http://localhost:8080/user/logout`
//     // )
//     // const res= await API.post('http://localhost:8080/user/logout',{
//     //   headers:{
//     //     authorization: token
//     //   }
//     // })
//       console.log('RRRR',res)
//       // console.log('hosuecode',houseCode)
//       // console.log('e',e.houseCode)
//     }
//     else{
//       Toast.loading('Please go login!',3,null,false)
//     }

//   }
//   onChange2 = (value) => {
//     console.log(value);
//     this.setState({
//       price:value
//     });
//     this.getHouseList(this.state.value[1],this.state.price)

//   }
//     render(){
//       console.log('fuck',this.state.cityList)
//       return(
//         <div>
//           {/* <PickerView
//           onChange={this.onChange}
//           onScrollChange={this.onScrollChange}
//           value={this.state.value}
//           data={this.state.province}
//           cascade={false}
//         /> */}
//         {/* <WhiteSpace /><WhiteSpace /> */}
//         <PickerView
//           data={this.state.cityList}
//           value={this.state.value}
//           onChange={this.onChange}
//           // onScrollChange={this.onScrollChange}
//         /> 
            
//         <PickerView
//         onChange={this.onChange2}
//         value={this.state.value}
//         data={seasons}
//         onScrollChange={this.onScrollChange}
//       />
//         <div>
//           <div>
//             <h1>Housing INFO</h1>
//           </div>
//           <div>
//           {this.state.houseList.map(item => (
//             <div>
//               <div>
//                 <img src={`http://localhost:8080${item.houseImg}`}></img>
//               </div>
//               <div>
//               House type:{item.title}
//               </div>
//               <div>
//                <h5>Price: {item.price}RMB </h5>
//                <button onClick={(e)=>this.collections(item,e)}>
//                  Save to Collection
//                </button>                         
//               </div>
//             </div>
          
//           ))}
//           </div>
//           </div>
         
          
//         </div>
//       )   
//     }
// }
// import React from 'react'
// import { withRouter } from 'react-router-dom'
// import SearchHeader from '../../components/SearchHeader'
// import{Flex} from 'antd-mobile'
// import {Toast} from 'antd-mobile'

// import PropTypes from 'prop-types'

// // import Filter from './components/Filter'
// import { PickerView, WhiteSpace,InputItem ,Picker,TextareaItem} from 'antd-mobile';
// import axios from 'axios'
// import { BASE_URL, isAuth, removeToken, API } from '../../utils'
// import './index.module.css'


// const {label,value}=JSON.parse(localStorage.getItem('hkzf_city'))
// const floorData = [
//   { label: 'High Floor', value: 'FLOOR|1' },
//   { label: 'Mid Floor', value: 'FLOOR|2' },
//   { label: 'Low Floor', value: 'FLOOR|3' }
// ]
// const cityData = [
//   { label: 'Beijing', value: 'AREA|88cff55c-aaa4-e2e0' },
//   { label: 'ShangHai', value: 'AREA|dbf46d32-7e76-1196' },
//   { label: 'GuangZhou', value: 'AREA|e4940177-c04c-383d' },
//   { label: 'ShenZhen', value: 'AREA|a6649a11-be98-b150' }
// ]

  
// export default class HouseList extends React.Component{
//   state = {
//     value: null,
//     list1:[],
//     list2:[],
//     houseList:[],
//     price:'',
//     floor:'',
//     city:''
    
//   }


//   componentDidMount(){
//     //this.getHouseInfo()
//     // this.getCity('AREA|88cff55c-aaa4-e2e0')
//     // this.getCity('AREA|e4940177-c04c-383d')
//     // this.getCityList()
//     // console.log('citylistt',this.state.cityList)
//     // console.log('list111',this.state.list1)
    
//   }
  
//   async getHouseInfo(){
//     const res= await axios.get(`http://localhost:8080/houses?cityId=${value}`)
//     console.log('basicRes',res)
    
//   }

//   async getCityList(){
//     const CityList= []
//     const hotRes= await axios.get('http://localhost:8080/area/hot')
//     console.log('hotres',hotRes.data.body)
//     this.formatCityList(hotRes.data.body)
  
//  }
//  matchList(num){
//    if(num==1){
//      return this.state.list1
//    }
//    else{
//      return this.state.list2
//    }
//  }
//  async formatCityList(data){
//   const ityList= []
//   var count=0
//   data.forEach(
//     item=>{
//       count=count+1
//       //console.log('result',this.state.list2) 
//       var list= this.matchList(count)   
//       var city={
//         label: item.label,
//         value: item.value,
//         children: list
//       }
//       ityList.push(city)
//     }
//   )
//   //console.log('citylist',ityList)
//   this.setState(
//       {
//         cityList:ityList
//       }
//     )
//  }
//  async getCity(id){
//    const res= await axios.get(`http://localhost:8080/area?id=${id}`)
//    const result=[]
//    const list=res.data.body
//    for(var i=0;i<list.length;i++){
//     var c={
//       label: list[i].label,
//       value: list[i].value
//     }
//     result.push(c)
   
//    }
//     //console.log('list',result)
    
//    if(id=='AREA|88cff55c-aaa4-e2e0'){
//    this.setState(
//     {
//       list1: result
//     }
//   )
//    }
//    else{
//      this.setState(
//        {
//          list2: result
//        }
//      )
//    }
//   }


 
//   onChange = (value) => {
//     this.setState({
//       value,
//     });
//     //console.log(this.state.value[1]);
//     this.getHouseList(this.state.value[1],this.state.price)
//   }
//   async getHouseList(id,price){
//     const res= await axios.get(`http://localhost:8080/houses?cityId=${id}&price=${price}`)
//     this.setState(
//       {
//         houseList:res.data.body.list
//       }
//     )
//     console.log('rress',this.state.houseList)

//   }
//   onScrollChange = (value) => {
//     console.log(value);
//   }
  // async collections(e,houseCode){
  //   if(localStorage.getItem('isLogin')){
  //     const token=localStorage.getItem('hkzf_token')
  //     console.log('token',token)
  //     const hosecode=e.houseCode
  //     console.log('code',hosecode)
  //     // const res= await API.post(`/user/favorites/${hosecode}`)
    
  //     const res= await axios.post(`http://localhost:8080/user/favorites/${hosecode}`,null,{
  //       headers:{
  //           authorization: token
  //       }
  //   })
  //   // const res= await axios.post(`http://localhost:8080/user/logout`
  //   // )
  //   // const res= await API.post('http://localhost:8080/user/logout',{
  //   //   headers:{
  //   //     authorization: token
  //   //   }
  //   // })
  //     console.log('RRRR',res)
  //     // console.log('hosuecode',houseCode)
  //     // console.log('e',e.houseCode)
  //   }
  //   else{
  //     Toast.loading('Please go login!',3,null,false)
  //   }

  // }
//   getValue = (name, value) => {
//     this.setState({
//       [name]: value
//     })
//   }
    // render(){
    //   return(
    //     <div>
    //       {/* <PickerView
    //       onChange={this.onChange}
    //       onScrollChange={this.onScrollChange}
    //       value={this.state.value}
    //       data={this.state.province}
    //       cascade={false}
    //     /> */}
    //     {/* <WhiteSpace /><WhiteSpace />
    //     <PickerView
    //       data={this.state.cityList}
    //       value={this.state.value}
    //       onChange={this.onChange}
    //       // onScrollChange={this.onScrollChange}
    //     />  */}
    //     <div>
    //     <Picker
    //         data={cityData}
    //         value={this.state.city}
    //         cols={1}
    //         onChange={val => this.getValue('city', val[0])}
    //       >
    //         <InputItem arrow="horizontal">Which City</InputItem>
    //       </Picker>
    //     <InputItem
    //         placeholder="Please enter your rent price"
    //         extra="￥/month"
    //         value={this.state.price}
    //         onChange={val => this.getValue('price', val)}
    //       >
    //         Price
    //       </InputItem>
    //       <Picker
    //         data={floorData}
    //         value={this.state.floor}
    //         cols={1}
    //         onChange={val => this.getValue('city', val[0])}
    //       >
    //         <InputItem arrow="horizontal">Which floor</InputItem>
    //       </Picker>
    //     </div>
    //     <div>
    //       <div>
    //         <h1>Housing INFO</h1>
    //       </div>
    //       <div>
    //       {this.state.houseList.map(item => (
    //         <div>
    //           <div>
    //             <img src={`http://localhost:8080${item.houseImg}`}></img>
    //           </div>
    //           <div>
    //           House type:{item.title}
    //           </div>
    //           <div>
    //            <h5>Price: {item.price}RMB </h5>
    //            <button onClick={(e)=>this.collections(item,e)}>
    //              Save to Collection
    //            </button>                         
    //           </div>
    //         </div>
          
    //       ))}
    //       </div>
    //       </div>
         
          
    //     </div>
    //   )   
    // }
// }
import React, { Component } from 'react'

import {
  Flex,
  List,
  InputItem,
  Picker,
  ImagePicker,
  TextareaItem,
  Modal,
  Toast
} from 'antd-mobile'

import { API } from '../../utils'
import axios from 'axios'
import NavHeader from '../../components/NavHeader'
import HousePackge from '../../components/HousePackage'
import { getCurrentCity } from '../../utils'
import styles from './index.module.css'



const alert = Modal.alert


const cityData = [
  { label: 'Beijing', value: 'AREA|88cff55c-aaa4-e2e0' },
  { label: 'ShangHai', value: 'AREA|dbf46d32-7e76-1196' },
  { label: 'GuangZhou', value: 'AREA|e4940177-c04c-383d' },
  { label: 'ShenZhen', value: 'AREA|a6649a11-be98-b150' }
]

// 朝向：
const orientedData = [
  { label: 'East', value: 'ORIEN|141b98bf-1ad0-11e3' },
  { label: 'West', value: 'ORIEN|103fb3aa-e8b4-de0e' },
  { label: 'South', value: 'ORIEN|61e99445-e95e-7f37' },
  { label: 'North', value: 'ORIEN|caa6f80b-b764-c2df' },
  { label: 'North West', value: 'ORIEN|dfb1b36b-e0d1-0977' },
  { label: 'North East', value: 'ORIEN|67ac2205-7e0f-c057' },
  { label: 'East South', value: 'ORIEN|2354e89e-3918-9cef' },
  { label: 'East West', value: 'ORIEN|80795f1a-e32f-feb9' }
]

// 楼层
const floorData = [
  { label: 'High Floor', value: 'FLOOR|1' },
  { label: 'Mid Floor', value: 'FLOOR|2' },
  { label: 'Low Floor', value: 'FLOOR|3' }
]

export default class RentAdd extends Component {
  constructor(props) {
    super(props)

    this.state = {
      houseList:[],
      // 临时图片地址
      tempSlides: [],

      // 小区的名称和id

      // 价格
      price: '',
      // 面积
      size: '',
      // 房屋类型
      roomType: '',
      // 楼层
      floor: '',
      // 朝向：
      oriented: '',
      // 房屋标题
      title: '',
      // 房屋图片
      houseImg: '',
      // 房屋配套：
      supporting: '',
      // 房屋描述
      description: '',
      city:'',
      citylabel:''
    }
  }
  async componentDidMount() {
    this.getHouseList()
    const city= await getCurrentCity()
    console.log('city',city.label)
    this.setState({
      city:city.value
    })
    this.setState({
      citylabel:city.label
    })
  }
  async getHouseList() {
    const res = await API.get('/user/houses')
    console.log('RES',res)
  }
  async collections(e,houseCode){
    if(localStorage.getItem('isLogin')){
      const token=localStorage.getItem('hkzf_token')
      console.log('token',token)
      const hosecode=e.houseCode
      console.log('code',hosecode)
      // const res= await API.post(`/user/favorites/${hosecode}`)
    
      const res= await axios.post(`http://localhost:8080/user/favorites/${hosecode}`,null,{
        headers:{
            authorization: token
        }
    })
    // const res= await axios.post(`http://localhost:8080/user/logout`
    // )
    // const res= await API.post('http://localhost:8080/user/logout',{
    //   headers:{
    //     authorization: token
    //   }
    // })
      console.log('RRRR',res)
      Toast.loading('Save to collection successfully!',3,null,false)
      // console.log('hosuecode',houseCode)
      // console.log('e',e.houseCode)
    }
    else{
      Toast.loading('Please go login!',3,null,false)
    }

  }


  onCancel = () => {
    alert('INFO', 'Give up searching?', [
      {
        text: 'Give Up',
        onPress: async () => this.props.history.go(-1)
      },
      {
        text: 'Continue searching'
      }
    ])
  }

  getValue = (name, value) => {
    this.setState({
      [name]: value
    })
  }

 
  handleSupporting = selected => {
    // console.log(selected)
    this.setState({
      supporting: selected.join('|')
    })
  }

  handleHouseImg = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      tempSlides: files
    })
  }

  addHouse = async () => {
    const {

      oriented,

      price,
    

      floor,
  
      city
    } = this.state
   


    const res= await axios.get(`http://localhost:8080/houses?cityId=${city}&price=${price}&oriented=${oriented}&floor=${floor}`)

    // if (res.data.status === 200) {

    //   Toast.info('Post Successfully', 1, null, false)
    //   this.props.history.push('/rent')
    // } else {
    //   Toast.info('Server error~, try again later please', 2, null, false)
    // }
    this.setState({
      houseList: res.data.body.list
    })
    console.log(res)
  }

  render() {
    const Item = List.Item
    const { history } = this.props
    const {
      price,
      floor,
      oriented,
      city
    } = this.state

    return (
      <div className={styles.root}>
        <NavHeader onLeftClick={this.onCancel}>Search your house</NavHeader>


        <List
          className={styles.header}
          renderHeader={() => 'Please type in your rent requirements and the filter will give you a list of houses based on your selection'}
          data-role="rent-list"
        >

          {/* <Item
            extra={community.name || '请输入小区名称'}
            arrow="horizontal"
            onClick={() => history.replace('/rent/search')}
          >
            小区名称
          </Item> */}

          <InputItem
            placeholder="Please enter the maximum price you can accept(the rent price of China is normally above 6000/month)"
            extra="￥/month"
            value={price}
            onChange={val => this.getValue('price', val)}
          >
            Price
          </InputItem>

          <Picker
            data={floorData}
            value={[floor]}
            cols={1}
            onChange={val => this.getValue('floor', val[0])}
          >
            <Item arrow="horizontal">Which floor do you want to rent</Item>
          </Picker>
          <Picker
            data={orientedData}
            value={[oriented]}
            cols={1}
            onChange={val => this.getValue('oriented', val[0])}
          >
            <Item arrow="horizontal">
              Which house direction do you want to rent
            </Item>
          </Picker>
        </List>

        <Flex className={styles.bottom}>
          <Flex.Item className={styles.cancel} onClick={this.onCancel}>
            Cancel
          </Flex.Item>
          <Flex.Item className={styles.confirm} onClick={this.addHouse}>
            Submit
          </Flex.Item>
        </Flex>
        <div>
          <div>
            <h1>Housing INFO</h1>
            <h2>Your current locatation chosen: {this.state.citylabel}</h2>
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
               <h5>Price: {item.price}RMB </h5>
               <button className={styles.button} onClick={(e)=>this.collections(item,e)}>
                 Save to Collection
               </button>                         
              </div>
            </div>
          
          ))}
          </div>
          </div>
      </div>
    )
  }
}
