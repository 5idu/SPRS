const user = (state = {}, action) => {
  switch (action.type) {
    case 'saveUser':
      //return action.user
      return Object.assign({},state,action.user)
    case 'clearUser':
      return {}
    default:
      return state
  }
}

export default user