import { db } from "../firebase";
import Firebase from "firebase";
import {formatDate} from "../../functions/formatDate.js"
import { getMachineDishesByDate } from "./getData";
const S4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};


const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
  if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
          return;
      }
      seen.add(value);
  }
  return value;
  };
};

export function addNewUserToDB(uid, content, callback) {
  let user = {
    created: Firebase.firestore.Timestamp.fromDate(new Date()),
    first_name: content.first_name,
    last_name: content.last_name,
    company_id: content.company,
    email: content.email,
  }
  var timestamp = new Date().getUTCMilliseconds();
  db.collection("users")
    .doc(uid)
    .set(user)
    .then(function () {
      db.collection("companies")
        .doc(content.company)
        .collection("clients")
        .doc(uid)
        .set({
          created: Firebase.firestore.Timestamp.fromDate(new Date()),
          first_name: content.first_name,
          last_name: content.last_name,
          email: content.email,
          has_account: true,
          active: true,
          pickup_id: S4() + S4() + "-" + S4() + timestamp,
        })
        .then(function () {
          db.collection("companies")
            .doc(content.company)
            .update({ client_count: Firebase.firestore.FieldValue.increment(1) })
            .then(function () {
              db.collection("companies").doc(content.company).get().then(function (companyDoc) {
                let data = {...user, ...companyDoc.data()}
                callback(data);
            })
            });
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}

export function addDateDoc(company_id, date, callback) {
  db.collection("companies")
  .doc(company_id)
  .collection("dates")
  .doc(date)
  .set({ created: Firebase.firestore.Timestamp.fromDate(new Date()) })
  .then(function () {
    callback()
  });
}

export function createLog(companyId, userId, dishId, dishAisle, date, machine, callback) {
  db.collection("companies")
  .doc(companyId)
  .collection("logs")
  .doc()
  .set({
    date: date,
    userId: userId,
    dishId: dishId,
    dishAisle: dishAisle,
    picked: true,
    machine: machine
  })
  .then(function () {
    callback()
  });
}

export function addOrderesDishToAisle(individual_mode, type, company_id, machine_id, date, dish, client_id, machine_index, callback) {
  var docRef = db.collection("companies").doc(company_id).collection("dates").doc(date).collection("machines").doc(machine_id[machine_index].id);
  docRef.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().dishes.length > 0) {
        let _ordered_dishes = doc.data().dishes.filter((e) => e.dish_id === dish.id);
        let _push_content = doc.data();
        if (_ordered_dishes.length > 0) {
          for (let i = 0; i < _ordered_dishes.length; i++) {
            if (_ordered_dishes[i].clients.length < 5 ) {
              _push_content.dishes.map((item, idx) => {
                if(JSON.stringify(item, getCircularReplacer()) === JSON.stringify(_ordered_dishes[i], getCircularReplacer())){
                  _push_content.dishes[idx].clients.push({
                    client_id: db.doc("companies/" + company_id + "/clients/" + client_id),
                    picked: false,
                    order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                    payment: type === "payment_by_user" ? "pending" : "welfare",
                    id: client_id
                  })
                  docRef.update(_push_content).then((e) => {
                    if(type === "payment_by_user"){
                      db.collection("pending_orders").doc(client_id).set(
                        {
                          aisle: idx,
                          order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                          order: db.doc("companies/" + company_id + "/dates/" + date + "/machines/" + machine_id[machine_index].id)
                        }
                      ).then(function () {
                        callback(true, idx, machine_index);
                      })
                    }else{
                      callback(true, idx, machine_index);
                    }
                  });
                }
              })
              break;
            } else if(_ordered_dishes.length <= i + 1) {
              
              if(doc.data().dishes.length < 35) {
                _push_content.dishes.push({
                  clients: [{
                      client_id: db.doc("companies/" + company_id + "/clients/" + client_id),
                      picked: false,
                      order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                      payment: type === "payment_by_user" ? "pending" : "welfare",
                      id: client_id
                    }],
                  dish_id: dish.id,
                  dish: dish.title,
                });

                docRef.update(_push_content).then((e) => {
                  if(type === "payment_by_user"){
                   db.collection("pending_orders").doc(client_id).set(
                      {
                        aisle: _push_content.dishes.length - 1,
                        order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                        order: db.doc("companies/" + company_id + "/dates/" + date + "/machines/" + machine_id[machine_index].id)
                      }
                    ).then(function () {
                      callback(true,  _push_content.dishes.length - 1, machine_index);
                    })
                  }else{
                    callback(true,  _push_content.dishes.length - 1, machine_index);
                  }
                })
              }else{
                
                if(machine_id.length > 0 && machine_index + 1 < machine_id.length){
                  getMachineDishesByDate(company_id, machine_id[machine_index + 1].id, date, (result) => {
                    if (result === false) {
                      db.collection("companies").doc(company_id).collection("dates").doc(date).collection("machines").doc(machine_id[machine_index + 1].id)
                      .set({
                        dishes: [{
                            clients: [{
                                client_id: db.doc("companies/" + company_id + "/clients/" + client_id),
                                picked: false,
                                order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                                payment: type === "payment_by_user" ? "pending" : "welfare",
                                id: client_id
                              }],
                            dish_id: dish.id,
                            dish: dish.title,
                          },
                        ],
                      }).then((e) => {
                        if(type === "payment_by_user"){
                         db.collection("pending_orders").doc(client_id).set(
                            {
                              aisle: 0,
                              order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                              order: db.doc("companies/" + company_id + "/dates/" + date + "/machines/" + machine_id[machine_index + 1].id)
                            }
                          ).then(function () {
                            callback(true,  0, machine_index + 1);
                          })
                        }else{
                          callback(true,  0, machine_index + 1);
                        }
                      })
                    } else{
                      if(individual_mode){
                        callback("full", false, machine_index)
                      }else{
                        addOrderesDishToAisle(company_id, machine_id, date, dish, client_id, machine_index + 1, (result, idx, machine_idx) => {
                          callback(result, idx, machine_idx)
                        })
                      }
                    }
                  });
                }else{
                  callback("full", false, machine_index)
                }
              }
              break;
            }
          }
        } else {
          if(doc.data().dishes.length < 35) {
            _push_content.dishes.push({
            clients: [{
                client_id: db.doc("companies/" + company_id + "/clients/" + client_id),
                picked: false,
                order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                payment: type === "payment_by_user" ? "pending" : "welfare",
                id: client_id
              }],
            dish_id: dish.id,
            dish: dish.title,
          });
          docRef.update(_push_content).then((e) => {
            if(type === "payment_by_user"){
             db.collection("pending_orders").doc(client_id).set(
                {
                  aisle: _push_content.dishes.length - 1,
                  order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                  order: db.doc("companies/" + company_id + "/dates/" + date + "/machines/" + machine_id[machine_index].id)
                }
              ).then(function () {
                callback(true, _push_content.dishes.length - 1, machine_index);
              })
            }else{
              callback(true, _push_content.dishes.length - 1, machine_index);
            }
          });
        } else{
         
          if(machine_id.length > 0 && machine_index + 1 < machine_id.length){
            getMachineDishesByDate(company_id, machine_id[machine_index + 1].id, date, (result) => {
              if (result === false) {
                db.collection("companies").doc(company_id).collection("dates").doc(date).collection("machines").doc(machine_id[machine_index + 1].id)
                .set({
                  dishes: [{
                      clients: [{
                          client_id: db.doc("companies/" + company_id + "/clients/" + client_id),
                          picked: false,
                          order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                          payment: type === "payment_by_user" ? "pending" : "welfare",
                          id: client_id
                        }],
                      dish_id: dish.id,
                      dish: dish.title,
                    },
                  ],
                }).then((e) => {
                  if(type === "payment_by_user"){
                   db.collection("pending_orders").doc(client_id).set(
                      {
                        aisle: 0,
                        order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                        order: db.doc("companies/" + company_id + "/dates/" + date + "/machines/" + machine_id[machine_index + 1].id)
                      }
                    ).then(function () {
                      callback(true,  0, machine_index + 1);
                    })
                  }else{
                    callback(true,  0, machine_index + 1);
                  }
                })
              } else{
                if(individual_mode){
                  callback("full", false, machine_index)
                }else{
                  addOrderesDishToAisle(company_id, machine_id, date, dish, client_id, machine_index + 1, (result, idx, machine_idx) => {
                    callback(result, idx, machine_idx)
                  })
                }
              }
            });
          }else{
            callback("full", false, machine_index)
          }
        }
        }
      } else {
        docRef.update({
            dishes: [{
                clients: [{
                    client_id: db.doc("companies/" + company_id + "/clients/" + client_id),
                    picked: false,
                    order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                    payment: type === "payment_by_user" ? "pending" : "welfare",
                    id: client_id
                  }],
                dish_id: dish.id,
                dish: dish.title,
              },
            ],
          }
        ).then((e) => {
          if(type === "payment_by_user"){
           db.collection("pending_orders").doc(client_id).set(
              {
                aisle: 0,
                order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                order: db.doc("companies/" + company_id + "/dates/" + date + "/machines/" + machine_id[machine_index].id)
              }
            ).then(function () {
              callback(true, 0, machine_index);
            })
          }else{
            callback(true, 0, machine_index);
          }
        });
      }
    } else {
      addDateDoc(company_id, date, () => {
        db.collection("companies").doc(company_id).collection("dates").doc(date).collection("machines").doc(machine_id[machine_index].id)
        .set({
          dishes: [{
              clients: [{
                  client_id: db.doc("companies/" + company_id + "/clients/" + client_id),
                  picked: false,
                  order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                  payment: type === "payment_by_user" ? "pending" : "welfare",
                  id: client_id
                }],
              dish_id: dish.id,
              dish: dish.title,
            },
          ],
        }).then((e) => {
          if(type === "payment_by_user"){
           db.collection("pending_orders").doc(client_id).set(
              {
                aisle: 0,
                order_initiated_on: Firebase.firestore.Timestamp.fromDate(new Date()),
                order: db.doc("companies/" + company_id + "/dates/" + date + "/machines/" + machine_id[machine_index].id)
              }
            ).then(function () {
              callback(true,  0, machine_index);
            })
          }else{
            callback(true,  0, machine_index);
          }
        })
      })
    }
  });
}

