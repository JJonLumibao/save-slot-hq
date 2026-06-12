import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../forms/ErrorMessage";
import { useAuth } from "../../context/AuthContext";
import { TextInput } from "../forms/TextInput";

export function LoginPage() {
  const { setUser, setToken } = useAuth();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const navigate = useNavigate();

  const emptyInput = usernameInput.length === 0 || passwordInput.length === 0;

  const showInvalidLoginMessage = isSubmitted && invalidLogin;

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: usernameInput, 
        password: passwordInput,
      }),
    });
    
    const data = await res.json();
    
    if(!res.ok) {
      return setInvalidLogin(true);
    }

    setUser(data.user);
    setToken(data.token);
    navigate("/home");
  }

  return (
    <div className="default-page login-page">
      <header className="header">
        <div className="header-container">
          <h1 className="header-title login-signup">Save Slot HQ</h1>
        </div>
      </header>
      <p className="form-header">Login Page</p>
      <form className="login-form"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitted(true);
          setInvalidLogin(false);
          
          await handleLogin();
          setPasswordInput("");
        }}
      >
        <TextInput 
          label="Username"
          type="text"
          placeholder=""
          value={usernameInput}
          errorMessage=""
          showError={false}
          onChange={(e) => {
            setUsernameInput(e.target.value)
            setInvalidLogin(false);
          }}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder=""
          value={passwordInput}
          errorMessage=""
          showError={false}
          onChange={(e) => {
            setPasswordInput(e.target.value)
            setInvalidLogin(false);
          }}
        /> 
        <ErrorMessage 
          message={"Username or password is incorrect"} 
          show={showInvalidLoginMessage} 
        />
        <button className="log-button btn-submit" type="submit" disabled={emptyInput}>Sign In</button>
        <h2>Don't have an account?</h2>
        <button 
          className="log-button btn-link" 
          onClick={() =>navigate("/signup")}
        >
          Create an account
        </button>
      </form>  
    </div>
  )
}