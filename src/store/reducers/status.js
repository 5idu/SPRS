import { TODO_STATUS,DOING_STATUS,DONE_STATUS } from '../actions';

let statusId = 0;
const status = (state = {}, action) => {
  switch (action.type) {
    case TODO_STATUS:
      return Object.assign({},state,action.status)
    case DOING_STATUS:
      return Object.assign({},state,action.status)
    case DONE_STATUS:
      return Object.assign({},state,action.status)
    default:
      return state
  }
}

export default status