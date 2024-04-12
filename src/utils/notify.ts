import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';



export const AlertNofity=(title:string,body:string)=>{
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: title??'Success',
    textBody: body,
  })
}

export const AlertNofityError=(title:string,body:string)=>{
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: title??'Error',
    textBody: body,
  })
}