import React, { Component } from 'react'
export default class index extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
  
      // 为了在回调中使用 `this`，这个绑定是必不可少的
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
    //   this.setState(prevState => ({
    //     isToggleOn: !prevState.isToggleOn
    //   }));
    console.log('click')
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          {/* {this.state.isToggleOn ? 'ON' : 'OFF'} */}
          click
        </button>
      );
    }
  }
  
 