
import React, {useState} from 'react';
import './App.css';

const PostForm = ({newItem}) => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [status, setStatus] = useState('');

    const data = {
        name,
        age,
        status,
        action: false
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onChangeAge = (e) => {
        setAge(e.target.value);
    }
    const onChangeStatus = (e) => {
        setStatus(e.target.value);
    }
    

    const onSubmit = (e) => {
        e.preventDefault();
        if(name, age, status === ""){
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
            <input type="text" name="name" value={name} onChange={onChangeName} placeholder="enter name"/>
            <input type="number" name="age" value={age} onChange={onChangeAge} placeholder="enter age"/>
            <input type="text" name="status" value={status} onChange={onChangeStatus} placeholder="enter status"/>
            <button type="submit">Start</button>
        </form>
    )
}

export default PostForm;