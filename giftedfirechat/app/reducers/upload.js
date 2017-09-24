const upload = (state = [], action) => {
  switch (action.type) {
    case 'BEGIN_UPLOAD':
      return { uploading: true }
    case 'UPLOAD_DONE':
      return { uploading: false, url: action.url }
    default:
      return state
  }
}

export default upload