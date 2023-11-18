import { React, useState, useContext, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { UserContext } from "../../index";
import LabelForm from "../../components/LabelForm/LabelForm";
import TranslationForm from "../../components/TranslationForm/TranslationForm";
import Loading from "../../components/Loading";

//This page loads when the user clicks on the "Add new label" button

const url = process.env.REACT_APP_MY_URL;

//the main functionality
const translateLabelData = (field, context) => {

    return fetch(`${url}/Translation/TranslateEnglishTextAsync`, {
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
    }).then((res) => {
        if (res.status === 404) {
            console.log("Can not find translation in the database, checking with translator...")
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

const saveNewWord = (newWord, user) => {
        
    return fetch(`${url}/Translation/AddAsync`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token
        },
        body: JSON.stringify(newWord),
    }).then((res) => {
        if (!res.ok) {
            return res.json().then((data) => {
                let errorMessage = "Failed adding new translation";
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
}

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
        //"userId": currentUser.id,
    });
    const [savedEnglishLabel, setSavedEnglishLabel] = useState({});
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
        setLoading(true);
        console.log("GET profile data")
        fetch(`${url}/User/GetByUserNameAsync/${context.user.userName}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + context.user.token
            },
        })
        .then((res) => res.json())
        .then((data) => setCurrentUser(data))
        .then(() => setLoading(false))
    }, []); 

const handleSaveLabelData = (newLabel) => {
    setLoading(true);
    saveLabelData(newLabel, context.user)
      .then((data) => {
        setIsEdit(false);
        setIsDisabled(true);
        setSuccessfulMessage('Label has been saved successfully');
        setLoading(false);
        //navigate("/mylabels");
      })
      .catch((error) => {
        console.error("Edit error:", error.message);
        setErrorMessage(error.message);
        setLoading(false);
      });
  };

    const handleTranslation = async (englishLabel) => {

        setSavedEnglishLabel(englishLabel);
        setLoading(true);
        let translatedLabelData = {
            "date": formatDateToCustomFormat(new Date()).toString(),
            "userId": currentUser.id,
        }

        const translationPromises = Object.values(englishLabel).map(async (field, index) => {
            if (
                Object.keys(englishLabel)[index] === "date" ||
                Object.keys(englishLabel)[index] === "distributor" ||
                Object.keys(englishLabel)[index] === "ean" ||
                Object.keys(englishLabel)[index] === "producer" ||
                Object.keys(englishLabel)[index] === "netWeight" ||
                Object.keys(englishLabel)[index] === "netVolume" ||
                Object.keys(englishLabel)[index] === "organic" ||
                Object.keys(englishLabel)[index] === "healthMark" ||
                field === ""
            ) {
                translatedLabelData[Object.keys(englishLabel)[index]] = field;
                return null;
            }
    
            try {
                const data = await translateLabelData(field, context);
                if (data.hungarian) {
                    translatedLabelData[Object.keys(englishLabel)[index]] = data.hungarian;
                } else {
                    translatedLabelData[Object.keys(englishLabel)[index]] = data.translatedText;
                }
            } catch (error) {
                console.error("Translation error:", error.message);
                setTranslationErrorMessage(`Failed to get translation for "${Object.keys(englishLabel)[index]}"`);
            }
        });
    
        await Promise.all(translationPromises);

        setLabelData(translatedLabelData);
        setLoading(false);
    };

    const handleSaveWord = (fieldName, translatedWord) => {
        console.log(savedEnglishLabel)
        let newWord = {
            english: `${savedEnglishLabel[fieldName]}`,
            hungarian: translatedWord
        }
        console.log(newWord);
        saveNewWord(newWord, context.user);
    }

    return (
        <>
        {loading && <Loading />}
        <div className="flex justify-center flex-col xl:flex-row">
        <div className="mt-auto xl:w-1/2 xl:mt-5">
            <p className="hidden xl:block text-slate-400 w-28 h-28 text-xs text-center absolute left-1/4 ml-40 top-32 p-3.5 rounded-full">
                <b>STEP 1</b><br></br><br></br>Provide data of English label
                <span className="absolute top-0 left-0 w-full h-full border-2 border-slate-300 rounded-full p-3.5 blur-sm"></span>
            </p>
            <p className="hidden xl:block text-slate-400 w-24 h-24 text-xs text-center absolute left-1/2 -ml-5 top-56 p-3.5 rounded-full">
                <b>STEP 2</b><br></br><br></br>Click on the button
                <span className="absolute top-0 left-0 w-full h-full border-2 border-slate-300 rounded-full p-3.5 blur-sm"></span>
            </p>
            <LabelForm 
                onSave={(englishLabel) => handleTranslation(englishLabel)}
                translationErrorMessage={translationErrorMessage}
                currentDate={formatDateToCustomFormat(new Date()).toString()}
                loading={loading}
            />
        </div>

        <div className="-mt-10 xl:w-1/2 xl:mt-5">
        <p className="hidden xl:block text-slate-400 w-36 h-36 text-xs text-center absolute right-1/4 -mr-64 top-32 p-3 rounded-full">
            <b>STEP 3</b><br></br><br></br>Click on the 'Edit' button, revise your label data, and save it to 'My labels'
            <span className="absolute top-0 left-0 w-full h-full border-2 border-slate-300 rounded-full p-3. blur-sm"></span>
        </p>
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
                onSaveNewWord={(fieldName, translatedWord) => handleSaveWord(fieldName, translatedWord)}
                onTranslation={true}
                currentUser={currentUser}
                currentDate={formatDateToCustomFormat(new Date()).toString()}
            />
        </div>
      </div>
      </>
    );
}

export default LabelTranslation;