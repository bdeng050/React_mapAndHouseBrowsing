import React,{lazy} from 'react'
import { TabBar } from 'antd-mobile'
import {Route} from 'react-router-dom'
import News from '../News'
import './index.css'
import index from '../index'
import {withRouter} from 'react-router-dom'
import CityList from '../CityList'
import Profile from '../Profile'
import HouseList from '../HouseList'



export default class Home extends React.Component{
    // state = {
    //     selectedTab: this.props.location.pathname,
    //     hidden: false,
    //     fullScreen: true,
    //   };
    // render(){
    //     return <div>
    //         {/* <Route path="/home/news" component={News}></Route>
    //         <Route path="/home/index" component={index}></Route> */}
    //         {/* <Route path="/home/list" component={HouseList}></Route> */}
    //         {/* <Route path="/home/profile" component={Profile}></Route> */}
            
    //         <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
    //     <TabBar
    //       unselectedTintColor="#949494"
    //       tintColor="#33A3F4"
    //       barTintColor="white"
    //       hidden={this.state.hidden}
    //     //   noRenderContent={true}
    //     >
    //       <TabBar.Item
    //         title="首页"
    //         key="Life"
    //         icon={
    //         // <div style={{
    //         //   width: '22px',
    //         //   height: '22px',
    //         //   background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
    //         // />
    //         <i className="iconfont icon-ind"></i>
    //         }
    //         selectedIcon={<div style={{
    //           width: '22px',
    //           height: '22px',
    //           background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
    //         />
    //         }
    //         selected={this.state.selectedTab === 'home/index'}
    //         badge={1}
    //         onPress={() => {
    //           this.setState({
    //             selectedTab: 'home/index',
    //           });
    //           //redirect
    //           this.props.history.push('home/index')
    //         }}
    //         data-seed="logId"
    //       >
    //         {/* {this.renderContent('Life')} */}
    //       </TabBar.Item>
    //       <TabBar.Item
    //         icon={
    //           <div style={{
    //             width: '22px',
    //             height: '22px',
    //             background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
    //           />
    //         }
    //         selectedIcon={
    //           <div style={{
    //             width: '22px',
    //             height: '22px',
    //             background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
    //           />
    //         }
    //         title="找房"
    //         key="Koubei"
    //         badge={'new'}
    //         selected={this.state.selectedTab === 'redTab'}
    //         onPress={() => {
    //           this.setState({
    //             selectedTab: 'redTab',
    //           });
    //           this.props.history.push('home/list')
    //         }}
    //         data-seed="logId1"
    //       >
    //         {/* {this.renderContent('Koubei')} */}
    //       </TabBar.Item>
    //       <TabBar.Item
    //         icon={
    //           <div style={{
    //             width: '22px',
    //             height: '22px',
    //             background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
    //           />
    //         }
    //         selectedIcon={
    //           <div style={{
    //             width: '22px',
    //             height: '22px',
    //             background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
    //           />
    //         }
    //         title="资讯"
    //         key="Friend"
    //         dot
    //         selected={this.state.selectedTab === 'greenTab'}
    //         onPress={() => {
    //           this.setState({
    //             selectedTab: 'greenTab',
    //           });
    //           this.props.history.push('home/news')
    //         }}
    //       >
    //         {/* {this.renderContent('Friend')} */}
    //       </TabBar.Item>
    //       <TabBar.Item
    //         icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
    //         selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
    //         title="我的"
    //         key="my"
    //         selected={this.state.selectedTab === 'yellowTab'}
    //         onPress={() => {
    //           this.setState({
    //             selectedTab: 'yellowTab',
    //           });
    //         }}
    //       >
            
    //       </TabBar.Item>
    //     </TabBar>
    //   </div>
    //     </div>
    // }
}



