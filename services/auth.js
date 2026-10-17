export const getUserInfo =async (id)=>{
    const response = await fetch(`http://localhost:3000/users/${id}`)
    if(!response.ok){
        throw new Error('خطا در دریافت اطلاعات کاربر')
    }
    const user = await response.json()

    return user
}