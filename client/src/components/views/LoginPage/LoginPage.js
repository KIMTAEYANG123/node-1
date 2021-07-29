
import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';

function LoginPage(props) {

    // 액션을 취하기 위해서 초기화 
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Error, setError] = useState();
    
    
    let test;
    console.log(Error)

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();

        let body = {
            email : Email,
            password : Password
        }

        dispatch(loginUser(body))
        .then(response =>{
            if(response.payload.loginSuccess){
                // 이전 페이지로 돌아가는 것

                props.history.push('/')
            }else{
                setError(<div>아이디 다시해라</div>)
            }
            
        })
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignContent:'center',width:'100%',height:'100vh'}}>
            <form style={{display:'flex',placeContent: 'center',flexDirection:'column'}} onSubmit ={onSubmitHandler}>
                <label>Email</label>
                <input type ="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type ="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button>
                    Login
                </button>
                {Error}
            </form>
        </div>
    )
}

export default LoginPage
