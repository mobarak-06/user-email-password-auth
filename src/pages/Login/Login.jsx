import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [registerError, setRegisterError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null)

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setRegisterError("");
    setSuccess("");

    if(password.length < 6){
        setRegisterError('please provide 6 characters password');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (result.user.emailVerified) {
            setSuccess("user login successFully");
        } else {
            alert('please verify our email')
        }
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
    .then(() => {
        alert("check your email and reset your password")
    })
    .catch(error => {
        console.error(error);
    })
  }
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  ref={emailRef}
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <span
                  className="absolute top-12 right-4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye/> }
                </span>
                <label className="label">
                  <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              {registerError && <p className="text-red-500">{registerError}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <p>New To This Website?Please<NavLink className="text-primary underline" to="/register">Register</NavLink></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
