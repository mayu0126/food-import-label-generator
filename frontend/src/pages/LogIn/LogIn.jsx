import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomerForm from "../../components/CustomerForm/CustomerForm";
import { UserContext } from "../../index";

const loginUser = (user) => {
  //console.log(user);
  console.log(`You successfully logged in`)
  const url = process.env.REACT_APP_MY_URL;

  return fetch(`${url}/Auth/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        let errorMessage = "Login failed";
        if (data) {
          if (data["Bad credentials"]) {
            errorMessage = data["Bad credentials"][0];
          }
        }

        throw new Error(errorMessage);
      });
    }
    return res.json(); //if the response is "ok"
  });
};

const LogIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext); //connect to UserContext

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogIn = (user) => {
    setLoading(true);
    loginUser(user)
      .then((data) => {
        setLoading(false);
        context.setUser(data); //set the user in the context
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Login error:", error.message);
        setErrorMessage(error.message);
      });
  };

  /*
  useEffect(() => {
    console.log("Error message saved in the state:", errorMessage);
  }, [errorMessage]);
  */

  if (context.user) {
    return <p className="mx-auto mt-20 max-w-xs py-10 sm:py-16 lg:py-20 text-rose-700">You are already logged in.</p>;
  }

  return (
    <CustomerForm
      onCancel={() => navigate("/")}
      onSave={handleLogIn}
      disabled={loading}
      isRegister={false}
      errorMessage={errorMessage}
    />
  );
};

export default LogIn;
