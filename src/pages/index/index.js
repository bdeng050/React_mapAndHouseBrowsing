import React from 'react'
import { Carousel, WingBlank,Flex,Grid } from 'antd-mobile';
import axios from 'axios'
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
import './index.scss'
import SearchHeader from '../../components/SearchHeader'
import { getCurrentCity } from '../../utils'

// navigator.geolocation.getCurrentPosition(position=>{
//   console.log('当前位置', position)
// })
export default class index extends React.Component{
    // render(){
    //     return <div>这是首页</div>
    // }
    state = {
        swipers:[],
        imgHeight: 212,
         navs : [
          {
            id: 1,
            img: Nav1,
            title: '整租',
            path: '/home/list'
          },
          {
            id: 2,
            img: Nav2,
            title: '合租',
            path: '/home/list'
          },
          {
            id: 3,
            img: Nav3,
            title: '地图找房',
            path: '/map'
          },
          {
            id: 4,
            img: Nav4,
            title: '去出租',
            path: '/rent/add'
          }
        ],
        groups:[],
        curCityName: '上海',
        persons:[]
      }

      async getGroups() {
        const res = await axios.get('http://localhost:8080/home/groups', {
          params: {
            area: 'AREA%7C88cff55c-aaa4-e2e0'
          }
        })
    
        console.log('数据是',res)
        this.setState({
          groups: res.data.body
        })
      }

      async getSwipers(){
          const res= await axios.get('http://localhost:8080/home/swiper');
        //   console.log('The data is',res)
        const num= res.data.body
         //console.log(num[0])
          
        this.setState({
          swipers: num
        })
          // setTimeout(() => {
          //   this.setState({
          //     swipers:[num[0].imgSrc,num[1].imgSrc,num[2].imgSrc]
          //   });
          // }, 100);
           //console.log('The data is',this.state.swipers)
      }

      async getPersons(){
        const res= await axios.get('http://localhost:8081/allPerson');
        console.log('这些人是',res.data[0]);
      }
      async componentDidMount() {
        // simulate img loading
        
        this.getSwipers()
        this.getGroups()
        this.getPersons()
         //const curCity=new window.BMap.LocalCity()
         //console.log('当前城市',curCity)
      //    curCity.get(async res=>{
      //    console.log('当前城市',res)
      //    const result=await axios.get(`http://localhost:8080/area/info?name=${res.imgSrc}`)
      //    console.log(result)
      //    this.setState({
      //      curCityName:result.data.body.label
      //    })
      //  })
        const curCity= await getCurrentCity()
        console.log('Current City:',curCity)
        this.setState({
          curCityName: curCity.label
        })
        
        

      }
      renderSwipers(){
          return this.state.swipers.map(item => (
            <a
              key={item.id}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`http://localhost:8080${item.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))
      }
      renderNavs() {
        return this.state.navs.map(item => (
          <Flex.Item
            key={item.id}
            onClick={() => this.props.history.push(item.path)}
          >
            <img src={item.img} alt="" />
            <h2>{item.title}</h2>
          </Flex.Item>
        ))
      }
      render() {
        return (
          <div >
            {/* <div className="swiper"> */}
            <Carousel
              autoplay={true}
              infinite
              autoplayInterval={1000}
            >
                {this.renderSwipers()}
        </Carousel>
        <SearchHeader cityName={this.state.curCityName} />
        {/* </div> */}
        {/* ***************** */}
        {/* ********************* */}
        <Flex className="Nav">{this.renderNavs()}</Flex>
        {/* ******************** */}
        <div className="group">
        <h3 className="group-title">
            租房小组 <span className="more">更多</span>
          </h3>
        </div>
        <Grid
            data={this.state.groups}
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={item => (
              <Flex className="group-item" justify="around" key={item.id}>
                <div className="desc">
                  <p className="title">{item.title}</p>
                  <span className="info">{item.desc}</span>
                </div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
              </Flex>
            )}
          />
          {/* <div className="group">
        <h3 className="group-title">
            租房小组 <span className="more">更多</span>
          </h3>
        </div> */}
          </div>
        );
      }
}