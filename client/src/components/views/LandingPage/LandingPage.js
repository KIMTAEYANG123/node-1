import React,{useEffect} from 'react'
import axios from "axios"
import Cookies from 'universal-cookie';

function LandingPage(props) {
    const cookies = new Cookies();
    let logButton;
    console.log(cookies.get('x_auth'))
    useEffect(()=>{
        axios.get('/api/hello')
        .then(response=> console.log(response) )
    },[])
   
    const onClickHandler = ()=>{
        axios.get(`/api/users/logout`)
        .then(response=>{
            if(response.data.success){
                cookies.remove('x_auth')
                props.history.push('/login')
            }else{
                alert('로그아웃 하는데 실패함')
            }
        })
    }
    if(cookies.get('x_auth')){
        logButton = <button style={{display:'block'}}onClick={onClickHandler}>로그아웃</button>;
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignContent:'center',width:'100%',height:'100vh'}}>
            <div style={{display:'flex', flexDirection:'column', alignContent:'center',height:'4vh'}}>
                <h2>시작페이지</h2>
                {logButton}
            </div>
        </div>
    )
}

export default LandingPage
