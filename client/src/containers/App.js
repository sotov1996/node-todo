import React, { useState, useEffect } from 'react';
import './App.css';
import PostForm from './postForm';

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({});
  const [action, setAction] = useState(false);

  useEffect(() => {
    fetch('/api/muggers')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const newTtem = (item) => {
    setItems([...items,item])
  }

  const onDelete = (id) => {
    const idx = items.findIndex((el) => el._id === id);
    console.log(idx);

    fetch('/api/muggers' + "/" + id, {
      method: 'DELETE'
    }).then(() => {
       console.log('removed');
    }).catch(err => {
      console.error(err)
    }); 
    setItems([...items.slice(0,idx),...items.slice(idx+1)]);
  }

  const getNewUser = (e) => {
    e.preventDefault();
    fetch('/api/muggers' + "/" + user._id, {
      method: 'PATCH',
      body: JSON.stringify({
       items
      })
    }).then((response) => {
      response.json().then((response) => {
        console.log(response);
      })
    }).catch(err => {
      console.error(err)
    })
    setItems({...items, user});
  }

  const onChangeUser = (id) => {
    const idx = items.findIndex((el) => el._id === id);
    setUser(items[idx]);
    setAction(!action)
  }

  const onChangeName = (e) => {
    setUser({name: e.target.value})
  }
  /*const onChangeAttribute = (e) => {
    const users = e.target.value;
    setUser({});
  }*/
    
  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return(
    <div className="row">
      <ul className="list-group">
        {items.map((el,index) => {
          return(
            <div key={index} className="main-content">
              <li className="list-group-item">
                <p>{`Name is: ${el.name}`}</p>
                <p>{`Age is: ${el.age}`}</p>
                <p>{`Status is: ${el.status}`}</p>
              </li>
              <button onClick={() => onDelete(el._id)}>del</button>
              <button onClick={() => onChangeUser(el._id)}>edit</button>
            </div>
        )
      })}
    </ul>
    <PostForm newItem={newTtem}/>
    {action ? <div>
                 <input  type="sumbit" onChange={onChangeName} defaultValue={user.name}/>
                 <input defaultValue={user.age}/>
                 <input defaultValue={user.status}/>
                 <input type='button' onClick={getNewUser} value="start"/>
              </div> : <h1>sdf</h1>}
    </div>
  )
}
}
export default App;
