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

function Glossary() {

  const context = useContext(UserContext); //connect to UserContext - email, userName, token
  const [currentUser, setCurrentUser] = useState(""); //save actual user
  const [glossaryData, setGlossaryData] = useState([]);
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
          .then(() => setLoading(false))
      }
  }, [isCurrentUserLoaded, currentUser]);
  
  const handleDelete = (id) => {
      setLoading(true);
      console.log(`DELETE word/expression with id ${id}`)
      deleteLabel(id, context.user)
      .then(() => {
        //after a successful delete, updating the local state
        setGlossaryData(glossaryData.filter(c => c.id !== id));
        setLoading(false);
      });
  }

  return (
    <>
    {loading && <Loading />}
    <GlossaryTable
        glossaryData={glossaryData}
        onDelete={handleDelete}
    />
    </>
  );
}

export default Glossary;