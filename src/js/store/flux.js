const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contactList: [],
    },
    actions: {
      fetchMethods: (method, contact) => {
        if (method === "get") {
          let store;
          fetch("https://assets.breatheco.de/apis/fake/contact/agenda/robmab")
            .then((res) => {
              if (!res.ok) throw Error(res.ok);
              return res.json();
            })
            .then((data) => {
              store = getStore();

              data.forEach((item) => {
                /* CONTROL REPEATED CONTACTS */
                let aux = false;
                store.contactList.forEach((itemStore) => {
                  if (itemStore.id == item.id) {
                    aux = true;
                  }
                });

                if (!aux) {
                  const [full_name, img, gender] = item.full_name.split("|"); //:O
                  item.full_name = full_name;
                  item.img = img;
                  item.gender = gender;
                  store.contactList.unshift(item);
                } else aux = false;
              });

              setStore(store);
            })
            .catch((error) => console.log(error));
        }

        if (method === "post") {
          contact.full_name =
            contact.full_name + "|" + contact.img + "|" + contact.gender;

          fetch("https://assets.breatheco.de/apis/fake/contact/", {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (!res.ok) throw Error(res.ok);
              return res.json();
            })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => console.log(error));
        }

        if (method === "put") {
          const id = contact.id;
          const originalFullName = contact.full_name;
          contact.full_name =
            contact.full_name + "|" + contact.img + "|" + contact.gender;

          fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
            method: "PUT",
            body: JSON.stringify(contact),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (!res.ok) throw Error(res.ok);
              return res.json();
            })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => console.log(error));
          contact.full_name = originalFullName; //revert for show name as design on store
        }

        if (method === "delete") {
          const id = contact;

          fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
            method: "DELETE",
          })
            .then((res) => {
              if (!res.ok) throw Error(res.ok);
              return res.json();
            })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => console.log(error));
        }
      },
      addData: (contact) => {
        const gender = ["men", "women"];
        contact.gender = gender[Math.floor(Math.random() * 2)];
        contact.img = Math.floor(Math.random() * 99 + 1);

        getActions().fetchMethods("post", contact);

        setTimeout(() => {
          getActions().fetchMethods("get");
        }, 600);
        /* Load id data from API, 
        it need delay because it dont get data from updated contact */
      },
      modifyData: (contact, param) => {
        const store = getStore();

        contact.gender = store.contactList[param].gender;
        contact.img = store.contactList[param].img;
        contact.created_at = store.contactList[param].created_at;
        contact.id = store.contactList[param].id;

        store.contactList[param] = contact;
        setStore(store);
        getActions().fetchMethods("put", contact);
      },
      deleteData: (id) => {
        const store = getStore();
        store.contactList.forEach((x, y) => {
          if (y === id) getActions().fetchMethods("delete", x.id);
        });
        store.contactList = store.contactList.filter((_, i) => i !== id);

        setStore(store);
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
