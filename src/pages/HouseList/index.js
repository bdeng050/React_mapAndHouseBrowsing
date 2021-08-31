import React from 'react'
import { Flex } from 'antd-mobile'

import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'

export default class HouseList extends React.Component{
    render(){
        return <div style={{backgroundColor:'green'}}>
            这是houseList 他是子组件
            <Flex >
      {/* 左侧白色区域 */}
      <Flex className="search">
        {/* 位置 */}
        <div className="location" onClick={() => this.props.history.push('/cityList')}>
          <span className="name"></span>
          <i className="iconfont icon-arrow" />
        </div>

        {/* 搜索表单 */}
        <div className="form" onClick={() => this.props.history.push('/cityList')}>
          <i className="iconfont icon-seach" />
          <span className="text">请输入小区或地址</span>
        </div>
      </Flex>
      {/* 右侧地图图标 */}
      <i className="iconfont icon-map" onClick={() => this.props.history.push('/cityList')} />
    </Flex>
        </div>
        
    }
}