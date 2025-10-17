import { createUserWithEmailAndPassword } from "firebase/auth"
import { useForm } from "react-hook-form"
import { auth } from "../../firebase"
import { NavLink } from "react-router-dom"

const Signup = () => {
    const { register, handleSubmit, reset } = useForm()

    function regist(data) {
        createUserWithEmailAndPassword(auth,data.email,data.password)
        .then((user)=>{
            alert("user registration")
            reset()
            console.log(user)
        })
        .catch(err=>alert(err.message))
    }
    return (
        <>
            <form onSubmit={handleSubmit(regist)} className="col-lg-6 mx-auto my-5 p-5 shadow">
                <h2 className="text-center">Register</h2>
                <div className="mt-4">
                    <input type="text" {...register('email')} className="form-control" placeholder="enter email id" />
                </div>
                <div className="mt-4">
                    <input type="text" {...register('password')} className="form-control" placeholder="enter password" />
                </div>
                <div className="mt-5">
                    <button className="btn btn-success">register</button>
                    <NavLink to="/signin">login</NavLink>
                </div>
            </form>
        </>
    )
}

export default Signup