import { db } from "../firebase";
import Firebase from "firebase";


export const getDateDishes = (date, callback) => {
	var docRef = db.collection("dish_dates").doc(date)
	docRef.get().then(function (doc) {
        let data = []
        if(doc.exists){
            doc.data().dishes.map((item, idx) => {
                item.get().then((result) => {
                    
                    let _push = result.data(); _push.id = result.id;
                    data.push(_push)
                    if(doc.data().dishes.length === idx + 1){
                        callback(data);
                    }
                })
                
            })
        } else{
            
            callback([]);
        }
	});
};

export function getnotify(company_id, callback) {
  db.collection("companies")
    .doc(company_id)
    .collection("notifications")
    .orderBy("created")
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.size <= 0) return callback(false);
      callback(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
}

export const getCompanies = (callback) => {
	var docRef = db.collection("companies").where("company_holder", "==", "pinto");
	docRef.get().then(function (querySnapshot) {
        let data = [];
        querySnapshot.forEach(function (doc) {
            let _push = {}; _push.label = doc.data().name; _push.value = doc.id;
            data.push(_push);
        });
        callback(data);
	});
};
export const getHelp = (id, callback) => {
	var docRef = db.collection("companies").doc(id).collection("qa").where("active", "==", true)
	docRef.get().then(function (querySnapshot) {
        let data = [];
        querySnapshot.forEach(function (doc) {
            let _push = doc.data()  ; _push.id = doc.id;
            data.push(_push);
        });
        callback(data);
	});
};

export const getCompanyById = (id, callback) => {
	var docRef = db.collection("companies").doc(id);
	docRef.get().then(function (doc) {
        callback({company_id: doc.id, ...doc.data()});
	});
};


export const getUser = (uid, callback) => {
	var userRef = db.collection("users").doc(uid);
	userRef.onSnapshot(function (doc) {
  if(doc.exists){
      db.collection("companies").doc(doc.data().company_id).get().then(function (companyDoc) {
        if(companyDoc.exists){
          db.collection("companies").doc(doc.data().company_id).collection('clients').doc(uid).get().then(function (walletDoc) {
            let data = {...doc.data(), ...companyDoc.data()}; data.user_id = doc.id; data.wallet = walletDoc.data().wallet;
            callback(data);
          });
        }});  
      }})
};

export const getWallet = (uid, callback) => {
  db.collection("companies").doc("VSdGBmehp16UYYXviAqc").collection('clients').doc(uid).onSnapshot(function (walletDoc) {
    callback(walletDoc.data());
  });
}

export const getCartProducts = (uid, callback) => {
  db.collection("companies").doc("VSdGBmehp16UYYXviAqc").collection('clients').doc(uid).collection("cart").onSnapshot(function (querySnapshot) {
    let data = [];
    querySnapshot.forEach(function (cartDoc) {
      let _push = cartDoc.data(); 
      _push.food_id = _push.id;
      _push.id = cartDoc.id;
      data.push(_push);
    });
    callback(data);
  });
	// var userRef = db.collection("users").doc(uid);
	// userRef.get().then(function (doc) {
 //        if(doc.exists){
 //            db.collection("companies").doc(doc.data().company_id).get().then(function (companyDoc) {
 //              if(companyDoc.exists){
 //                db.collection("companies").doc(doc.data().company_id).collection('clients').doc(uid).collection("cart").get().then(function (querySnapshot) {
 //                  let data = [];
 //                  querySnapshot.forEach(function (cartDoc) {
 //                    let _push = cartDoc.data(); 
 //                    _push.food_id = _push.id;
 //                    _push.id = cartDoc.id;
 //                    data.push(_push);
 //                  });
 //                  callback(data);
 //                });
 //              }});  
 //            }})
};

export const getCartProductsOnce = (uid, callback) => {
  db.collection("companies").doc("VSdGBmehp16UYYXviAqc").collection('clients').doc(uid).collection("cart").get().then(function (querySnapshot) {
    let data = [];
    querySnapshot.forEach(function (cartDoc) {
      let _push = cartDoc.data();
      _push.food_id = (_push.food_id) ? _push.food_id : _push.id;
      _push.id = cartDoc.id;
      data.push(_push);
    });
    callback(data);
  });
};

