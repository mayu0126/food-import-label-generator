import React from 'react';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../index";
import ProfileData from "../../components/ProfileData/ProfileData";

const saveUserData = (user, userId) => {
    console.log(user);
    const url = process.env.REACT_APP_MY_URL;

    return fetch(`${url}/User/UpdateAsync/${userId}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token
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
    const context = useContext(UserContext); //connect to UserContext
    const navigate = useNavigate();

    const handleSaveProfileData = (user) => {
        setLoading(true);
        saveUserData(user, context.user.id)
          .then((data) => {
            setLoading(false);
            context.setUser(data); //set the user in the context
            navigate("/myprofile");
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
    />
    );
}

export default UserProfile;