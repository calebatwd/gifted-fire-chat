const location = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      console.log(action.coordinate)
      return {
        coordinate: action.coordinate,
        error: null
      }
    case 'ERROR_LOCATION':
      return {
        coordinate: { latitude: 32, longitude: -122 },
        error: action.error
      }
    default:
      return state
  }
}

export default location
