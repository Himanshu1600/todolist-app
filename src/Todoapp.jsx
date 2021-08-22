import React, { useState } from "react";
import "./Todoapp.css";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { GoogleLogout } from "react-google-login";
import { clientId } from "./Login";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// to get the data from local storage

// const getLocalItems = () => {
//   let list = localStorage.getItem("todo-list");
//   if (list) {
//     return JSON.parse(list);
//   } else {
//     return [];
//   }
// };

function Todoapp() {
  const [inputdata, setinputdata] = useState("");
  const [items, setItems] = useState([]);
  const [togglebutton, settogglebutton] = useState(true);
  const [Edititem, setEdititem] = useState(null);
  let username = localStorage.getItem("user-name");

  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the input field first");
    } else if (inputdata && !togglebutton) {
      setItems(
        items.map((elem) => {
          if (elem.id === Edititem) {
            return { ...elem, name: inputdata };
          }
          return elem;
        })
      );
      settogglebutton(true);
      setinputdata("");
      setEdititem(null);
    } else {
      const allinputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, allinputData]);
      setinputdata("");
    }
  };

  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateditems);
  };

  const editItem = (id) => {
    let newEditItem = items.find((element) => {
      return element.id === id;
    });
    settogglebutton(false);
    setinputdata(newEditItem.name);
    setEdititem(id);
    // console.log(newEditItem);
  };

  const Removeall = () => {
    setItems([]);
  };

  // add data to local storage
  // useEffect(() => {
  //   localStorage.setItem("todo-list", JSON.stringify(items));
  // }, [items]);

  // logout functionality
  const history = useHistory();
  const onLogout = () => {
    alert("You have been logout successfully");
    history.push("/");
    console.clear();
    localStorage.removeItem("user-name");
  };

  return (
    <>
      <h2 className="username">Hello, {username}</h2>
      <span className="logout-button">
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onLogout}
        ></GoogleLogout>
      </span>
      <div className="main-div">
        <div className="sub-div">
          <figure>
            <img src="./todoicon.png" alt="loading" />
            <figcaption>Add Your List Here 📝</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items..."
              value={inputdata}
              onChange={(e) => {
                setinputdata(e.target.value);
              }}
            />
            <span onClick={addItem} className="add-button" title="Add Items">
              {togglebutton ? <AddIcon /> : <EditOutlinedIcon />}
            </span>
          </div>
          <div className="showItems">
            {items.map((element) => {
              return (
                <div className="addedItem" key={element.id}>
                  <h3>{element.name}</h3>
                  <div className="items-functionality">
                    <span
                      onClick={() => editItem(element.id)}
                      className="edit-button"
                      title="Edit Item"
                    >
                      <EditOutlinedIcon />
                    </span>
                    <span
                      onClick={() => deleteItem(element.id)}
                      className="delete-button"
                      title="Delete Item"
                    >
                      <DeleteForeverIcon />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="button-section">
            <button className="btn" onClick={Removeall}>
              Remove All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todoapp;
