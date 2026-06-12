import { useState } from "react";
import { isEmailValid } from "../utils";
import { TextInput } from "../forms/TextInput";
import { capitalize } from "../utils";
import toast from "react-hot-toast";
import { Header } from "../sections/Header";
import { useAuth } from "../../context/AuthContext";

export function AccountDetailsPage() {
  const { user, setUser, token } = useAuth();
  const [firstNameInput, setFirstNameInput] = useState(user?.firstName ?? "");
  const [lastNameInput, setLastNameInput] = useState(user?.lastName ?? "");
  const [usernameInput, setUsernameInput] = useState(user?.username ?? "");
  const [passwordInput, setPasswordInput] = useState("");
  const [reTypePasswordInput, setReTypePasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState(user?.email ?? "");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [usernameServerError, setUsernameServerError] = useState("");
  const [emailServerError, setEmailServerError] = useState("");

  const isChangingPassword = passwordInput.length > 0;
  
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
  const showPasswordError = isSubmitted && isChangingPassword && passwordInput.length < 8;
  const showReTypePasswordError = isSubmitted && isChangingPassword && passwordInput !== reTypePasswordInput;
  const showEmailError = isSubmitted && (!isEmailValid(emailInput) || emailServerError !== "");

  const handleUpdateAccount = async () => {
    if (!user) return false;

    setIsSaving(true);
    setUsernameServerError("");
    setEmailServerError("");

    try {
      const payload: Record<string, string> = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        username: usernameInput, 
        email: emailInput,
      };
  
      if (passwordInput) {
        payload.password = passwordInput;
      }
  
      const res = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
  
      if(!res.ok) {
  
        if (data.errors?.username) {
          setUsernameServerError("Username already exists");
        }
  
        if (data.errors?.email) {
          setEmailServerError("Email already exists");
        }
  
        throw new Error("Failed to update user");
      };
    
      setUser(data);
      return true;

    } catch (e) {
      console.log("Error:", e);
      toast.error("An error occured");
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="default-page account-info-page">
      <Header />
      <p className="form-header">Account Information</p>
      <form className="signup-form"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitted(true);

          if(
            firstNameInput.length < 2 || 
            lastNameInput.length < 2 || 
            usernameInput.length < 2 || 
            !isEmailValid(emailInput)
          ) {
            return;
          }

          if (
            isChangingPassword &&
            (
              passwordInput.length < 8 ||
              passwordInput !== reTypePasswordInput
            )
          ) {
            return;
          }

          const success = await handleUpdateAccount();
          if (success) {
            setPasswordInput("");
            setReTypePasswordInput("");
            toast.success("Account updated successfully");
          }
        }}
      >
        <TextInput 
          label="First Name"
          type="text"
          placeholder="i.e. John"
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
          placeholder="i.e. Smith"
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
          placeholder="i.e. JohnSmith123"
          maxLength={20}
          value={usernameInput}
          errorMessage={usernameErrorMessage}
          showError={showUsernameError}
          onChange={(e) => {
            setUsernameInput(e.target.value);
            setUsernameServerError("");
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
          placeholder="i.e. johnsmith@email.com"
          value={emailInput}
          errorMessage={emailErrorMessage}
          showError={showEmailError}
          onChange={(e) => {
            setEmailInput(e.target.value);
            setEmailServerError("");
          }}
        />
        <button 
          className="btn-save"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )

}