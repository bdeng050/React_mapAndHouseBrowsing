import React from 'react'
import NavHeader from '../../components/NavHeader'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'
// import { withFormik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './index.module.css'



export default class index extends React.Component{
    state={
        userName:'',
        passWord:''
    }
    getUserName=(e)=>{
        console.log(e.target.value)
        this.setState(
            {
                userName: e.target.value
            }
        )
    }
    getPassWord=(e)=>{
        console.log(e.target.value)
        this.setState(
            {
                passWord: e.target.value
            }
        )
    }
    handleSubmit= async e =>{
        e.preventDefault()
        const {userName,passWord}= this.state
        const res= await axios.post('http://localhost:8080/user/login',{
            username:userName,
            password: passWord
        })
        console.log('login res',res)
        const status= res.data.status;
        const body= res.data.body;
        const description= res.data.description
        if(status===200){
            localStorage.setItem('hkzf_token',body.token)
            this.props.history.go(-1)
                        }
        else{
            Toast.info(description,2,null,false)
        }

    }
    render(){
        const {userName, passWord}= this.state
        return(
           <div>
               <NavHeader>Login Account</NavHeader>
               <WingBlank>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value={userName}
                onChange= {this.getUserName}
                name="username"
                placeholder="Please type in your username"
              />
            </div>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                onChange= {this.getPassWord}
                value={passWord}
                name="password"
                type="password"
                placeholder="Please type in your password"
              />
            </div>
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                Login
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">No account, go register</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
           </div>
        )
    }
}