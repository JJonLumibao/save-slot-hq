import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmailValid } from "../utils";
import { TextInput } from "../forms/TextInput";
import { capitalize } from "../utils";
import toast from "react-hot-toast";

export function SignUpPage() {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [reTypePasswordInput, setReTypePasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [usernameServerError, setUsernameServerError] = useState("");
  const [emailServerError, setEmailServerError] = useState("");

  const firstNameErrorMessage = "First name must be at least 2 characters long";
  const lastNameErrorMessage = "Last name must be at least 2 characters long";
  const usernameErrorMessage = 
    usernameInput.length < 2
      ? "Username must be at least 2 characters long"
      : usernameServerError;
  const passwordErrorMessage = "Password must be at least 8 characters long";
  const reTypePasswordErrorMessage = "Passwords must match";
  const emailErrorMessage = 
    !isEmailValid(emailInput)
      ? "Email is invalid"
      : emailServerError;

  const showFirstNameError = isSubmitted && firstNameInput.length < 2;
  const showLastNameError = isSubmitted && lastNameInput.length < 2;
  const showUsernameError = isSubmitted && (usernameInput.length < 2 || usernameServerError !== "");
  const showPasswordError = isSubmitted && passwordInput.length < 8;
  const showReTypePasswordError = isSubmitted && passwordInput !== reTypePasswordInput;
  const showEmailError = isSubmitted && (!isEmailValid(emailInput) || emailServerError !== "");

  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstNameInput,
        lastName: lastNameInput,
        username: usernameInput,
        password: passwordInput,
        email: emailInput
      }),
    });

    const data = await res.json();

    if(!res.ok) {
      setUsernameServerError("");
      setEmailServerError("");

      if (data.errors?.username) {
        setUsernameServerError("Username already exists");
      }

      if (data.errors?.email) {
        setEmailServerError("Email already exists");
      }

      return false;
    };
    
    return true;

  }

  const handleReturnToLogin = () => {
    toast.success("Account created successfully");
    navigate("/login");
  };

  return (
    <div className="default-page signup-page">
      <header className="header">
        <div className="header-container">
          <h1 className="header-title login-signup">Save Slot HQ</h1>
        </div>
      </header>
      <p className="form-header">Sign Up Page</p>
      <form className="signup-form"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitted(true);

          if(
            firstNameInput.length < 2 || 
            lastNameInput.length < 2 || 
            usernameInput.length < 2 || 
            passwordInput.length < 8 || 
            passwordInput !== reTypePasswordInput || 
            !isEmailValid(emailInput)
          ) {
            return;
          }
          const success = await handleSignup();

          if(success) {
            handleReturnToLogin();
          }
        }}
      >
        <TextInput 
          label="First Name"
          type="text"
          placeholder="e.g. John"
          maxLength={30}
          value={firstNameInput}
          errorMessage={firstNameErrorMessage}
          showError={showFirstNameError}
          onChange={(e) => {
            setFirstNameInput(capitalize(e.target.value));
          }}
        />
        <TextInput 
          label="Last Name"
          type="text"
          placeholder="e.g. Smith"
          maxLength={30}
          value={lastNameInput}
          errorMessage={lastNameErrorMessage}
          showError={showLastNameError}
          onChange={(e) => {
            setLastNameInput(capitalize(e.target.value));
          }}
        />
        <TextInput 
          label="Username"
          type="text"
          placeholder="e.g. JohnSmith123"
          maxLength={20}
          value={usernameInput}
          errorMessage={usernameErrorMessage}
          showError={showUsernameError}
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
        />
        <TextInput 
          label="Password"
          type="password"
          placeholder="Must be at least 8 characters long"
          value={passwordInput}
          errorMessage={passwordErrorMessage}
          showError={showPasswordError}
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
        />
        <TextInput 
          label="Re-Type Password"
          type="password"
          placeholder=""
          value={reTypePasswordInput}
          errorMessage={reTypePasswordErrorMessage}
          showError={showReTypePasswordError}
          onChange={(e) => {
            setReTypePasswordInput(e.target.value);
          }}
        />
        <TextInput 
          label="Email"
          type="text"
          placeholder="e.g. johnsmith@email.com"
          value={emailInput}
          errorMessage={emailErrorMessage}
          showError={showEmailError}
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
        />
        <button className="log-button btn-submit">Create account</button>
        <h2>Already have an account?</h2>
        <button 
          className="log-button btn-link"
          onClick={() => navigate("/login")}
        >
          Back to Login Page
        </button>
      </form>
    </div>
  )

}