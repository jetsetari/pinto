import { db } from "../firebase";
import Firebase from "firebase";

export function pickUpDish(company_id, machine_docId, aisle,  callback) {
  db.collection("companies")
    .doc(company_id)
    .collection("machines")
    .doc(machine_docId)
    .update({
      current_pickup: aisle
    })
    .then(function () {
      callback(true)
    })
    .catch(function (error) {
      callback(error)
    });
}

export function scannedQrCode(company_id, machine_docId,  callback) {
  db.collection("companies")
    .doc(company_id)
    .collection("machines")
    .doc(machine_docId)
    .update({
      await_pickup: true
    })
    .then(function () {
      callback(true)
    })
    .catch(function (error) {
      callback(error)
    });
}

export function updateOrderPicked(company_id, client_id, order_id, callback) {
  db.collection("companies")
  .doc(company_id)
  .collection("clients")
  .doc(client_id)
  .collection("orders")
  .doc(order_id)
  .update({
    picked: true
  })
  .then(function () {
    callback(true)
  })
  .catch(function (error) {
    callback(false)
  });
}

export function changeUsersCompanyId(user_id, company_id, callback) {
  db.collection("users")
  .doc(user_id)
  .update({
    company_id: company_id
  })
  .then(function () {
    callback(true)
  })
  .catch(function (error) {
    callback(false)
  });
}

export function updateOrderPayment(payment_status, company_id, aisle, machine_id, date, dish, client_id, machine_index, callback) {

var docRef = db.collection("companies").doc(company_id).collection("dates").doc(date).collection("machines").doc(machine_id[machine_index].id)
docRef.get().then(function (doc) {
  let index = doc.data().dishes[aisle].clients.findIndex(e => e.id === client_id && e.payment === "pending")
  let data = doc.data()
  if(payment_status === "success"){
    data.dishes[aisle].clients[index].payment = "paid"
  }else{
    data.dishes[aisle].clients.splice(index, 1)
  }
  docRef.update(data).then((e) => {
    callback();
  })
})
}