import React, { Component } from 'react'

import styles from './index.module.css'

// 所有房屋配置项
const HOUSE_PACKAGE = [
  {
    id: 1,
    name: 'wardrobe',
    icon: 'icon-wardrobe'
  },
  {
    id: 2,
    name: 'washer',
    icon: 'icon-wash'
  },
  {
    id: 3,
    name: 'air conditioner',
    icon: 'icon-air'
  },
  {
    id: 4,
    name: 'gas',
    icon: 'icon-gas'
  },
  {
    id: 5,
    name: 'fridge',
    icon: 'icon-ref'
  },
  {
    id: 6,
    name: 'heat',
    icon: 'icon-Heat'
  },
  {
    id: 7,
    name: 'TV',
    icon: 'icon-vid'
  },
  {
    id: 8,
    name: 'heater',
    icon: 'icon-heater'
  },
  {
    id: 9,
    name: 'WI-FI',
    icon: 'icon-broadband'
  },
  {
    id: 10,
    name: 'SOFA',
    icon: 'icon-sofa'
  }
]


class HousePackage extends Component {
  state = {
    // 选中名称
    selectedNames: []
  }

  // 根据id切换选中状态
  toggleSelect = name => {
    const { selectedNames } = this.state
    let newSelectedNames

    // 判断该项是否选中
    if (selectedNames.indexOf(name) > -1) {
      // 选中：从数组中删除选中项，也就是保留未选中项
      newSelectedNames = selectedNames.filter(item => item !== name)
    } else {
      // 未选中：添加到数组中
      newSelectedNames = [...selectedNames, name]
    }

    // 传递给父组件
    this.props.onSelect(newSelectedNames)

    this.setState({
      selectedNames: newSelectedNames
    })
  }

  // 渲染列表项
  renderItems() {
    const { selectedNames } = this.state
    // select 的值为 true 表示 选择房屋配置；false 表示仅展示房屋列表
    // list 表示要展示的列表项
    const { select, list } = this.props

    let data
    // 如果传了 select 表示：选择 房屋配置
    // 如果没传 select 表示：展示 房屋配置 列表
    if (select) {
      data = HOUSE_PACKAGE
    } else {
      // 展示房屋配置列表
      // 从所有的列表项中过滤出要展示的（list）列表项
      data = HOUSE_PACKAGE.filter(v => list.includes(v.name))
    }

    return data.map(item => {
      // 判断该项是否选中
      const isSelected = selectedNames.indexOf(item.name) > -1

      return (
        <li
          key={item.id}
          className={[styles.item, isSelected ? styles.active : ''].join(' ')}
          onClick={select && (() => this.toggleSelect(item.name))}
        >
          <p>
            <i className={`iconfont ${item.icon} ${styles.icon}`} />
          </p>
          {item.name}
        </li>
      )
    })
  }

  render() {
    return <ul className={styles.root}>{this.renderItems()}</ul>
  }
}

// 属性默认值，防止在使用该组件时，不传 onSelect 报错
HousePackage.defaultProps = {
  onSelect: () => {}
}

export default HousePackage
