import { React, useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from "../../index";
import TranslationForm from "../../components/TranslationForm/TranslationForm";

//This page loads when the user clicks on the "Details" button next to each label at the LabelTable


const url = process.env.REACT_APP_MY_URL;

const saveLabelData = (updatedLabel, user) => {
    
    return fetch(`${url}/Label/UpdateAsync/${updatedLabel.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token
        },
        body: JSON.stringify(updatedLabel),
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

function LabelDetails() {

    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [labelData, setLabelData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const context = useContext(UserContext); //connect to UserContext - email, userName, token
    const [currentUser, setCurrentUser] = useState(""); //save actual user
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


    const handleSaveLabelData = (updatedLabel) => {

        setLoading(true);

        saveLabelData(updatedLabel, context.user)
          .then((data) => {
            console.log(data);
            setLoading(false);
            setLabelData(data); //set the label in the state
            //navigate("/mylabels");
          })
          .catch((error) => {
            setLoading(false);
            console.error("Edit error:", error.message);
            setErrorMessage(error.message);
          });

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
                    currentUser={currentUser}
                    //onAmend={(updatedLabel) => onAmend(updatedLabel)}
                />
            </div>
            ) : (
            <div>Loading...</div>
            )}
        </div>
    );
}

export default LabelDetails;