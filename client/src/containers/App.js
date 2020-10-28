import React, { useState, useEffect } from 'react';
import './App.css';
import PostForm from './postForm';

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({});

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
    fetch("/api/muggers/" + id, {
      method: 'DELETE'
    }).then(() => {
       console.log('removed');
    }).catch(err => {
      console.error(err)
    }); 

    setItems([...items.filter((elem) => elem._id !== id)]);
  }

  const onChangeUser = (id) => {
    const idx = items.findIndex((el) => el._id === id);
    const oldItem = items[idx];
    const newItem = {...oldItem, 
                     action: !oldItem.action};
    setItems([...items.splice(0,idx),newItem,...items.splice(idx+1)]);
  }
  
  const onEditClick = (id) => {
    const idx = items.findIndex((el) => el._id === id);
    const oldItem = items[idx];
    const newItem = {...oldItem, 
                     name:user.name,
                     age: user.age,
                     status: user.status};
    setItems([...items.splice(0,idx),newItem,...items.splice(idx+1)]);
    console.log(user);
    
      fetch("/api/muggers/" + id, {
        method: 'PUT',
        body: JSON.stringify(
          {
            name: user.name,
            age: user.age,
            status: user.status,
          }
        ),
        headers: {
          'Content-Type': 'application/json'
      }
      }).then((response) => {
        response.json().then((response) => {
          console.log(response);
        })
      }).catch(err => {
        console.error(err)
      })
  }

  const onChangeName = (e) => {
    setUser({...user,name: e.target.value})
  }
  const onChangeAge = (e) => {
    setUser({...user,age: e.target.value})
  }
  const onChangeStatus = (e) => {
    setUser({...user,status: e.target.value})
  }
    
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
              {el.action ? <div className='effect-on-edit'>
                 <input type="text" onChange={onChangeName} defaultValue={el.name}/>
                 <input type="text" onChange={onChangeAge} defaultValue={el.age}/>
                 <input type="text" onChange={onChangeStatus} defaultValue={el.status}/>
                 <input type='button' onClick={()=>onEditClick(el._id)} value='edit'/>
               </div> : null}
            </div>
        )
      })}
    </ul>
    <PostForm newItem={newTtem}/>
    </div>
  )
}
}
export default App;
