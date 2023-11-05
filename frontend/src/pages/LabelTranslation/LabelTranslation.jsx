import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../index";
import LabelForm from "../../components/LabelForm/LabelForm";
import TranslationForm from "../../components/TranslationForm/TranslationForm";

//This page loads when the user clicks on the "Add new label" button

const url = process.env.REACT_APP_MY_URL;

//the main functionality
const translateLabelData = (field, context) => {
    console.log(field);
    
    return fetch(`${url}/Translation/GetByEnglishWordAsync/${field}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + context.user.token
        },
    }).then((res) => {
        //console.log(res)
        if (res.status === 404) {
            //if the first fetch receives 404 response, start the second fetch
            return fetch(`${url}/Translation/Translate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + context.user.token
                },
                body: JSON.stringify({
                    "text": field,
                    "targetLanguage": "hu",
                    "sourceLanguage": "en"
                }),
            }).then((secondRes) => {
                if (!secondRes.ok) {
                    return secondRes.json().then((data) => {
                        let errorMessage = "Translation failed";
                        throw new Error(errorMessage);
                    });
                }

                return secondRes.json(); //second fetch "ok"
            });
        }
        return res.json(); //first fetch "ok"
    });
};

const saveLabelData = (newLabel, user) => {
    
    return fetch(`${url}/Label/AddAsync`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token
        },
        body: JSON.stringify(newLabel),
    }).then((res) => {
        if (!res.ok) {
            return res.json().then((data) => {
                let errorMessage = "Failed adding new label";
                if (data) {
                    if (data["Bad credentials"]) {
                        errorMessage = data["Bad credentials"][0];
                    }
                }

                throw new Error(errorMessage);
            });
        }
        return res //.json(); //if the response is "ok"
    });
};

//helper method for proper DateTime format
function formatDateToCustomFormat(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(7, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function LabelTranslation() {

    const [currentUser, setCurrentUser] = useState(""); //save actual user
    const context = useContext(UserContext); //connect to UserContext - email, userName, token
    const [errorMessage, setErrorMessage] = useState("");
    const [translationErrorMessage, setTranslationErrorMessage] = useState("");
    const [successfulMessage, setSuccessfulMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [labelData, setLabelData] = useState({
        "date": formatDateToCustomFormat(new Date()).toString(),
        "userId": currentUser.id,

    });
    //const navigate = useNavigate();

    const clearErrorMessage = () => {
        setErrorMessage("");
    };
    const clearTranslationErrorMessage = () => {
        setTranslationErrorMessage("");
    };
    const clearSuccessfulMessage = () => {
        setSuccessfulMessage("");
    };

    useEffect(() => {
        document.addEventListener('click', clearErrorMessage);
        document.addEventListener('click', clearSuccessfulMessage);
        document.addEventListener('click', clearTranslationErrorMessage);
        //remove event listeners
        return () => {
            document.removeEventListener('click', clearErrorMessage);
            document.removeEventListener('click', clearSuccessfulMessage);
            document.removeEventListener('click', clearTranslationErrorMessage);
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

const handleSaveLabelData = (newLabel) => {

    setLoading(true);

    saveLabelData(newLabel, context.user)
      .then((data) => {
        console.log(data);
        setLoading(false);
        setSuccessfulMessage('Label has been saved successfully');
        //setLabelData(data); //set the label in the state
        //navigate("/mylabels");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Edit error:", error.message);
        setErrorMessage(error.message);
      });
  };

    const handleTranslation = (englishLabel) => {

        //az englishLabel egy objektum, amelynek a "value" értékeit kellene lefordítani
        //amire nem talál fordítást, azt úgy hagyja
        //Object.values -> arrayt ad vissza, egyesével kéne mappelni és meghívni a GET fetchet

        let translatedLabelData = {
            "date": formatDateToCustomFormat(new Date()).toString(),
            "userId": currentUser.id,
        }

        setLoading(true);
        Object.values(englishLabel).map((field, index) => {

            if(
                Object.keys(englishLabel)[index] === "date" ||
                Object.keys(englishLabel)[index] === "distributor" ||
                Object.keys(englishLabel)[index] === "ean" ||
                Object.keys(englishLabel)[index] === "producer" ||
                Object.keys(englishLabel)[index] === "netWeight" ||
                Object.keys(englishLabel)[index] === "netVolume" ||
                Object.keys(englishLabel)[index] === "organic" ||
                Object.keys(englishLabel)[index] === "healthMark"
            ){
                translatedLabelData[Object.keys(englishLabel)[index]] = field;
                return null;
            }

            translateLabelData(field, context)
            .then((data) => {
                console.log(data);
                if(data.hungarian){
                    translatedLabelData[Object.keys(englishLabel)[index]] = data.hungarian;
                }
                else{
                    translatedLabelData[Object.keys(englishLabel)[index]] = data.translatedText;
                }

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Edit error:", error.message);
                setTranslationErrorMessage(`Failed to get translation for "${Object.keys(englishLabel)[index]}"`);
            });
        })

        console.log(translatedLabelData);
        setLabelData(translatedLabelData);
        
      };

    return (
        <div className="flex justify-center">
        <div className="w-1/2">
            <LabelForm 
                onSave={(englishLabel) => handleTranslation(englishLabel)}
                translationErrorMessage={translationErrorMessage}
                currentDate={formatDateToCustomFormat(new Date()).toString()}
            />
        </div>

        <div className="w-1/2">
          <TranslationForm 
            labelData={labelData}
            errorMessage={errorMessage}
            successfulMessage={successfulMessage}
            isEdit={isEdit}
            isDisabled={isDisabled}
            disabled={loading}
            onEdit={() => {setIsEdit(true); setIsDisabled(false);}}
            onCancel={() => {setIsEdit(false); setIsDisabled(true);}}
            onSave={(newLabel) => handleSaveLabelData(newLabel)}
            currentUser={currentUser}
            currentDate={formatDateToCustomFormat(new Date()).toString()}
          />
        </div>

      </div>
    );
}

export default LabelTranslation;