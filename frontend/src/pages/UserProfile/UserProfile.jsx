import { React, useState, useContext, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { UserContext } from "../../index";
import ProfileData from "../../components/ProfileData/ProfileData";

const url = process.env.REACT_APP_MY_URL;

const saveUserData = (user, userName, token) => {
    //console.log(user);
    //console.log(userName);
    //console.log(token);
    //console.log(JSON.stringify(user));
    console.log("UPDATE profile data");
    
    return fetch(`${url}/User/UpdateAsync`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
        },
        body: JSON.stringify(user),
    }).then((res) => {
        //console.log(res)
        if (!res.ok) {
            return res.json().then((data) => {
                let errorMessage = "Update failed";
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

function UserProfile() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successfulMessage, setSuccessfulMessage] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const [currentUser, setCurrentUser] = useState(""); //save actual user
    const context = useContext(UserContext); //connect to UserContext - email, userName, token
    //const navigate = useNavigate();

    const clearErrorMessage = () => {
        setErrorMessage("");
    };
    const clearSuccessfulMessage = () => {
        setSuccessfulMessage("");
    };

    useEffect(() => {
        document.addEventListener('click', clearErrorMessage);
        document.addEventListener('click', clearSuccessfulMessage);
        //remove event listeners
        return () => {
            document.removeEventListener('click', clearErrorMessage);
            document.removeEventListener('click', clearSuccessfulMessage);
        };
    }, []);

    useEffect(() => {
        console.log("GET profile data")
        fetch(`${url}/User/GetByUserNameAsync/${context.user.userName}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + context.user.token
            },
        }).then((res) => res.json()).then((data) => setCurrentUser(data))
    }, []);    

    const handleSaveProfileData = (user, userName) => {
        setLoading(true);
        //console.log(context.user); //who signed in
        //console.log(context.user.token);
        //console.log(currentUser) //result of GET
        saveUserData(user, userName, context.user.token)
          .then((data) => {
            setLoading(false);
            setCurrentUser(data); //set the user in the state
            setIsEdit(false);
            setIsDisabled(true);
            setSuccessfulMessage("You have successfully updated your user data");
          })
          .catch((error) => {
            setLoading(false);
            console.error("Edit error:", error.message);
            setErrorMessage(error.message);
          });
      };

    return (
    <ProfileData
        isEdit={isEdit}
        onEdit={() => {setIsEdit(true); setIsDisabled(false);}}
        onCancel={() => {setIsEdit(false); setIsDisabled(true);}}
        onSave={(user, userName) => handleSaveProfileData(user, userName)}
        errorMessage={errorMessage}
        successfulMessage={successfulMessage}
        disabled={loading}
        currentUser={currentUser}
        isDisabled={isDisabled}
    />
    );
}

export default UserProfile;