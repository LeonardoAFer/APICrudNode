import { useEffect, useState, useRef } from 'react'
import './style.css'
import trash from '../../assets/trash.jpg'
import api from '../../services/api'

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/Users')

    setUsers(usersFromApi.data)

  }

  async function createUsers() {
    await api.post('/Users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUsers(id) {
     await api.delete(`/Users/${id}`)
     getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de usuarios</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName} />
        <input placeholder='Idade' name='idade' type='number' ref={inputAge} />
        <input placeholder='Email' name='E-mail' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: {user.name}</p>
            <p>Idade: {user.age}</p>
            <p>Email: {user.email}</p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={trash} />
          </button>
        </div>
      ))}


    </div>

  )
}

export default Home
