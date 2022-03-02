import firebase from 'firebase';

export function handlePaymentOmise (data, callback) {
  const handlePaymentOmise = firebase.functions().httpsCallable('handlePaymentOmisePinto')
  handlePaymentOmise(data).then(result => {
    console.log(result);
    callback(result)
  }).catch(err => {
    callback(err)
  })
} 