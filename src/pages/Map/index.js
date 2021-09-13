import React from 'react';
import './index.scss'
import axios from 'axios'
import styles from './index.module.css'

const labelStyle = {
    // cursor: 'pointer',
    // border: '0px solid rgb(255, 0, 0)',
    // padding: '0px',
    // whiteSpace: 'nowrap',
    // fontSize: '12px',
    color: 'rgb(255, 255, 255)',
    textAlign: 'center'
  }
export default class Map extends React.Component{
    state={
        houseList: []
    }
    componentDidMount() {
        this.initMap() 
    }
    initMap(){
        //Get 'current' city from localStorage
        const{label,value}= JSON.parse(localStorage.getItem('hkzf_city'))
        //console.log(label,value)
        const map= new window.BMap.Map('container')

        this.map=map
        //console.log(map)
        //const point= new window.BMap.Point(116.404, 39.915);
        var myGeo = new window.BMap.Geocoder();         
        myGeo.getPoint(label, async point=>{      
        if (point) {      
        map.centerAndZoom(point, 11);      
        //map.addOverlay(new window.BMap.Marker(point)); 
        map.addControl(new window.BMap.NavigationControl()) 
        map.addControl(new window.BMap.ScaleControl())  

        this.renderOverlays(value)
        // const res=  await axios.get(`http://localhost:8080/area/map?id=${value}`)
        // console.log('res',res)
        // res.data.body.forEach(item=>{
        //     //const{coord:{longitude,latitude}}
        //     const areaName= item.label
        //     const count= item.count
        //     const value= item.value
        //     const opts={
        //         position: new window.BMap.Point(item.coord.longitude,item.coord.latitude),
        //         offset: new window.BMap.Size(-35,-35) 
        //     }
        //     const label= new window.BMap.Label('',opts)
        //     //console.log('label',label)
        //     label.id= value
        //     label.setContent(`
        //     <div>
        //     <p>${areaName}</p>
        //     <p>${count}Remaining</p>
        //     </div>
        //     `)
        //     //label.setStyle(labelStyle)
            
        //     label.addEventListener('click',()=>{
        //         console.log(label.id)
        //         map.centerAndZoom(new window.BMap.Point(item.coord.longitude,item.coord.latitude),13)
        //         map.clearOverlays()
        //     })
        //     map.addOverlay(label)
        // })
        
        // const opts={
        //     position: point,
        //     offset: new window.BMap.Size(-35,-35) 
        // }
        //const label= new window.BMap.Label('',opts)
        // label.setContent(
        //     '<div><p>PUDONG</p><p>99TAO</p></div>'
        // )
        //label.setStyle(labelStyle)
        
        // label.addEventListener('click',()=>{
        //     console.log('click')
        // })
        // map.addOverlay(label)
        }      
        }, 
        label);

      }

      getNextTypeZoom(){
          const zoom= this.map.getZoom()
          console.log('zoom',zoom)
          let nextZoom
          if(zoom>=10 && zoom<=12){
              nextZoom=13
          }else if(zoom>=12 && zoom<=14){
              nextZoom= 15
          }else if(zoom>=14 && zoom<=16){
            nextZoom= 15
          }
          return nextZoom
      }

      createOverlays(data,zoom){
        const areaName= data.label
        const count= data.count
        const value= data.value
        const lon= data.coord.longitude
        const lat= data.coord.latitude
        const areaPoint= new window.BMap.Point(lon,lat)
          if(zoom==13){
              this.createC(areaPoint, areaName, count, value,zoom)
          }else{
              this.createR(areaPoint, areaName, count, value)
          }
      }
      async getHouseList(id){
          const res= await axios.get(`http://localhost:8080/houses?cityId=${id}`)
          console.log('HouseList',res)
          this.setState({
              houseList: res.data.body.list
          })
      }
      createR(point,name,count,id){
        const opts={
            position: point,
            offset: new window.BMap.Size(-35,-35) 
        }
        const label= new window.BMap.Label('',opts)
        //console.log('label',label)
        label.id= id
        label.setContent(`
        <div>
        <p>${name}</p>
        <p>${count}Remaining</p>
        </div>
        `)
        //label.setStyle(labelStyle)
        
        label.addEventListener('click',()=>{
            
            this.map.centerAndZoom(point,15)
            this.getHouseList(label.id)
            this.map.clearOverlays()
            this.renderOverlays(id)
        })
        this.map.addOverlay(label)
      }
      createC(point,name,count,id,zoom){
        const opts={
                    position: point,
                    offset: new window.BMap.Size(-35,-35) 
                }
                const label= new window.BMap.Label('',opts)
                //console.log('label',label)
                label.id= id
                label.setContent(`
                <div>
                <p>${name}</p>
                <p>${count}Remaining</p>
                </div>
                `)
                //label.setStyle(labelStyle)
                
                label.addEventListener('click',()=>{
                    
                    this.map.centerAndZoom(point,zoom)
                    this.map.clearOverlays()
                    this.renderOverlays(id)
                })
                this.map.addOverlay(label)
        
      }
      
      async renderOverlays(id){
          const res= await axios.get(`http://localhost:8080/area/map?id=${id}`)
          console.log('renderOverlays',res)
          const Data=res.data.body
          const nextZoom=this.getNextTypeZoom()
          Data.forEach(item=>{
              this.createOverlays(item,nextZoom)
          })
      }

      render(){
          return <div className="map">
              <div id="container"/>
              <div
          className={[
            styles.houseList,
            styles.show
          ].join(' ')}
        >
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            {/* <Link className={styles.titleMore} to="/home/list">
              更多房源
            </Link> */}
          </div>

          <div className={styles.houseItems}>
            <h1>ww</h1>
          </div>
        </div>
          </div>
      }
}