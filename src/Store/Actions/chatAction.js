import { CLICKED_GD, MESSAGE_SENT } from "../../Constants/actions";

export const ClickdGD = (key) => (dispatch) => {
    dispatch({
        type: CLICKED_GD,
        payload: key
    })
}

export const Chat = (details) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    firestore.collection("messages").add({
        message: details.message,
        s_id: details.s_id,
        g_id: details.g_id,
        s_dn: details.s_dn,
        createdAt: Date()
    }).then(()=>{
        dispatch({
            type: MESSAGE_SENT
        })
    })
}