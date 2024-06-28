import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showEye, setShowEye] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    console.log(name);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log( email, password, accepted);
    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("Password must be 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("One Character Should Be Uppercase");
      return;
    }
    else if(!accepted){
        setRegisterError("please accept our terms and conditions")
        return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("register SuccessFully");

        sendEmailVerification(result.user)
        .then(() =>{
            alert('check your email and verify your account');
        })

        updateProfile(result.user,{
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(()=>console.log('profile updated'))
        .catch()
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="h-96 text-center">
      <form onSubmit={handleRegister} className="mt-10">
        <input
          className="w-1/2 p-4 mb-4 border rounded-lg"
          type="text"
          name="name"
          id=""
          placeholder="Your Name"
        />
        <br />
        <input
          className="w-1/2 p-4 mb-4 border rounded-lg"
          type="email"
          name="email"
          id=""
          placeholder="Your Email"
          required
        />
        <br />
        <div className="relative">
          <input
            className="w-1/2 p-4 mb-4 border rounded-lg"
            type={showEye ? "text": "password"}
            name="password"
            id=""
            placeholder="Your Password"
            required
          />
          <span onClick={() => setShowEye(!showEye)} className="absolute top-5 right-[400px]">
            {
                showEye ? <IoMdEye size={20}/> : <IoMdEyeOff size={20}/>
            }
            </span>
        </div>
        <br />
       <div>
       <input type="checkbox" name="terms" id="" />
       <label htmlFor="terms">Accept Our Terms And Condition </label>
       </div>
        <br />
        <button className="w-1/2 btn bg-secondary hover:bg-[#FF10F0] text-white">Register</button>   
      </form>
      {registerError && <p className="text-red-500"> {registerError} </p>}
      {success && <p className="text-green-500">{success}</p>}
      <p>Already Have An Account?Please<NavLink className="text-primary underline" to="/login">Login</NavLink></p>
    </div>
  );
};

export default Register;
