import { GROUP_CREATED, GROUP_CREATE_ERROR } from "../../Constants/actions";

const initState = {}

const DashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case GROUP_CREATED:
            console.log(action.payload)
            return state
        case GROUP_CREATE_ERROR:
            console.log(action.payload)
            return state
        default:
            return state
    }
}

export default DashboardReducer