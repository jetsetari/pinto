import { db } from "../firebase";
import Firebase from "firebase";

export function deletePendingOrder(client_id,  callback) {
  db.collection("pending_orders").doc(client_id).delete().then(() => {
    callback()
  })
}




export function getpending() {
  db.collection("pending_orders").get().then(async function (querysnapshot) {
    
    if(querysnapshot.size > 0){
      await Promise.all(querysnapshot.forEach(async element => {
        var diff = (new Date().getTime() - element.data().order_initiated_on.toDate().getTime()) / 1000;
        diff /= 60;
        let diff_minutes =  Math.abs(Math.round(diff));
        
        
        if(diff_minutes <= 10){
          
          element.data().order.get().then(async(machine) => {
            
            let index = machine.data().dishes[element.data().aisle].clients.findIndex(e => e.id === element.id && e.payment === "pending")
            
            if(index !== -1){
              let data = machine.data()
              data.dishes[element.data().aisle].clients.splice(index, 1)
              await element.data().order.update(data)
            }
            await db.collection("pending_orders").doc(element.id).delete()
          })

        }
      })).then(() => {
          return null;
      })
    } else {
      return null;
    }

  })
}

function diff_minutes(dt2, dt1) 
 {


  
 }