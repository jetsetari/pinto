import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { globalStyles } from "../../globalStyles";
import { styles } from "./Payment-styles";
import { Container, Content, H1, H3, H2 } from "native-base";
//Redux
import { connect } from "react-redux";
import { handlePaymentOmise } from "../../firebase/functions";
import { updateOrderPayment } from "../../firebase/firestore/updateData";
import { addEmployeesOrder } from "../../firebase/firestore/saveData";
import { deleteFromCart, deletePendingOrder } from "../../firebase/firestore/deleteData";

import Loading from "../../components/Loading";

function PaymentScreen(props) {

  console.log(props);

  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [moneyCount, setMoneyCount] = useState(0);

  useEffect(() => {
    if (props.route.params.dishes !== undefined) {
      let money = props.route.params.dishes.map(item => Number(item.price)).reduce((prev, next) => prev + next);
     setMoneyCount(money);
    }
  }, [props.route.params.dishes])

  const emptyCart = () => {
    props.route.params.dishes.forEach((dish) =>{
      deleteFromCart(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, dish.id, () => {})
    })
    
  }

  const html = `
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        background: #123835;
      }
      .feather-loader {
        -webkit-animation: spin 2s linear infinite;
        -moz-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
      }
      @-moz-keyframes spin {
        100% {
          -moz-transform: rotate(360deg);
        }
      }
      @-webkit-keyframes spin {
        100% {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes spin {
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
    </style>
  </head>

  <form id="checkoutForm">
<<<<<<< HEAD
  <!--<form id="checkoutForm" method="POST" action="https://us-central1-pinto-new-gen.cloudfunctions.net/handlePaymentOmisePinto">--!>
    <input type="hidden" name="omiseToken" />
    <input type="hidden" name="omiseSource" />
    <input type="hidden" name="amount" value="${props.route.params.dishes !== undefined ? (
      moneyCount*100
    ) : (props.route.params.dish.price*100)}" />
=======
  <!--<form id="checkoutForm" method="POST" action="https://us-central1-pinto-new-gen.cloudfunctions.net/handlePaymentOmisePinto">-->
    <input type="hidden" name="omiseToken" />
    <input type="hidden" name="omiseSource" />
    <input type="hidden" name="amount" value="${props.route.params.dish.price * 100}" />
>>>>>>> c1e740a90bc78820fb684e1344dad4eeab3e0acf
    <input type="hidden" name="return_uri" />
    <input type="hidden" name="currency" value="THB" />
  </form>

  <div style="display: flex; justify-content: center; align-items: center; position: absolute; height: 100%; width: 100%">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader">
      <script></script>
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  </div>

  <script type="text/javascript" src="https://cdn.omise.co/omise.js"></script>

  <script>
    OmiseCard.configure({
      publicKey: "pkey_test_5o7ylgkibcpkkugp3cy",
    });

    var button = document.querySelector("#checkoutButton");
    var form = document.querySelector("#checkoutForm");

    OmiseCard.open({
      amount: ${props.route.params.dishes !== undefined ? (
        moneyCount*100
      ) : (props.route.params.dish.price*100)},
      currency: "THB",
      defaultPaymentMethod: "credit_card",
      onCreateTokenSuccess: (nonce) => {
        console.log('JA');
        if (nonce.startsWith("tokn_")) {
          form.omiseToken.value = nonce;
        } else {
          form.omiseSource.value = nonce;
        }
        form.submit();
      },
      onFormClosed: () => {
        window.location.href = 'close';
      },
    });
  </script>
</html>
`;

//   otherPaymentMethods: "alipay, bill_payment_tesco_lotus, internet_banking, truemoney",

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function handlePayment(e) {
    // alert('test');
    //TERUG UNCOMMENTEN !!!
    if (e.data.status === "success") {
      //handle payed in firestore
      if (props.route.params.dish !== undefined) {
        addEmployeesOrder(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, props.route.params.dish, props.route.params.aisle, props.route.params.date, props.route.params.machine[props.route.params.machine_index].name, props.route.params.machine[props.route.params.machine_index].machine_id, props.route.params.machine[props.route.params.machine_index].id, () => {
          updateOrderPayment("success", props.company.selectedCompany.company_id, props.route.params.aisle, props.route.params.machine, formatDate(Date.parse(props.route.params.date)), props.route.params.dish, props.company.selectedCompany.user_id, props.route.params.machine_index, () => {
            deletePendingOrder(props.company.selectedCompany.user_id, () => {
              setPaymentSuccess(true);
              emptyCart();
              setLoading(false);
            })
          });
        });
      }else{
        props.route.params.dishes.map((dish) => {
          addEmployeesOrder(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, dish, props.route.params.aisle, props.route.params.date, props.route.params.machine[props.route.params.machine_index].name, props.route.params.machine[props.route.params.machine_index].machine_id, props.route.params.machine[props.route.params.machine_index].id, () => {
            updateOrderPayment("success", props.company.selectedCompany.company_id, props.route.params.aisle, props.route.params.machine, formatDate(Date.parse(props.route.params.date)), dish, props.company.selectedCompany.user_id, props.route.params.machine_index, () => {
              deletePendingOrder(props.company.selectedCompany.user_id, () => {
                setPaymentSuccess(true);
                emptyCart();
                setLoading(false);
              })
            });
          });
        })
      }
      
    } else if (e.data.status === "failed") {
      if (props.route.params.dish !== undefined) {
        updateOrderPayment("failed", props.company.selectedCompany.company_id, props.route.params.aisle, props.route.params.machine, formatDate(Date.parse(props.route.params.date)), props.route.params.dish, props.company.selectedCompany.user_id, props.route.params.machine_index, () => {
          deletePendingOrder(props.company.selectedCompany.user_id, () => {
            setLoading(false);
            setPaymentFailed(e.response);
          })
        });
      }else{
        props.route.params.dishes.map((dish) => {
          updateOrderPayment("failed", props.company.selectedCompany.company_id, props.route.params.aisle, props.route.params.machine, formatDate(Date.parse(props.route.params.date)), dish, props.company.selectedCompany.user_id, props.route.params.machine_index, () => {
            deletePendingOrder(props.company.selectedCompany.user_id, () => {
              setLoading(false);
              setPaymentFailed(e.response);
            })
          });
      });
    }
  }
}

  return (
    <>
      {loading ? (
        <Loading />
      ) : paymentSuccess ? (
        <Container style={{backgroundColor: "#123835" }}>
          <Content >
            <View style={{ flex: 1, paddingTop: 20, paddingBottom: 60, alignItems: "center", }}>
            {props.route.params.dishes ===  undefined &&
              <Image
              style={(globalStyles.e_layout, styles.image)}
              source={{
                uri: props.route.params.dish.picture,
              }}
              />
            }
          <View style={(globalStyles.e_layout, styles.orderSuccess)}>
            <H1 style={styles.HeadingText}>Order placement succesfull.</H1>
            <H2 style={styles.SubHeadingText}>Your order:</H2>
            
            {
              props.route.params.dishes !==  undefined ? (
                props.route.params.dishes.map((dish) => (
                  <>
                    <Text style={styles.IngredientsText}>Dish: {dish.title}</Text>
                    <Text style={styles.IngredientsText}>Date: {formatDate(Date.parse(dish.date))}</Text>
                  </>
                ))
              ):(
                <>
                  <Text style={styles.IngredientsText}>Dish: {props.route.params.dish.title}</Text>
                  <Text style={styles.IngredientsText}>Date: {formatDate(Date.parse(props.route.params.date))}</Text>
                </>
              )
            }
            
            <Text style={styles.IngredientsText}>
              Machine: {props.route.params.machine[props.route.params.machine_index].name} ({props.route.params.machine[props.route.params.machine_index].machine_id})
            </Text>
            <TouchableOpacity style={globalStyles.button} onPress={() => props.navigation.navigate("Shop")}>
              {!loading ? <Text style={globalStyles.buttonText}>Go back</Text> : <ActivityIndicator size={"small"} color="#000" />}
            </TouchableOpacity>
          </View>
            </View>

          </Content>
        </Container>
      ) : paymentFailed ? (
        <View style={{ flex: 1, paddingTop: 60, alignItems: "center", backgroundColor: "#123835" }}>
          <View style={(globalStyles.e_layout, styles.orderFailed)}>
            <H1 style={styles.HeadingText}>We couldn't process your payment</H1>
            <H2 style={styles.SubHeadingText}>{paymentFailed}</H2>
            <TouchableOpacity style={globalStyles.button} onPress={() => props.navigation.goBack()}>
              {!loading ? <Text style={globalStyles.buttonText}>Go back</Text> : <ActivityIndicator size={"small"} color="#000" />}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <WebView
          onNavigationStateChange={(e) => {
            if (e.url && e.url !== "about:blank" && e.url.includes("omiseToken") && e.url.includes("currency") && e.url.includes("amount")) {
              let result = e.url.replace("about:blank?", "");
              let data = JSON.parse('{"' + decodeURI(result).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
              setLoading(true);
               handlePaymentOmise(data, (e) => {
                handlePayment(e);
              });
            }
            if (e.url && e.url === "close") {
              if (props.route.params.dishes !== undefined) {
                props.route.params.dishes.map((dish) =>{
                  updateOrderPayment("failed", props.company.selectedCompany.company_id, props.route.params.aisle, props.route.params.machine, formatDate(Date.parse(dish.date)), dish, props.company.selectedCompany.user_id, props.route.params.machine_index, () => {
                    deletePendingOrder(props.company.selectedCompany.user_id, () => {
                     
                    })
                  });
                })
                props.navigation.goBack();
              }else {
                updateOrderPayment("failed", props.company.selectedCompany.company_id, props.route.params.aisle, props.route.params.machine, formatDate(Date.parse(props.route.params.date)), props.route.params.dish, props.company.selectedCompany.user_id, props.route.params.machine_index, () => {
                  deletePendingOrder(props.company.selectedCompany.user_id, () => {
                    props.navigation.goBack();
                  })
                });
              }

            }
          }}
          useWebKit={true}
          originWhitelist={["*"]}
          source={{ html: html }}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});

export default connect(mapStateToProps, null)(PaymentScreen);
