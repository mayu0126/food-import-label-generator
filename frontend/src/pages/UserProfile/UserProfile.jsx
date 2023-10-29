import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../index";
import ProfileData from "../../components/ProfileData/ProfileData";

const url = process.env.REACT_APP_MY_URL;

const saveUserData = (user, userId, token) => {
    console.log(user);
    console.log(userId);
    console.log(token);

    console.log(JSON.stringify(user));
    
    return fetch(`${url}/User/UpdateAsync/${userId}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
        },
        body: JSON.stringify(user),
    }).then((res) => {
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
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(""); //save actual user
    const context = useContext(UserContext); //connect to UserContext - email, userName, token
    const navigate = useNavigate();

    useEffect(() => {
        console.log("belépett a useEffectbe")
        fetch(`${url}/User/GetByUserNameAsync/${context.user.userName}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + context.user.token
            },
        }).then((res) => res.json()).then((data) => setCurrentUser(data))
    }, []);    

    const handleSaveProfileData = (user) => {
        setLoading(true);
        console.log(context.user); //who signed in
        console.log(context.user.userName);
        console.log(context.user.token);
        console.log(currentUser) //result of GET
        saveUserData(user, currentUser.id, context.user.token)
          .then((data) => {
            console.log(data);
            setLoading(false);
            setCurrentUser(data); //set the user in the state
            //navigate("/myprofile");
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
        onEdit={() => setIsEdit(true)}
        onCancel={() => setIsEdit(false)}
        onSave={handleSaveProfileData}
        errorMessage={errorMessage}
        disabled={loading}
        currentUser={currentUser}
    />
    );
}

export default UserProfile;