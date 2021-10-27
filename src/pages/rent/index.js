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

import NavHeader from '../../components/NavHeader'
import HousePackge from '../../components/HousePackage'
import styles from './index.module.css'



const alert = Modal.alert

// 房屋类型
const roomTypeData = [
  { label: 'one room', value: 'ROOM|d4a692e4-a177-37fd' },
  { label: 'two rooms', value: 'ROOM|d1a00384-5801-d5cd' },
  { label: 'three rooms', value: 'ROOM|20903ae0-c7bc-f2e2' },
  { label: 'four rooms', value: 'ROOM|ce2a5daa-811d-2f49' },
  { label: 'five rooms+', value: 'ROOM|2731c38c-5b19-ff7f' }
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

    // console.log(props)
    const { state } = props.location
    const community = {
      name: '',
      id: ''
    }

    if (state) {
      // 有小区信息数据，存储到状态中
      community.name = state.name
      community.id = state.id
    }

    this.state = {
      // 临时图片地址
      tempSlides: [],

      // 小区的名称和id
      community,
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
      description: ''
    }
  }
  componentDidMount() {
    this.getHouseList()
  }
  async getHouseList() {
    const res = await API.get('/user/houses')
    console.log('RES',res)
  }


  onCancel = () => {
    alert('INFO', 'Give up editing?', [
      {
        text: 'Give Up',
        onPress: async () => this.props.history.go(-1)
      },
      {
        text: 'Continue editing'
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
      tempSlides,
      title,
      description,
      oriented,
      supporting,
      price,
      roomType,
      size,
      floor,
      community
    } = this.state
    let houseImg = ''


    if (tempSlides.length > 0) {

      const form = new FormData()
      tempSlides.forEach(item => form.append('file', item.file))

      const res = await API.post('/houses/image', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })


      houseImg = res.data.body.join('|')
    }


    const res = await API.post('/user/houses', {
      title,
      description,
      oriented,
      supporting,
      price,
      roomType,
      size,
      floor,
      community: community.id,
      houseImg
    })

    if (res.data.status === 200) {

      Toast.info('Post Successfully', 1, null, false)
      this.props.history.push('/profile')
    } else {
      Toast.info('Server error~, try again later please', 2, null, false)
    }
  }

  render() {
    const Item = List.Item
    const { history } = this.props
    const {
      community,
      price,
      roomType,
      floor,
      oriented,
      description,
      tempSlides,
      title,
      size
    } = this.state

    return (
      <div className={styles.root}>
        <NavHeader onLeftClick={this.onCancel}>Post Your House</NavHeader>


        <List
          className={styles.header}
          renderHeader={() => 'Your House Info'}
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
            placeholder="Please enter your rent price"
            extra="￥/month"
            value={price}
            onChange={val => this.getValue('price', val)}
          >
            Price
          </InputItem>
          <InputItem
            placeholder="Please enter the area of your house"
            extra="㎡"
            value={size}
            onChange={val => this.getValue('size', val)}
          >
            House Area
          </InputItem>
          <Picker
            data={roomTypeData}
            value={[roomType]}
            cols={1}
            onChange={val => this.getValue('roomType', val[0])}
          >
            <Item arrow="horizontal">
              Room type
            </Item>
          </Picker>

          <Picker
            data={floorData}
            value={[floor]}
            cols={1}
            onChange={val => this.getValue('floor', val[0])}
          >
            <Item arrow="horizontal">Which floor</Item>
          </Picker>
          <Picker
            data={orientedData}
            value={[oriented]}
            cols={1}
            onChange={val => this.getValue('oriented', val[0])}
          >
            <Item arrow="horizontal">
              House&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;direction
            </Item>
          </Picker>
        </List>

        {/* 房屋标题 */}
        <List
          className={styles.title}
          renderHeader={() => 'House title'}
          data-role="rent-list"
        >
          <InputItem
            placeholder="Please enter your house title such as two bedroom, 2000/month"
            value={title}
            onChange={val => this.getValue('title', val)}
          />
        </List>


        <List
          className={styles.pics}
          renderHeader={() => 'House IMG'}
          data-role="rent-list"
        >
          <ImagePicker
            files={tempSlides}
            onChange={this.handleHouseImg}
            multiple={true}
            className={styles.imgpicker}
          />
        </List>


        <List
          className={styles.supporting}
          renderHeader={() => 'House configuration'}
          data-role="rent-list"
        >
          <HousePackge select onSelect={this.handleSupporting} />
        </List>

        {/* 房屋描述 */}
        <List
          className={styles.desc}
          renderHeader={() => 'Description of Your House'}
          data-role="rent-list"
        >
          <TextareaItem
            rows={5}
            placeholder="Your description of your house"
            value={description}
            onChange={val => this.getValue('description', val)}
          />
        </List>

        <Flex className={styles.bottom}>
          <Flex.Item className={styles.cancel} onClick={this.onCancel}>
            Cancel
          </Flex.Item>
          <Flex.Item className={styles.confirm} onClick={this.addHouse}>
            Submit
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}
