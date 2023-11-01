import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../index";

import LabelTable from "../../components/LabelTable/LabelTable";

//This page will GET the user's labels and use the LabelTable component to display them
//If the user clicks on the label's name, itt will shows a Label component on a new page
//"Add new label" function

const url = process.env.REACT_APP_MY_URL;
/*
const saveUserData = (user, userName, token) => {
    console.log(user);
    console.log(userName);
    console.log(token);

    console.log(JSON.stringify(user));
    
    return fetch(`${url}/User/UpdateAsync`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
        },
        body: JSON.stringify(user),
    }).then((res) => {
        console.log(res)
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
*/
function UserLabels() {

    const context = useContext(UserContext); //connect to UserContext - email, userName, token
    const [currentUser, setCurrentUser] = useState(""); //save actual user

    const [labelData, setLabelData] = useState([]);

    /*
    const [errorMessage, setErrorMessage] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
*/
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

    useEffect(() => {
        console.log("GET labels data")
        console.log(currentUser.id)
        fetch(`${url}/Label/GetByUserIdAsync/4c4dae67-93d6-4550-8ad5-bc79e2a4c082`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + context.user.token
            },
        }).then((res) => res.json()).then((data) => setLabelData(data))
    }, [currentUser]);    

    /*
    const handleSaveProfileData = (user, userName) => {
        setLoading(true);
        console.log(context.user); //who signed in
        console.log(context.user.userName);
        console.log(context.user.token);
        console.log(currentUser) //result of GET
        saveUserData(user, userName, context.user.token)
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
*/
      console.log(labelData);
    return (
        <LabelTable
            labelData={labelData}
        />
        /*
    <ProfileData
        isEdit={isEdit}
        onEdit={() => {setIsEdit(true); setIsDisabled(false);}}
        onCancel={() => {setIsEdit(false); setIsDisabled(true);}}
        onSave={(user, userName) => handleSaveProfileData(user, userName)}
        errorMessage={errorMessage}
        disabled={loading}
        currentUser={currentUser}
        isDisabled={isDisabled}
    />
    */
    );
}

export default UserLabels;