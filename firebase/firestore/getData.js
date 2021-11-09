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
	userRef.get().then(function (doc) {
        if(doc.exists){
            db.collection("companies").doc(doc.data().company_id).get().then(function (companyDoc) {
                let data = {...doc.data(), ...companyDoc.data()}; data.user_id = doc.id;
                callback(data);
            })

        }
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