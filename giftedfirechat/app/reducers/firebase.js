const firebase = (state = [], action) => {
  switch (action.type) {
    case 'SET_FIREBASE':
      return action.item
    default:
      return state
  }
}

export default firebase