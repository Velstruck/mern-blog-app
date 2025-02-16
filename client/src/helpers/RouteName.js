export const RouteIndex = '/'
export  const RouteSignIn = '/signin'
export  const RouteSignUp = '/signup'
export const RouteProfile = '/profile'
export const RouteCategoryDetails = '/categories'
export const RouteAddCategory = '/category/add'
export const RouteEditCategory = (category_id)=>{
    if(category_id){
        return `/category/edit/${category_id}`
    }else{
        return '/category/edit/:category_id'
    }
}

export const RouteBlog = '/blog'
export const RouteBlogAdd = '/blog/add'
export const RouteBlogEdit = (blogid)=>{
    if(blogid){
        return `/blog/edit/${blogid}`
    }else{
        return '/blog/edit/:blogid'
    }
}


export const RouteBlogDetails = (category,blog) =>{
    if(!category || !blog){
        return '/blog/:category/:blog'
    }
    else{
        return `/blog/${category}/${blog}`
    }
}

export const RouteBlogByCategory = (category) =>{
    if(!category){
        return '/blog/:category'
    }
    else{
        return `/blog/${category}`
    }
}