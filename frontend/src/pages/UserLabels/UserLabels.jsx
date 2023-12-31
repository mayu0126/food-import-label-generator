import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../index";
import Loading from "../../components/Loading";

import LabelTable from "../../components/LabelTable/LabelTable";

//This page will GET the user's labels and use the LabelTable component to display them
//If the user clicks on the "Details", itt will shows a Label component on a new page
//"Add new label" function

const url = process.env.REACT_APP_MY_URL;

const deleteLabel = (id, user) => {
    return fetch(`${url}/Label/DeleteByIdAsync/${id}`, {
        method: "DELETE",
        headers: {
        'Authorization': 'Bearer ' + user.token
      },
    });
};

function UserLabels() {

    const context = useContext(UserContext); //connect to UserContext - email, userName, token
    const [currentUser, setCurrentUser] = useState(""); //save actual user
    const [labelData, setLabelData] = useState([]);
    const [isCurrentUserLoaded, setIsCurrentUserLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("GET profile data");
        fetch(`${url}/User/GetByUserNameAsync/${context.user.userName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + context.user.token
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setCurrentUser(data);
            setIsCurrentUserLoaded(true); //indicates if currentUser is set
        });
    }, []);
    
    useEffect(() => {
        setLoading(true);
        //runs only if the currentUser has value
        if (isCurrentUserLoaded) {
            console.log("GET labels data");
            fetch(`${url}/Label/GetByUserIdAsync/${currentUser.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + context.user.token
                },
            })
            .then((res) => res.json())
            .then((data) => setLabelData(data))
            .then(() => setLoading(false))
        }
    }, [isCurrentUserLoaded, currentUser]);
    
    const handleDelete = (id) => {
        setLoading(true);
        console.log(`DELETE label with id ${id}`)
        deleteLabel(id, context.user)
        .then(() => {
          //after a successful delete, updating the local state
          setLabelData(labelData.filter(c => c.id !== id));
          setLoading(false);
        });
    }

      //console.log(labelData);
    return (
        <>
        {loading && <Loading />}
        <LabelTable
            labelData={labelData}
            onDelete={handleDelete}
        />
        </>
    );
}

export default UserLabels;