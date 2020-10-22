import React, { useState, useEffect } from 'react';
import './App.css';
import PostForm from './postForm';

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

<<<<<<< HEAD
  componentDidMount(){
    this.props.fetchData('/api/muggers');
  }
  render() {
    return (
      <div>
          {this.props.persons.map((el,index) => {
            return(
              <ul key={index}>
                <li>{el.name}</li>
                <li>{el.age}</li>
                <li>{el.status}</li>
              </ul>
            )
          })}
      </div>
    );
  }
}
=======
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
>>>>>>> 8638bc102771cdfe55927a94afa31414d7faead6

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
          <li className="list-group-item">
            {`Name is: ${el.name}, age is: ${el.age}, status is: ${el.status}`}
          </li>
        )
      })}
    </ul>
    <PostForm />
    </div>
  )
}
}
export default App;
