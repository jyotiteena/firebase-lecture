import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask, viewTask } from '../features/taskSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const taskListOption = ["Coding", "graphics", "ui/ux"];
import { deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()

  ///////// authenticate credential
  const [authUser, setAuthUser] = useState(null)

  ////// get id from url(parameter)
  const { id } = useParams()

  const { taskList } = useSelector(state => state)

  const redirect = useNavigate()

  ////// single task
  const singleTask = taskList?.find((task) => task.id === id)

  useEffect(() => {
    dispatch(viewTask())
    reset(singleTask)
  }, [dispatch, id])

  function Add(data) {
    if (id == null) {
      dispatch(createTask(data))
    } else {
      dispatch(updateTask(data))
    }
    reset()
    redirect('/')
  }

  function signupGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user.providerData[0])
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      setAuthUser(user)
    })
    // const user = auth?.currentUser;
    // setAuthUser(user)
  }, [])
  
  function logout() {
    const user = auth.currentUser;
    // deleteUser(user)
    //   .then(() => alert("logout"))
    //   .catch(err => console.log(err))
    signOut(user)
      .then(() => alert("logout"))
      .catch(err => console.log(err))
  }
  return (
    <>
      <div className="my-4">
        {
          authUser == null
            ?
            <button onClick={signupGoogle}>sign in with google</button>
            :
            (
              <>
                <h2>{authUser.displayName}</h2>
                <p>{authUser.email}</p>
                <img src={authUser?.photoURL} />
                <button onClick={logout} className="btn btn-danger">logout</button>
              </>
            )
        }
      </div>
      <form action="" onSubmit={handleSubmit(Add)} className='col-lg-6 mx-auto my-5 p-5 shadow'>
        <div className="mt-4">
          <select className='form-select' {...register('task_category')}>
            <option value="" disabled select>--select task category--</option>
            {
              taskListOption.map((ele) => (
                <option value={ele}>{ele}</option>
              ))
            }
          </select>
        </div>
        <div className="mt-4">
          <input type="text" {...register('task_title')} placeholder='add task title' className='form-control' />
        </div>
        <div className="mt-5">
          <button className='btn btn-dark'>submit</button>
        </div>
      </form>
    </>
  )
}

export default TaskForm