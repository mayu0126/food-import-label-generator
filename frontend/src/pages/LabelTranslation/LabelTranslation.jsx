import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../index";
import ProfileData from "../../components/ProfileData/ProfileData";
import LabelForm from "../../components/LabelForm/LabelForm";
import TranslationForm from "../../components/TranslationForm/TranslationForm";

//This page loads when the user clicks on the "Add new label" button

const url = process.env.REACT_APP_MY_URL;

const translateLabelData = (field, context) => {
    console.log(field);
    
    return fetch(`${url}/Translation/GetByEnglishWordAsync/${field}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + context.user.token
        },
    }).then((res) => {
        console.log(res)
        if (!res.ok) {
            return res.json().then((data) => {
                console.log(data)
                let errorMessage = "Get hungarian word failed";
                throw new Error(errorMessage);
            });
        }
        return res.json(); //if the response is "ok"
    });
};

function LabelTranslation() {

    const [currentUser, setCurrentUser] = useState(""); //save actual user
    const context = useContext(UserContext); //connect to UserContext - email, userName, token
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    /*
    const [isEdit, setIsEdit] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
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
*/

    const handleTranslation = (englishLabel) => {

        //az englishLabel egy objektum, amelynek a "value" értékeit kellene lefordítani
        //amire nem talál fordítást, azt úgy hagyja
        //Object.values -> arrayt ad vissza, egyesével kéne mappelni és meghívni a GET fetchet

        setLoading(true);
        Object.values(englishLabel).map((field, index) => {
            translateLabelData(field, context)
            .then((data) => {
                console.log(data);
                setLoading(false);
                //setCurrentUser(data);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Edit error:", error.message);
                setErrorMessage(error.message);
            });
        })
        
      };

    return (
        <div className="flex justify-center items-center">
        <div className="w-1/2 mr-4">
            <LabelForm 
                onSave={(englishLabel) => handleTranslation(englishLabel)}
                errorMessage={errorMessage}
            />
        </div>
        <div className="w-1/2 ml-4">
          <TranslationForm />
        </div>

      </div>

        /*
    <ProfileData
        isEdit={isEdit}
        onEdit={() => {setIsEdit(true); setIsDisabled(false);}}
        onCancel={() => {setIsEdit(false); setIsDisabled(true);}}
        disabled={loading}
        currentUser={currentUser}
        isDisabled={isDisabled}
    />
    */
    );
}

export default LabelTranslation;