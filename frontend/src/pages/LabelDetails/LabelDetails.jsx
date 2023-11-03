import { React, useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from "../../index";
import TranslationForm from "../../components/TranslationForm/TranslationForm";

//This page loads when the user clicks on the "Details" button next to each label at the LabelTable


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
function LabelDetails() {

    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [labelData, setLabelData] = useState(null);
    const [loading, setLoading] = useState(false);
    const context = useContext(UserContext); //connect to UserContext - email, userName, token
    const [isEdit, setIsEdit] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    //const [currentUser, setCurrentUser] = useState(""); //save actual user
    //const navigate = useNavigate();

    useEffect(() => {
        console.log("GET label details")
        fetch(`${url}/Label/GetByIdAsync/${id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + context.user.token
            },
        }).then((res) => res.json()).then((data) => setLabelData(data))
    }, [id]);    


    const handleSaveLabelData = (updatedLabel) => {
        /*
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
        */
      };

    return (
        <div>
            {labelData ? (
            <div>
                <TranslationForm
                    labelData={labelData}
                    errorMessage={errorMessage}
                    isEdit={isEdit}
                    isDisabled={isDisabled}
                    disabled={loading}
                    onEdit={() => {setIsEdit(true); setIsDisabled(false);}}
                    onCancel={() => {setIsEdit(false); setIsDisabled(true);}}
                    onSave={(updatedLabel) => handleSaveLabelData(updatedLabel)}
                    //onAmend={(updatedLabel) => onAmend(updatedLabel)}
                    //currentUser={currentUser}
                />
            </div>
            ) : (
            <div>Loading...</div>
            )}
        </div>
    );
}

export default LabelDetails;