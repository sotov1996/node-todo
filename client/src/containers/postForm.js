import React, {useState} from 'react';

const PostForm = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [status, setStatus] = useState('');

    const newPerson = {
        name,
        age,
        status
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
        props.fetchPost('/api/muggers',{
            methode: 
        })
    }

    return(
        <form onSubmit={onSubmit}>
            <input type="text" name="name" value={name} onChange={onChangeName}/>
            <input type="text" name="name" value={age} onChange={onChangeAge}/>
            <input type="text" name="name" value={status} onChange={onChangeStatus}/>
            <button type="submit"></button>
        </form>
    )
}

export default PostForm;