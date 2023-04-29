const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contactList: [
        /* {
          full_name: "Mike Anamendolla",
          email: "mike.ana@example.com",
          phone: "(870) 288-4149",
          address: "5842 Hillcrest Rd",
          gender: "men",
          img: "10",
          agenda_slug: "robmab",
        },
        {
          full_name: "Prueba",
          email: "mike.ana@example.com",
          phone: "(870) 288-4149",
          address: "5842 Hillcrest Rd",
          gender: "women",
          img: "8",
          agenda_slug: "robmab",
        },
        {
          full_name: "Mike Anamendolla",
          email: "mike.ana@example.com",
          phone: "(870) 288-4149",
          address: "5842 Hillcrest Rd",
          gender: "men",
          img: "63",
          agenda_slug: "robmab",
        },
        {
          full_name: "Mike Anamendolla",
          email: "mike.ana@example.com",
          phone: "(870) 288-4149",
          address: "5842 Hillcrest Rd",
          gender: "women",
          img: "39",
          agenda_slug: "robmab",
        }, */
      ],
    },
    actions: {
      fetchMethods: (method, contact) => {
        if (method === "get") {
          fetch("https://assets.breatheco.de/apis/fake/contact/agenda/robmab")
            .then((res) => {
              if (!res.ok) throw Error(res.ok);
              return res.json();
            })
            .then((data) => {
              const store = getStore();

              data.forEach((item) => {
                const [full_name, img, gender] = item.full_name.split("|"); //:O
                item.full_name = full_name;
                item.img = img;
                item.gender = gender;

                store.contactList.unshift(item);
              });

              setStore(store);
            })
            .catch((error) => console.log(error));
        }

        if (method === "add") {
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

        if (method === "delete") {
          const id = contact

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

        getActions().fetchMethods("add", contact);

        setTimeout(() => {
          getActions().fetchMethods("get"); //Load id data from API, it need delay because it dont get data from updated contact
        }, 600);
      },
      modifyData: (contact, param) => {
        const store = getStore();

        contact.gender = store.contactList[param].gender;
        contact.img = store.contactList[param].img;

        store.contactList[param] = contact;

        setStore(store);
      },
      deleteData: (id) => {
        const store = getStore();
        store.contactList.forEach((x, y) => {
          if (y == id) getActions().fetchMethods("delete", x.id);
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
