import React, {useState} from 'react'
import  Head  from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import Cookies from 'cookies'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parse } from '@fortawesome/fontawesome-svg-core'



// export const getServerSideProps = async ({ req, response }) => {

//    const cookies = new Cookies(req, response)

//    const BASE_URL = `${process.env.HOST}`

//    let token1 = null
 
//    if (cookies.get('access_token')){
//         token1 = cookies.get('access_token')
//    }else{
//         token1 = null
//    }
  
//    var myHeaders = new Headers();
//  myHeaders.append("accept", "application/json");
//  myHeaders.append("Content-Type", "application/json");
//  myHeaders.append("Authorization", `Bearer ${token1}`);

//    const res = await fetch(BASE_URL +`/products/`, { headers:  myHeaders });
//    const data = await res.json();
  
 
//    // let token1 = null
  
//    // if (cookies.get('access_token')){
//    //      token1 = cookies.get('access_token')
//    // }else{
//    //      token1 = null
//    // }
   
//   console.log(data)
 
//    return {
//        props: {
//           data, token1, BASE_URL
//        },
//    };
//  };

export async function getServerSideProps({ req, response }){
   const cookies = new Cookies(req, response)
 
  
   const BASE_URL = `${process.env.HOST}`
     
   
  
 
   let token1 = null
  
   if (cookies.get('access_token')){
        token1 = cookies.get('access_token')
   }else{
        token1 = null
   }
 
 
   var myHeaders = new Headers();
   myHeaders.append("Authorization", `Bearer ${token1}`);
   // work ahead continue
 
   
   
   var requestOptions = {
     method: 'GET',
     headers: myHeaders,
   

   };
 
   var requestOptions1 = {
     method: 'GET',
     headers: myHeaders,
   
    
   };

   var requestOptions2 = {
      method: 'GET',
      headers: myHeaders,
    
     
    };

    var requestOptions3 = {
      method: 'GET',
      headers: myHeaders,
    
     
    };
 
  
 
  
   const [data1, datas1, datap1, datab1] = await Promise.all([
     fetch(BASE_URL +"/Category/", requestOptions), 
     fetch(BASE_URL +"/subcategory/?category_slug=code", requestOptions1),
     fetch(BASE_URL +"/products/", requestOptions2),
     fetch(BASE_URL +"/brand/", requestOptions3),
     
   ]);
   const [datac, datasub, data, datab] = await Promise.all([
     data1.json(), 
     datas1.json(),
     datap1.json(),
     datab1.json(),
    
   ]);
 
  

   
  
   
   return { props: { datac, datasub, data, datab, token1,BASE_URL } };
 
   
 }



