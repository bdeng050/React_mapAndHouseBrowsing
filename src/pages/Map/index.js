import React from 'react';
import './index.css'
import axios from 'axios'

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
    componentDidMount() {
        this.initMap() 
    }
    initMap(){
        const{label,value}= JSON.parse(localStorage.getItem('hkzf_city'))
        //console.log(label,value)
        const map= new window.BMap.Map('container')
        //console.log(map)
        //const point= new window.BMap.Point(116.404, 39.915);
        var myGeo = new window.BMap.Geocoder();         
        myGeo.getPoint(label, async point=>{      
        if (point) {      
        map.centerAndZoom(point, 11);      
        //map.addOverlay(new window.BMap.Marker(point)); 
        map.addControl(new window.BMap.NavigationControl()) 
        map.addControl(new window.BMap.ScaleControl())  
        const res=  await axios.get(`http://localhost:8080/area/map?id=${value}`)
        console.log('res',res)
        res.data.body.forEach(item=>{
            //const{coord:{longitude,latitude}}
            const opts={
                position: new window.BMap.Point(item.coord.longitude,item.coord.latitude),
                offset: new window.BMap.Size(-35,-35) 
            }
            const label= new window.BMap.Label('',opts)
            label.setContent(
                '<div><p>PUDONG</p><p>99TAO</p></div>'
            )
            //label.setStyle(labelStyle)
            
            label.addEventListener('click',()=>{
                console.log('click')
            })
            map.addOverlay(label)
        })
        
        const opts={
            position: point,
            offset: new window.BMap.Size(-35,-35) 
        }
        const label= new window.BMap.Label('',opts)
        label.setContent(
            '<div><p>PUDONG</p><p>99TAO</p></div>'
        )
        //label.setStyle(labelStyle)
        
        label.addEventListener('click',()=>{
            console.log('click')
        })
        map.addOverlay(label)
        }      
        }, 
        label);

      }
      render(){
          return <div className="map">
              <div id="container"/>
          </div>
      }
}