export const getMachineDishesByDate = (company_id, machine_id, date, callback) => {
	var docRef = db.collection("companies").doc(company_id).collection("dates").doc(date).collection("machines").doc(machine_id);
	docRef.get().then(function (doc) {
        
        if(doc.exists){
            let data = doc.data(); data.id = doc.id;
            callback(data);
        } else{
            callback(false);
        }

	});
};

export const getMachines = (company_id, callback) => {
    
	var docRef = db.collection("companies").doc(company_id).collection("machines")
	docRef.get().then(function (querySnapshot) {
        let data = [];
        querySnapshot.forEach(function (doc) {
            let _push = doc.data(); _push.id = doc.id;
            data.push(_push);
        });
        callback(data);
	});
};

export function getArticles(company_id, callback) {
  db.collection("companies")
    .doc(company_id)
    .collection("news")
    .where("active", "==", true)
    .orderBy("created")
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.size <= 0) return callback(false);
      callback(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
}


// export const getAllOrders = (date, callback) => {
//   db.collection("companies").get().then(async (querySnapshot) => {
//     await Promise.all(querySnapshot.docs.map(async (company_doc) => {
//       let machines = await db.collection("companies").doc(company_doc.id).collection("dates").doc(date).collection("machines").get()
//       let _machine = []
//       machines.docs.map(doc => {
//         doc.data().dishes.map(client => {
//           let _push = {}
//           _push.count = client.clients.length
//           _push.dish = client.dish
//           _push.dish_id = client.dish_id
          
//           _machine.push(_push)
//         })
//       })
//       return _machine
//     })).then((result) => {
//       let _temp_array = []
//       result.map((result) => {
//         if(_temp_array.length > 0) {
//           _temp_array = _temp_array.concat(result)
//         }else{
//           _temp_array = result
//         }
//       })

//       let index;
//       let newArray = [];
//       _temp_array.map((aisle) => {
//         index = newArray.findIndex((e) => e.dish_id === aisle.dish_id);
//         if (index !== -1) {
//           let _temp_clients_array = newArray[index].count;
//           newArray[index].count = _temp_clients_array + aisle.count;
//         } else {
//           newArray.push({
//             dish: aisle.dish,
//             dish_id: aisle.dish_id,
//             count: aisle.count,
//           });
//         }
//       });
//       callback(newArray)
//     });
//   });
// };

export function getEmployeeOrders(company_id, client_id, callback) {
    db.collection("companies")
      .doc(company_id)
      .collection("clients")
      .doc(client_id)
      .collection("orders")
      .orderBy("date", "desc")
      .get()
      .then(function (querySnapshot) {
        let data = [];
        querySnapshot.forEach(function (doc) {
            let _push = doc.data(); _push.id = doc.id;
            data.push(_push);
        });
        callback(data);
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }


export function getAisleNumber(machine_id, date, company_id, client_id, callback) {
    db.collection("companies")
      .doc(company_id)
      .collection("clients")
      .doc(client_id)
      .collection("orders")
      .where("machine_docId", "==", machine_id)
      .where("formated_date", "==", date)
      .where("picked", "==", false)
      .get()
      .then(function (querySnapshot) {
        let data = [];
        querySnapshot.forEach(function (doc) {
            let _push = doc.data(); _push.id = doc.id;
            data.push(_push);
        });
        callback(data);
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }



export function getAllIndividualMachines(company_id, callback) {
    db.collection("companies")
      .doc(company_id)
      .collection("machines")
      .get()
      .then(function (querySnapshot) {
        let data = [];
        querySnapshot.forEach(function (doc) {
            let _push = doc.data(); _push.id = doc.id;
            data.push(_push);
        });
        callback(data);
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }


  export function checkIfAcountExists(company_id, client_id, callback) {
    db.collection("companies")
      .doc(company_id)
      .collection("clients")
      .doc(client_id)
      .get()
      .then(function (doc) {
        if(doc.exists){
          callback(true)
        }else{
          callback(false)
        }
      })
  }


  export function findPromo(company_id, promo, callback) {
    db.collection("companies")
      .doc(company_id)
      .collection("promos")
      .where("active", "==", true)
      .where("code", "==", promo)
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.size <= 0) return callback(false);
        callback(
          querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
  }