const BASE="https://image-upload-chandan.onrender.com/api/gallery"
export async function fetchImages(){
    const res=await fetch(BASE);
    if(!res.ok) throw new Error("Failed to fetch images")
    return res.json();
}

export async function uploadImage(formData){
    const res=await fetch(BASE+"/upload",{
        method:"POST",
        body:formData,
    })
    if(!res.ok) throw new Error("Failed to upload image")
    return res.json();
}

export async function deleteImage(id){
    const res=await fetch(BASE+"/"+id,{
        method:"DELETE",
    })
    if(!res.ok) throw new Error("Failed to delete image")
    return res.json();
}