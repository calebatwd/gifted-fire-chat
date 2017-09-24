export default (state = 0, action) => {
  switch (action.type) {
    case 'SETLOCATION':
      return {}
    default:
      return state
  }
}