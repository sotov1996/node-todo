import React, { useState} from 'react';
import './App.css';

const PostForm = ({newItem}) => {

 
    const [data, setDate] = useState({action: false});

    const onChangeName = (e) => {
        setDate({...data, name: e.target.value});
    }
    const onChangeAge = (e) => {
        setDate({...data, age: e.target.value});
    }
    const onChangeStatus = (e) => {
        setDate({...data, status: e.target.value});
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(data.name, data.age, data.status === ""){
            alert('Введить данные');
            return
        }else{
            fetch('/api/muggers', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => console.log(data));
            newItem(data);

        }
    }

    return(
        <form className="form" onSubmit={onSubmit}>
            <input type="text" name="name" value={data.name} onChange={onChangeName} placeholder="enter name"/>
            <input type="number" name="age" value={data.age} onChange={onChangeAge} placeholder="enter age"/>
            <input type="text" name="status" value={data.state} onChange={onChangeStatus} placeholder="enter status"/>
            <button type="submit">Start</button>
        </form>
    )
}

export default PostForm;