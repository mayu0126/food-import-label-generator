import { React, useState, useContext, useEffect } from "react";
import { UserContext } from "../../index";
import Loading from "../../components/Loading";
import GlossaryTable from '../../components/GlossaryTable/GlossaryTable';

//This page will GET the words/expressions from the database and uses the GlossaryTable component to display them
//"Add new word of expression" function

const url = process.env.REACT_APP_MY_URL;

const deleteLabel = (id, user) => {
    return fetch(`${url}/Translation/DeleteByIdAsync/${id}`, {
        method: "DELETE",
        headers: {
        'Authorization': 'Bearer ' + user.token
      },
    });
};

const addNewWord = (newWord, user) => {
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
};

function Glossary() {

  const context = useContext(UserContext); //connect to UserContext - email, userName, token
  const [currentUser, setCurrentUser] = useState(""); //save actual user
  const [glossaryData, setGlossaryData] = useState([]);
  const [isCurrentUserLoaded, setIsCurrentUserLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shouldFetchGlossaryData, setShouldFetchGlossaryData] = useState(true);

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
    if (shouldFetchGlossaryData && isCurrentUserLoaded) {
      setLoading(true);
      //runs only if the currentUser has value
          console.log("GET glossary data");
          fetch(`${url}/Translation/GetAllAsync`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + context.user.token
              },
          })
          .then((res) => res.json())
          .then((data) => setGlossaryData(data))
          .then(() => {
            setLoading(false);
            setShouldFetchGlossaryData(false); // Reset the flag after fetching data
        });
      }
  }, [isCurrentUserLoaded, currentUser, shouldFetchGlossaryData]);
  
  const handleDelete = (id) => {
      setLoading(true);
      console.log(`DELETE word/expression with id ${id}`)
      deleteLabel(id, context.user)
      .then(() => {
        //after a successful delete, updating the local state
        setShouldFetchGlossaryData(true);
        setLoading(false);
      });
  }

  const handleAdd = (newWord) => {
    setLoading(true);
    console.log(`ADD word/expression`)
    console.log(newWord)
    addNewWord(newWord, context.user)
    .then(() => {
      //after a successful add, updating the local state
      setShouldFetchGlossaryData(true);
      setLoading(false);
    });
}

  return (
    <>
    {loading && <Loading />}
    <GlossaryTable
        glossaryData={glossaryData}
        onDelete={handleDelete}
        onAdd={(newWord) => handleAdd(newWord)}
    />
    </>
  );
}

export default Glossary;