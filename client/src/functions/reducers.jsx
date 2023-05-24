export function postsReducer(state,action){
    const {payload,type}=action
    switch (type) {
        case "POSTS_REQUEST":    return { ...state, loading: true, error: "" };
        case "POSTS_SUCCESS": return {...state, loading: false, posts: payload,error: "",};
        case "POSTS_ERROR": return { ...state, loading: false, error: payload };
        default:return state;
            
    }
}


export function profileReducer(state,action){
    const {payload,type}=action
    switch (type) {
        case "PROFILE_REQUEST":    return { ...state, loading: true, error: "" };
        case "PROFILE_SUCCESS": return {...state, loading: false, profile: payload,error: "",};
        case "PROFILE_ERROR": return { ...state, loading: false, error: payload };
        default:return state;
            
    }
}

export function photosReducer(state, action) {
  const {payload,type}=action
    switch (type) {
      case "PHOTOS_REQUEST":return { ...state, loading: true, error: "" };
      case "PHOTOS_SUCCESS": return {...state,loading: false,photos: payload,error: "", };
      case "PHOTOS_ERROR":return { ...state, loading: false, error: payload };
      default:return state;
    }
  }