export function addEmployeesOrder(company_id, client_id,  dish, idx, date, machine_name, machine_id, machine_docId,  callback) {
  db.collection("companies")
    .doc(company_id)
    .collection("clients")
    .doc(client_id)
    .collection("orders")
    .doc()
    .set({
      picked: false,
      formated_date: formatDate(date),
      date: Firebase.firestore.Timestamp.fromDate(new Date(Date.parse(date))),
      dish_id: dish.id,
      title: dish.title,
      picture: dish.picture,
      machine_name: machine_name,
      machine_id: machine_id,
      machine_docId: machine_docId,
      dish_aisle: idx + 1
    })
    .then(function (error) {
      console.error("Error updating document: ", error);
      callback()
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}


export function addUserToCompany(company_id, client_id, data, callback) {
  db.collection("companies")
    .doc(company_id)
    .collection("clients")
    .doc(client_id)
    .set(data)
    .then(function () {
      callback()
    })
}

export function removeOldProducts(company_id, client_id, product_id, callback) {
  var productsQuery = db.collection("companies").doc(company_id)
                        .collection("clients").doc(client_id)
                        .collection('cart').where('id','==',product_id);
  productsQuery.get().then(function(querySnapshot) {
    if(querySnapshot.length > 0){
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
        callback();
      });
    } else {
      callback();
    }
    
  });
}

export function addMultipleProducts(company_id, client_id, products, callback){
    let batch = db.batch();
    console.log(company_id, client_id, products);
    products.forEach((doc) => {
      batch.set(db.collection("companies").doc(company_id).collection("clients").doc(client_id).collection('cart').doc(), doc);
    });
    // Commit the batch
    batch.commit().then(function () {
        callback()
    });
}


export function addProductToCart(company_id, client_id, data, date, callback) {
  db.collection("companies")
    .doc(company_id)
    .collection("clients")
    .doc(client_id)
    .collection('cart')
    .doc()
    .set({...data, date: date})
    .then(function () {
      callback()
    })
}