export default function AddProduct({data, datasub, datac, datab, token1, BASE_URL}) {

   const [name, SetName] = useState("")
   const [description, SetDescription] = useState("");
   const [category_image , SetProfileImage] = useState("");
   const [manufacturer_sku, SetManufacturer_sku] = useState("");
   const [product_code , SetProduct_code] = useState("");
   const [length, SetLength] = useState("")
   const [width, SetWidth] = useState("")
   const [height, SetHeight] = useState("")
   const [weight, SetWeight] = useState("")
   const [hsn_code, SetHsn_code] = useState("")
   const [model_no, SetModel_no] = useState("")
   const [mrp, SetMrp] = useState("")
   const [cat, SetCat] = useState("")
   const [sub, SetSub] = useState("")
   const [brand, SetBrand] = useState("")
   const [product_image, SetProduct_image] = useState("")
   const [gallery_images, Setgallery_images] = useState("")
   const [gst, Setgst] = useState("")
   const [baseprice, Setbaseprice] = useState("")
   let [offerprice, Setofferprice] = useState("")
   const [vdio, SetVdio] = useState("")
  
   const [imgsSrc, setImgsSrc] = useState([]);
   var productdata = new FormData();
   const getGalleryImages = (e) => {
     for (let i = 0; i < e.target.files.length; i++ ) {
      // productdata.append('gallery_images', e.target.files[i]);
      //  const reader = new FileReader();
      //  reader.readAsDataURL(file);
      //  reader.onload = () => {
      //    setImgsSrc((imgs) => [...imgs, reader.result]);
      //  };
      //  reader.onerror = () => {
      //    console.log(reader.error);
      //  };
     }
   };
   console.log(imgsSrc, imgsSrc.length);

   const handleSubmit = (e) => {
 
    
      e.preventDefault();
    
      console.log(name,hsn_code)
    
   
  
  
    }

    async function AddCategories() {
 
      let fileInput = document.getElementById('category_image')
         if(name != '' && description != '')
         {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${token1}`);
          
          var formdata = new FormData();
          formdata.append("category_image", fileInput.files[0], `${category_image}`);
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };
          
          fetch(BASE_URL +"/category/?name="+`${name}`+"&description="+`${description}`, requestOptions)
            .then(response => response.json())
            .then(result => { console.log(result)
              
          
          if(result.status == true)
          {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: result.message,
              showConfirmButton: false,
              timer: 2000
            })
  
            
            SetName('')
            SetDescription('')
            SetProfileImage('')
            document.getElementById('closeModel').click();
            router.push("/AddProduct")
  
 
          
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: result.message,
              footer: ''
            })
          }
        }
        
        
        )
        .catch(error => console.log('error', error));
       
        
    }
    else{
      Swal.fire('All fields are required')
    }
        
    
    
      }
      console.log("deleteret")
      console.log(token1)
      console.log(data[0].id)


    function myFunction() {


      // console.log(name,hsn_code, baseprice, gst, offerprice)

      // var offers = (baseprice*gst/100);

      // var offe = parseInt(baseprice) + parseInt(offers)

      // console.log(offe)

      // Setofferprice(parseInt(baseprice*gst/100)+parseInt(baseprice))

      // console.log(3+8)

      // console.log(offers)

      // var x = document.getElementById("offerprice");
      // x.value = x.value.Setofferprice(parseInt(baseprice*gst/100)+parseInt(baseprice))

     

      // let offers = (baseprice*gst/100);

      // let offerprice = parseInt(baseprice) + parseInt(offers)

      if(gst>0)
      {
      Setofferprice(parseInt(baseprice*gst/100)+parseInt(baseprice))
      }
      else{
         Setofferprice(null)
      }
    }
   

   async function AddProducts() {
 
 
 

 

 
      let fileInput = document.getElementById('product_image')
      let product_video = document.getElementById('product_video')

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token1}`);
console.log("thumbnail :"+fileInput.files[0])


      productdata.append("product_image", fileInput.files[0], `${product_image}`);
      productdata.append("vdio", product_video.files[0], `${product_video}`);
      
// productdata.append("gallery_images", imgsSrc);

var totalfiles = document.getElementById('gallery_images').files.length;
for (var index = 0; index < totalfiles; index++) {
   productdata.append("gallery_images", document.getElementById('gallery_images').files[index]);
}

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: productdata,
  redirect: 'follow'
};

fetch(BASE_URL + "/product/?name="+`${name}`+"&manufacturer_sku="+`${manufacturer_sku}`+"&product_code="+`${product_code}`+"&model_no="+`${model_no}`+"&description="+`${description}`+"&length="+`${length}`+"&width="+`${width}`+"&height="+`${height}`+"&weight="+`${weight}`+"&hsn_code="+`${hsn_code}`+"&mrp="+`${mrp}`+"&category_id="+`${cat}`+"&subcategory_id="+`${sub}`+"&brand_id="+`${brand}`+"&gst="+`${gst}`+"&base_price="+`${baseprice}`+"&offer_price="+`${offerprice}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
   }

   console.log(data)
   console.log(token1)
   console.log(datasub)
  return (
    <>
         <Head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Buy4Business | Add Products</title>
      
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"/>
    
      <link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css"/>
      
      <link rel="stylesheet" href="/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css"/>
      <link rel="stylesheet" href="/plugins/datatables-responsive/css/responsive.bootstrap4.min.css"/>
      <link rel="stylesheet" href="/plugins/datatables-buttons/css/buttons.bootstrap4.min.css"/>
     
      <link rel="stylesheet" href="/dist/css/adminlte.min.css"/>

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous" />

      
   </Head>
   <>
      <div className="wrapper">
        
         <nav className="main-header navbar navbar-expand navbar-white navbar-light">
         
            <ul className="navbar-nav ml-auto">
               <li className="nav-item">
                  <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                  <i className="fas fa-expand-arrows-alt"></i>
                  </a>
               </li>
            </ul>
         </nav>
     
         <aside className="main-sidebar sidebar-dark-primary elevation-4">
            
            <a href="index.html" className="brand-link">
            <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}}/>
            <span className="brand-text font-weight-light">Buy4Business</span>
            </a>
           
            <div className="sidebar">
             
               <nav className="mt-2">
                  <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    
                     <li className="nav-item">
                        <a href="index.html" className="nav-link">
                           <i className="nav-icon fas fa-tachometer-alt"></i>
                           <p>
                              Dashboard
                           </p>
                        </a>
                     </li>
                     <li className="nav-item   menu-open active">
                              <Link href="/AddCategories"><a className="nav-link">
                                 <i className="far fa-circle nav-icon text-info"></i>
                                 <p>Add Categories</p>
                              </a>
                              </Link>
                           </li>
                           <li className="nav-item">
                              <Link href="/AddBrands"><a  className="nav-link">
                                 <i className="far fa-circle nav-icon text-success"></i>
                                 <p>Add Brands</p>
                              </a>
                              </Link>
                           </li>
                           <li className="nav-header">Products</li>
                           <li className="nav-item">
                              <Link href="/AddProduct"><a className="nav-link">
                                 <i className="far fa-circle nav-icon text-success"></i>
                                 <p>Add Products</p>
                              </a>
                              </Link>
                           </li>
					  <li className="nav-item">
                       <Link href="/ViewProducts"><a  className="nav-link">
                           <i className="far fa-circle nav-icon text-success"></i>
                           <p>View Products</p>
                        </a></Link>
                     </li>
                  </ul>
               </nav>
              
            </div>
          
         </aside>
        
         <div className="content-wrapper">
           
            <section className="content-header">
               <div className="container-fluid">
                  <div className="row mb-2">
                     <div className="col-sm-6">
                     </div>
                     <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                           <li className="breadcrumb-item"><a href="#" style={{color: 'dodgerblue'}}>Home</a></li>
                           <li className="breadcrumb-item active">Add Products</li>
                        </ol>
                     </div>
                  </div>
               </div>
            
            </section>
         
            <section className="content">
               <div className="container-fluid">
                  <div className="row">
                  
                  <div className="row card-body">
                              <div className="col-md-12">
                                 <div className="card">
                                    <div className="card-header">
                                       <h3 className="card-title"> Products</h3>
                                    </div>
                                   
                                    <div className="row card-body">
                                       <div className="col-md-4">
                                          <div className="row form-group">
                                             <label>Select Category</label>
                                             <div className="col-md-10">
                                             <select id="cat" className="form-control"  onChange={(e) => SetCat(e.target.value)} value={`${cat}`} required>
                                                   <option disabled="">Choose Category</option>
                                                   {datac.map((n, index) => { 
                            return(
                          <option value={n.id} key={index}>{n.name}</option>
                            )
                         })}
                                                </select>
                                             </div>
                                             <div className="col-md-2">
                                                <div className="card">
                                                   <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#category"><i className="fa fa-plus-circle" aria-hidden="true"></i> </button>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
									   
                                       <div className="col-md-4">
                                          <div className="row form-group">
                                             <label>Select Subcategory</label>
                                             <div className="col-md-10">
                                             <select id="sub" className="form-control"  onChange={(e) => SetSub(e.target.value)} value={`${sub}`} required>
                                                   <option disabled="">Choose Subcategory</option>
                                                   {datasub.map((o, index) => { 
                            return(
                          <option value={o.id} key={index}>{o.name}</option>
                            )
                         })}
                                                </select>
                                             </div>
                                             <div className="col-md-2">
                                                <div className="card">
                                                   <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#subcategory"><i className="fa fa-plus-circle" aria-hidden="true"></i> </button>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
									   
									   <div className="col-md-4">
                                          <div className="form-group">
                                             <label htmlFor=""> Product Name</label>
                                             <input type="text" className="form-control" id="name" placeholder="Enter category name" onChange={(e) => SetName(e.target.value)} value={`${name}`} />
                                          </div>
                                       </div>
									   
                                       <div className="col-md-4">
                                          <div className="row form-group">
                                             <label>Select Brand</label>
                                             <div className="col-md-10">
                                             <select id="brand" className="form-control"  onChange={(e) => SetBrand(e.target.value)} value={`${brand}`} required>
                                                   <option disabled="">Choose Brand</option>
                                                   {datab.map((n, index) => { 
                            return(
                          <option value={n.id} key={index}>{n.brand_name}</option>
                            )
                         })}
                                                 
                                                </select>
                                             </div>
                                             <div className="col-md-2">
                                                <div className="card">
                                                   <button className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#brand"><i className="fa fa-plus-circle" aria-hidden="true"></i> </button>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-md-4">
                                          <div className="form-group">
                                             <label htmlFor=""> Manufacture SKU</label>
                                             <input type="text" className="form-control" id="manufacturer_sku" placeholder="Enter Manufacture SKU" onChange={(e) => SetManufacturer_sku(e.target.value)} value={`${manufacturer_sku}`} required/>
                                          </div>
                                       </div>
                                       <div className="col-md-4">
                                          <div className="form-group">
                                              <label htmlFor="">Product Code</label>
                                             <input type="text" className="form-control" id="product_code" placeholder="Enter Product Code" onChange={(e) => SetProduct_code(e.target.value)} value={`${product_code}`} required/>
                                          </div>
                                       </div>
                                       <div className="col-md-4">
                                         <div className="form-group">
                                            <label htmlFor="">Model No.</label>
                                          <input type="text" className="form-control" id="model_no" placeholder="Enter Model No." onChange={(e) => SetModel_no(e.target.value)} value={`${model_no}`} required/>
                                          </div>
                                       </div>
                                       <div className="col-md-4">
                                          <div className="form-group">
                                             <label htmlFor="">HSN Code</label>
                                            <input type="text" className="form-control" id="hsn_code" placeholder="Enter HSN Code" onChange={(e) => SetHsn_code(e.target.value)} value={`${hsn_code}`} required/>
                                        </div>
                                        </div>
									   
                                        <div className="col-md-4">
                                           <div className="form-group">
                                              <label htmlFor="">Product MPR</label>
                                              <input type="number" className="form-control" id="mrp" placeholder="Enter Product MPR" onChange={(e) => SetMrp(e.target.value)} value={`${mrp}`} required/>
                                           </div>
                                        </div>
									   
									   <div className="col-md-4">
                                          <div className="form-group">
                                             <label htmlFor="">Base Price</label>
                                             <input type="number" className="form-control" id="baseprice" placeholder="Enter Base Price" onChange={(e) => Setbaseprice(e.target.value)} value={`${baseprice}`}/>
                                          </div>
                                       </div>
									   
									   <div className="col-md-4">
                                          <div className="form-group">
                                             <label htmlFor="">GST Rate</label>
                                             <input type="number" className="form-control" id="gst" placeholder="Enter GST Rate" onChange={(e) => Setgst(e.target.value)} value={`${gst}`} onKeyUp={myFunction}/>
                                          </div>
                                       </div>
									   
									   <div className="col-md-4">
                                          <div className="form-group">
                                             <label htmlFor="">Offer Price</label>
                                             <input type="number" className="form-control" id="offerprice" placeholder="Enter Offer Price" onChange={(e) => Setofferprice(e.target.value)} value={`${offerprice}`} readOnly/>
                                          </div>
                                       </div>
									   
									   {/* <div className="col-md-4">
                                          <div className="form-group">
                                             <label htmlFor="">Discount</label>
                                             <input type="number" className="form-control" id="" placeholder="Enter Discount"/>
                                          </div>
                                       </div> */}
                                       
                                       <div className="col-md-2">
                                           <div className="form-group">
                                              <label htmlFor="">Height</label>
                                              <input type="number" className="form-control" id="height" placeholder="Enter Height" onChange={(e) => SetHeight(e.target.value)} value={`${height}`} required/>
                                           </div>
                                        </div>
                                       <div className="col-md-2">
                                          <div className="form-group">
                                              <label htmlFor="">Width</label>
                                              <input type="number" className="form-control" id="width" placeholder="Enter Width" onChange={(e) => SetWidth(e.target.value)} value={`${width}`} required/>
                                           </div>
                                        </div>
                                       <div className="col-md-2">
                                           <div className="form-group">
                                              <label htmlFor="">Length</label>
                                              <input type="number" className="form-control" id="length" placeholder="Enter Length" onChange={(e) => SetLength(e.target.value)} value={`${length}`} required/>
                                           </div>
                                       </div>
                                       <div className="col-md-2">
                                          <div className="form-group">
                                              <label htmlFor="">Weight</label>
                                              <input type="number" className="form-control" id="weight" placeholder="Enter Weight" onChange={(e) => SetWeight(e.target.value)} value={`${weight}`} required/>
                                           </div>
                                       </div>
                                       
                                       <div className="col-md-12">
                                           <div className="form-group">
                                              <label htmlFor="Description">Product Description:</label>
                                              <textarea className="form-control" rows="4" id="description" placeholder="Enter product description" onChange={(e) => SetDescription(e.target.value)} value={`${description}`} required></textarea>
                                          </div>
                                        </div>
									   
									   <div className="col-md-4">
                                          <label htmlFor="">Upload Thumbnail Image</label>

                                          <div className="input-group">
                                             <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                            </div>
                                             <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="product_image"
                                                    aria-describedby="inputGroupFileAddon01" onChange={(e) => SetProduct_image(e.target.value)} value={`${product_image}`} required/>
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                              </div>
                                          </div>
                                       
                                       </div>
									   
                                       <div className="col-md-4">
                                           <label htmlFor="">Upload Product Images</label>

                                           <div className="input-group">
                                             <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                             </div>
                                             <div className="custom-file">
                                                <input type="file" multiple className="custom-file-input" id="gallery_images"
                                                   aria-describedby="inputGroupFileAddon01" onChange={getGalleryImages} required/>
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                             </div>
                                          </div>

                                       
                                      </div>
									   
									    <div className="col-md-4">
                                          <label htmlFor="">Upload Product Video</label>
                                          <div className="input-group">
                                             <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                             </div>
                                             <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="product_video"
                                                   aria-describedby="inputGroupFileAddon01"/>
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="card-footer">
                              <button type="submit" className="btn btn-primary"  onClick={AddProducts}>Submit</button>
                           </div>
                   
                  </div>
               
               </div>
              
            </section>
          
         </div>
        
         <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
               <b>Version</b> 3.2.0-B4B
            </div>
            <strong>Copyright &copy; 2022 <Link href=""><a style={{color: 'dodgerblue'}}>Buy4Business</a></Link>.</strong> All rights reserved.
         </footer>
       
         <aside className="control-sidebar control-sidebar-dark">
          
         </aside>
        
      </div>
     
	  
	
         <div id="category" className="modal fade" role="dialog">
            <div className="modal-dialog">
             
               <div className="modal-content">
                  <div className="modal-header">
                     <button type="button" id="closeModel" className="close" data-bs-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body">
                     <div className="card">
                        <div className="card-header">
                           <h3 className="card-title">Add Category</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                                          <div className="card-body">
                                             <div className="form-group">
                                                <label htmlFor="exampleInputEmail1"> Category Name</label>
                                                <input type="text" className="form-control" id="name" placeholder="Enter category name" onChange={(e) => SetName(e.target.value)} value={`${name}`} required />
                                             </div>
                                             <div className="mb-3">
                                                      <label htmlFor="exampleFormControlTextarea1" className="form-label">Category Description</label>
                                                      <textarea className="form-control" id="description" rows="3"  placeholder="Enter category description" onChange={(e) => SetDescription(e.target.value)} value={`${description}`} required></textarea>
                                                   </div>
                                             <div className="form-group">
                                                <label htmlFor="contact">Upload Profile picture:</label>
                                                <input type="file" className="form-control" id="category_image" onChange={(e) => SetProfileImage(e.target.value)} value={`${category_image}`}/>
                                             </div>
                                             <button type="submit" onClick={AddCategories} className="btn btn-primary">Submit</button>
                                          </div>
                                          </form>
                     </div>
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                  </div>
               </div>
            </div>
         </div>
		 
		
         <div id="subcategory" className="modal fade" style={{display: 'none'}} aria-hidden="true">
            <div className="modal-dialog">
            
               <div className="modal-content">
                  <div className="modal-header">
                     <button type="button" className="close" data-bs-dismiss="modal">×</button>
                  </div>
                  <div className="modal-body">
                     <div className="card">
                        <div className="card-header">
                           <h3 className="card-title">Add Subcategory</h3>
                        </div>
                        <div className="card-body">
									      <div className="form-group">
                                            <label>Select Category</label>
                                              <select className="form-control">
                                                  <option disabled="">Choose Category</option>
                                                  <option>Phone</option>
                                              </select>
                                          </div>
                                          <div className="form-group">
                                             <label htmlhtmlFor="exampleInputEmail1"> Subcategory Name</label>
                                             <input type="text" className="form-control" id="" placeholder="Enter subcategory name"/>
                                          </div>
                                          <button type="submit" className="btn btn-primary">Submit</button>
                                       </div>
                     </div>
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                  </div>
               </div>
            </div>
         </div>
		 
	
         <div id="brand" className="modal fade" role="dialog">
            <div className="modal-dialog">
            
               <div className="modal-content">
                  <div className="modal-header">
                     <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body">
                     <div className="card">
                        <div className="card-header">
                           <h3 className="card-title">Add Brand</h3>
                        </div>
                        <div className="card-body">
                           <div className="form-group">
                              <label htmlhtmlFor="exampleInputEmail1"> Brand Name</label>
                              <input type="text" className="form-control" id="" placeholder="Enter Brand name"/>
                           </div>
                           <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                     </div>
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                  </div>
               </div>
            </div>
         </div>
	  
	  
    
         <Script type="text/jsx" src="/plugins/jquery/jquery.min.js"></Script>
     
     <Script type="text/jsx" src="/plugins/bootstrap/js/bootstrap.bundle.min.js"></Script>
    
     <Script type="text/jsx" src="/plugins/bs-custom-file-input/bs-custom-file-input.min.js"></Script>
   
     <Script type="text/jsx" src="/dist/js/adminlte.min.js"></Script>
   
     <Script type="text/jsx" src="/dist/js/demo.js"></Script>
   
     <Script type="text/jsx" src="/plugins/datatables/jquery.dataTables.min.js"></Script>
     <Script type="text/jsx" src="/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></Script>
     <Script type="text/jsx" src="/plugins/datatables-responsive/js/dataTables.responsive.min.js"></Script>
     <Script type="text/jsx" src="/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></Script>
     <Script type="text/jsx" src="/plugins/datatables-buttons/js/dataTables.buttons.min.js"></Script>
     <Script type="text/jsx" src="/plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></Script>
     <Script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></Script>


{/* <Script type="text/jsx">
window.jQuery || document.write('<Script type="text/jsx" src="http://mysite.com/jquery.min.js"></Script>
</Script> */}

<Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></Script>
    
      {/* <Script>
         $(function () {
           $("#example1").DataTable({
             "responsive": true, "lengthChange": false, "autoWidth": false,
             "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
           }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
           $('#example2').DataTable({
             "paging": true,
             "lengthChange": false,
             "searching": false,
             "ordering": true,
             "info": true,
             "autoWidth": false,
             "responsive": true,
           });
         });
      </Script> */}
   </>
    </>
  )
}
