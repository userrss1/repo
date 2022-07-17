// import React from 'react'

// const extra = () => {
//   return (
//     <div>  let fileInput = document.getElementById('product_image')
//     if(name != '' && description != '' && manufacturer_sku != '' && product_code != '' && length != '' && width != '' && height != '' && weight != '' && hsn_code != '' && model_no != '' && mrp != '' && cat != '' && sub != '' && brand != '' )
//     {
//      var myHeaders = new Headers();
//      myHeaders.append("Authorization", `Bearer ${token1}`);
     
//      var formdata = new FormData();
//      formdata.append("product_image", fileInput.files[0], `${product_image}`);
     
//      var requestOptions = {
//        method: 'POST',
//        headers: myHeaders,
//        body: formdata,
//        redirect: 'follow'
//      };
     
//      fetch("https://57ef-2401-4900-36ac-adfa-6062-10b6-d588-422c.ngrok.io/product/?name="+`${name}`+"&manufacturer="+`${manufacturer_sku}`+"&product_code="+`${product_code}`+"&model_no="+`${model_no}`+"&description="+`${description}`+"&length="+`${length}`+"&width="+`${width}`+"&height="+`${height}`+"&weight="+`${weight}`+"&hsn_code="+`${hsn_code}`+"&mrp="+`${mrp}`+"&cat="+`${cat}`+"&sub="+`${sub}`+"&brand="+`${brand}`, requestOptions)
//        .then(response => response.text())
//        .then(result => { console.log(result)
     
//      if(result.status == true)
//      {
//        Swal.fire({
//          position: 'top-end',
//          icon: 'success',
//          title: result.message,
//          showConfirmButton: false,
//          timer: 2000
//        })

       
//        // SetName('')
//        // SetDescription('')
//        // SetProfileImage('')
//        document.getElementById('closeModel').click();
//        router.push('./AddProduct')
     
//      }else{
//        Swal.fire({
//          icon: 'error',
//          title: 'Oops...',
//          text: result.message,
//          footer: ''
//        })
//      }
//    }
   
   
//    )
//    .catch(error => console.log('error', error));
  
   
// }
// else{
//  Swal.fire('All fields are required')
// }</div>
//   )
// }

// export default extra