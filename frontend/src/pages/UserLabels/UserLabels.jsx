import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../index";

import LabelTable from "../../components/LabelTable/LabelTable";

//This page will GET the user's labels and use the LabelTable component to display them
//If the user clicks on the "Details", itt will shows a Label component on a new page
//"Add new label" function

const url = process.env.REACT_APP_MY_URL;

function UserLabels() {

    const context = useContext(UserContext); //connect to UserContext - email, userName, token
    const [currentUser, setCurrentUser] = useState(""); //save actual user

    const [labelData, setLabelData] = useState([]);

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

      console.log(labelData);
    return (
        <LabelTable
            labelData={labelData}
        />
    );
}

export default UserLabels;