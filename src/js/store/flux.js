const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: [
      {
        name: "Mike Anamendolla",
        email: "mike.ana@example.com",
        phone: "(870) 288-4149",
        address: "5842 Hillcrest Rd",
        gender: "men",
        img: "10",
      },
      {
        name: "Prueba",
        email: "mike.ana@example.com",
        phone: "(870) 288-4149",
        address: "5842 Hillcrest Rd",
        gender: "women",
        img: "8",
      },
      {
        name: "Mike Anamendolla",
        email: "mike.ana@example.com",
        phone: "(870) 288-4149",
        address: "5842 Hillcrest Rd",
        gender: "men",
        img: "63",
      },
      {
        name: "Mike Anamendolla",
        email: "mike.ana@example.com",
        phone: "(870) 288-4149",
        address: "5842 Hillcrest Rd",
        gender: "women",
        img: "39",
      },
    ],
    actions: {
      addData: (contact) => {
        const gender= ["men","women"]
        contact.gender= gender[Math.floor(Math.random()*2)]
        contact.img = Math.floor(Math.random()*99+1)
        
        const store = getStore();
        store.push(contact)
        console.log(contact);
      },
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      loadSomeData: () => {
        /**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
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
