import React, {useState} from 'react';
import './App.css';
import shortid from 'shortid';
import UserCards from './components/UserCards';

const initialState = {
  id: '',
  name: '',
  bio: ''
}

function App() {
  const [user, setUser] = useState(initialState)
  const handleChange = e => {
    setUser({
      ...user, [e.target.name]:e.target.value
    })
  }
  return (
    <div className="App">
      <form >
        <input
          name='name'
          type='text'
          placeholder='Name'
          value={user.name}
          onChange={handleChange}
        />
        <br/>
        <input
          name='bio'
          type='text'
          placeholder='Bio'
          value={user.bio}
          onChange={handleChange}
        />
        <br/>
        <button>Add New User</button>
      </form>
      <UserCards/>
    </div>
  );
}

export default App;
