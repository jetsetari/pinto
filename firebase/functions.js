import firebase from 'firebase';

export function handlePaymentOmise (data, callback) {
  const handlePaymentOmise = firebase.functions().httpsCallable('handlePaymentOmise')
  handlePaymentOmise(data).then(result => {
    callback(result)
  }).catch(err => {
    callback(err)
  })
} 