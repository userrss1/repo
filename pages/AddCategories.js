import React, { useState } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link'
import styles from "./styles.module.css";
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Cookies from 'cookies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faPlus,
   faEye,
   faTimesCircle,
   faCheckSquare,
   faBell,
   faCog,
   faHeart,
   faClock,
   faSignOut,
   faUsers,
   faExclamation,
   faFrown,
   faInr,
   faSearch,
   faPencilSquare,
   faTrash
} from "@fortawesome/free-solid-svg-icons";





// export const getServerSideProps = async ({ req, response }) => {

//    const cookies = new Cookies(req, response)

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

//    const res = await fetch(`http://buy4business.ap-south-1.elasticbeanstalk.com/Category/`, { headers:  myHeaders });
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
//           data, token1
//        },
//    };
//  };


export async function getServerSideProps({ req, response }) {
   const cookies = new Cookies(req, response)


   const BASE_URL = `${process.env.HOST}`




   let token1 = null

   if (cookies.get('access_token')) {
      token1 = cookies.get('access_token')
   } else {
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




   const [data1, datas1] = await Promise.all([
      fetch(BASE_URL + "/Category/", requestOptions),
      fetch(BASE_URL + "/subcategory/", requestOptions1),

   ]);
   const [data, datasub] = await Promise.all([
      data1.json(),
      datas1.json(),

   ]);

   console.log(data)
   console.log(datasub)


   return { props: { data, datasub, token1, BASE_URL } };


}


export default function AddCategories({ data, token1, datasub, BASE_URL }) {
   const [name, SetName] = useState("")
   const [description, SetDescription] = useState("");
   const [category_image, SetProfileImage] = useState("");
   const [profile_image, SetProfile] = useState("");
   const [category_id, SetCategory_id] = useState("");
   const [subcategory_image, SetProfileSub] = useState("");
   const [name1, SetName1] = useState("");
   const [users, SetUser] = useState([])

   console.log(data)
   console.log(datasub)
   const router = useRouter()


   const handleSubmit = (e) => {


      e.preventDefault();

      console.log(name, description, category_image)




   }

   const postDelete = (id) => {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token1}`);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
         "category_id": `${id}`
      });

      var requestOptions = {
         method: 'DELETE',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
      };

      fetch(BASE_URL + "/delete_category", requestOptions)
         .then(response => response.text())
         .then(result => console.log(result))
         .catch(error => console.log('error', error));

   }


   async function AddCategories() {

      let fileInput = document.getElementById('category_image')
      if (name != '' && description != '') {
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

         fetch(BASE_URL + "/category/?name=" + `${name}` + "&description=" + `${description}`, requestOptions)
            .then(response => response.text())
            .then(result => {
               console.log(result)

               if (result.status == true) {
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
                  router.push('./Categories')

               } else {
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
      else {
         Swal.fire('All fields are required')
      }



   }
   console.log("deleteret")
   console.log(token1)
   console.log(data[0].id)

   function selectCategories(id) {

      console.log(id)
      // SetUser(data)
      //  let i = users(id-1)
      //  SetName(i.name)
      //  SetDescription(i.description)
      //  SetProfile(i.profile_image)
   }

   async function UpdateCategories() {

      console.log("yo")





      let fileInput = document.getElementById('profile_image')
      if (name != '' && description != '') {
         var myHeaders = new Headers();
         myHeaders.append("Authorization", `Bearer ${token1}`);

         var formdata = new FormData();
         formdata.append("profile_image", fileInput.files[0], `${profile_image}`);

         var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
         };


         fetch(BASE_URL + "/category?id=" + `${id}` + "&name=" + `${name}` + "&description=" + `${description}`, requestOptions)
            .then(response => response.json())
            .then(result => {
               console.log(result)
               if (result.status == true) {
                  Swal.fire({
                     position: 'top-end',
                     icon: 'success',
                     title: result.message,
                     showConfirmButton: false,
                     timer: 2000
                  })


                  SetName('')
                  SetDescription('')
                  SetProfile('')
                  document.getElementById('closeModel').click();
                  router.push('./Categories')

               } else {
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
      else {
         Swal.fire('All fields are required')
      }



   }


   async function AddSubCategories() {

      let fileInput = document.getElementById('subcategory_image')
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token1}`);

      var formdata = new FormData();
      formdata.append("subcategory_image", fileInput.files[0], `${subcategory_image}`);

      var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: formdata,
         redirect: 'follow'
      };

      fetch(BASE_URL + "/subcategory/?category_id=" + `${category_id}` + "&name=" + `${name1}` + "&description=" + `${description}`, requestOptions)
         .then(response => response.text())
         .then(result => console.log(result))
         .catch(error => console.log('error', error));
   }



   return (
      <>
         <Head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Buy4Business | Add Categories</title>

            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" />

            <link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css" />

            <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

            <link rel="stylesheet" href="/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css" />

            <link rel="stylesheet" href="/plugins/icheck-bootstrap/icheck-bootstrap.min.css" />

            <link rel="stylesheet" href="/plugins/jqvmap/jqvmap.min.css" />

            <link rel="stylesheet" href="/dist/css/adminlte.min.css" />
            <link rel="stylesheet" href="/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css" />

            <link rel="stylesheet" href="/plugins/overlayScrollbars/css/OverlayScrollbars.min.css" />

            <link rel="stylesheet" href="/plugins/daterangepicker/daterangepicker.css" />

            <link rel="stylesheet" href="/plugins/summernote/summernote-bs4.min.css" />

            <link rel="stylesheet" href="/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css" />
            <link rel="stylesheet" href="/plugins/datatables-responsive/css/responsive.bootstrap4.min.css" />
            <link rel="stylesheet" href="/plugins/datatables-buttons/css/buttons.bootstrap4.min.css" />
            <link rel="stylesheet" href="/form.css" />
         </Head>
         <div>
            <>
               <div className="wrapper">

                  <nav className="main-header navbar navbar-expand navbar-white navbar-light">

                     <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                           <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                              <i className="fas fa-expand-arrows-alt"></i>
                           </a>
                        </li>
                        <li className="nav-item">
                           <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                              <i className="fas fa-th-large"></i>
                           </a>
                        </li>
                     </ul>
                  </nav>

                  <aside className="main-sidebar sidebar-dark-primary elevation-4">

                     <a href="index.html" className="brand-link">
                        {/* <Image src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className={styles.absDiv}  width="35" height="30"  style={{opacity: '.8'}}/> */}
                        <div className={styles.absDiv}>
                           <Image
                              width={35}
                              height={30}
                              style={{ opacity: '.8' }}
                              src="/dist/img/AdminLTELogo.png"
                           />
                        </div>
                        &nbsp; &nbsp; &nbsp; &nbsp; <span className="brand-text font-weight-light">Buy4Business</span>
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
                              <li className="nav-header">Categories</li>
                              <li className="nav-item   menu-open active">
                                 <Link href="/AddCategories"><a className="nav-link">
                                    <i className="far fa-circle nav-icon text-info"></i>
                                    <p>Add Categories</p>
                                 </a>
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link href="/AddBrands"><a className="nav-link">
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
                                 <Link href="/ViewProducts"><a className="nav-link">
                                    <i className="far fa-circle nav-icon text-success"></i>
                                    <p>View Products</p>
                                 </a>
                                 </Link>
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
                                    <li className="breadcrumb-item"><a href="#" style={{ color: 'dodgerblue' }}>Home</a></li>
                                    <li className="breadcrumb-item active">Add Categories</li>
                                 </ol>
                              </div>
                           </div>
                        </div>

                     </section>

                     <section className="content">
                        <div className="container-fluid">
                           <div className="row">

                              <div className="col-md-12">

                                 <div className="card card-primary">
                                    <div className="card-header">
                                       <h3 className="card-title">Categories</h3>
                                    </div>


                                    <div className="row card-body">
                                       <div className="col-md-4">
                                          <div className="card">
                                             <div className="card-header">
                                                <h3 className="card-title">Add Categories</h3>
                                             </div>
                                             <form onSubmit={handleSubmit}>
                                                <div className="card-body">
                                                   <div className="form-group">
                                                      <label htmlFor="exampleInputEmail1"> Category Name</label>
                                                      <input type="text" className="form-control" id="name" placeholder="Enter category name" onChange={(e) => SetName(e.target.value)} value={`${name}`} required />
                                                   </div>
                                                   {/* <div className="form-group">
                                                <label htmlFor="exampleInputEmail1"> Category Description</label>
                                                <input type="text" className="form-control" id="description" placeholder="Enter category description" onChange={(e) => SetDescription(e.target.value)} value={`${description}`} required />
                                             </div> */}
                                                   <div className="mb-3">
                                                      <label htmlFor="exampleFormControlTextarea1" className="form-label">Category Description</label>
                                                      <textarea className="form-control" id="description" rows="3"  placeholder="Enter category description" onChange={(e) => SetDescription(e.target.value)} value={`${description}`} required></textarea>
                                                   </div>
                                                   <div className="form-group">
                                                      <label htmlFor="contact">Upload Profile picture:</label>
                                                      <input type="file" className="form-control" id="category_image" onChange={(e) => SetProfileImage(e.target.value)} value={`${category_image}`} />
                                                   </div>
                                                   <button type="submit" onClick={AddCategories} className="btn btn-primary">Submit</button>
                                                </div>
                                             </form>
                                          </div>
                                       </div>
                                       <div className="col-md-8">
                                          <div className="card">
                                             <div className="card-header">
                                                <h3 className="card-title">View Categories</h3>
                                             </div>

                                             <div className="card-body">
                                                <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                                   <div className="row">
                                                      <div className="col-sm-12">
                                                         <div id="example1_filter" className="dataTables_filter"><label>Search:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="example1" /></label></div>
                                                      </div>
                                                   </div>
                                                   <div className="row">
                                                      <div className="col-sm-12">

                                                         <table id="example1" className="table table-bordered table-striped dataTable no-footer dtr-inline collapsed" aria-describedby="example1_info">
                                                            <thead>
                                                               <tr>
                                                                  <th className="sorting sorting_asc" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="ID: activate to sort column descending">ID</th>
                                                                  <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Employee: activate to sort column ascending">Categories Name</th>
                                                                  <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Father Name: activate to sort column ascending">Action</th>
                                                               </tr>
                                                            </thead>
                                                            <tbody>
                                                               {data.map((o => {
                                                                  return (
                                                                     <>
                                                                        <tr className="odd">

                                                                           <td className="dtr-control sorting_1" tabIndex={0}>{o.id}</td>
                                                                           <td><strong className="text-primary">{o.name} </strong></td>
                                                                           <td><button className="btn btn-primary btn sm" data-bs-toggle="modal" data-bs-target="#category" onClick={(e) => selectCategories(o.id)}><i className="fa fa-pencil-square" aria-hidden="true"></i>  </button></td>
                                                                           <td><button type="button" className="btn btn-danger btn sm" data-bs-toggle="modal" data-bs-target="#myModal1" onClick={(e) => postDelete(o.id)}>  <i className="fa fa-trash" aria-hidden="true"></i> </button></td>

                                                                        </tr>
                                                                     </>)
                                                               }))}
                                                            </tbody>
                                                         </table>

                                                      </div>
                                                   </div>
                                                   <div className="row">
                                                      <div className="col-sm-12 col-md-5">
                                                         <div className="dataTables_info" id="example1_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div>
                                                      </div>
                                                      <div className="col-sm-12 col-md-7">
                                                         <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                                                            <ul className="pagination">
                                                               <li className="paginate_button page-item previous disabled" id="example1_previous"><a href="#" aria-controls="example1" data-dt-idx="0" tabIndex={0} className="page-link">Previous</a></li>
                                                               <li className="paginate_button page-item active"><a href="#" aria-controls="example1" data-dt-idx="1" tabIndex={0} className="page-link">1</a></li>
                                                               <li className="paginate_button page-item next disabled" id="example1_next"><a href="#" aria-controls="example1" data-dt-idx="2" tabIndex={0} className="page-link">Next</a></li>
                                                            </ul>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>

                                          </div>
                                       </div>
                                    </div>

                                 </div>

                              </div>

                              <div className="col-md-12">

                                 <div className="card card-primary">
                                    <div className="card-header">
                                       <h3 className="card-title">Subcategories</h3>
                                    </div>

                                    <div className="row card-body">
                                       <div className="col-md-4">
                                          <div className="card">
                                             <div className="card-header">
                                                <h3 className="card-title">Add Subcategories</h3>
                                             </div>
                                             <form onSubmit={handleSubmit}>
                                                <div className="card-body">

                                                   <div className="form-group">
                                                      <label>Select Categories Id</label>
                                                      <select className="form-control" id="category_id" onChange={(e) => SetCategory_id(e.target.value)} value={`${category_id}`} required >
                                                         <option disabled="">Choose Categories</option>
                                                         {data.map((l, index) => {
                                                            return (
                                                               <option value={l.id} key={index}>{l.id}</option>
                                                            )
                                                         })}
                                                      </select>
                                                   </div>
                                                   <div className="form-group">
                                                      <label>Select Categories Name</label>
                                                      <select className="form-control" id="name1" onChange={(e) => SetName1(e.target.value)} value={`${name1}`} required>
                                                         <option disabled="">Choose Categories</option>
                                                         {data.map((d, index) => {
                                                            return (
                                                               <option value={d.name} key={index}>{d.name}</option>
                                                            )
                                                         })}
                                                      </select>
                                                   </div>

                                                   <div className="form-group">
                                                      <label htmlFor="exampleInputEmail1"> Subcategories Description</label>
                                                      <input type="text" className="form-control" id="description" placeholder="Enter category description" onChange={(e) => SetDescription(e.target.value)} value={`${description}`} required />
                                                   </div>
                                                   <div className="form-group">
                                                      <label htmlFor="contact">Upload Profile picture:</label>
                                                      <input type="file" className="form-control" id="subcategory_image" onChange={(e) => SetProfileSub(e.target.value)} value={`${subcategory_image}`} />
                                                   </div>
                                                   <button type="submit" onClick={AddSubCategories} className="btn btn-primary">Submit</button>
                                                </div>
                                             </form>
                                          </div>
                                       </div>
                                       <div className="col-md-8">
                                          <div className="card">
                                             <div className="card-header">
                                                <h3 className="card-title">View Subcategories</h3>
                                             </div>

                                             <div className="card-body">
                                                <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                                   <div className="row">
                                                      <div className="col-sm-12">
                                                         <div id="example1_filter" className="dataTables_filter"><label>Search:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="example1" /></label></div>
                                                      </div>
                                                   </div>
                                                   <div className="row">
                                                      <div className="col-sm-12">

                                                         <table id="example1" className="table table-bordered table-striped dataTable no-footer dtr-inline collapsed" aria-describedby="example1_info">
                                                            <thead>
                                                               <tr>
                                                                  <th className="sorting sorting_asc" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="ID: activate to sort column descending">ID</th>
                                                                  <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Employee: activate to sort column ascending">Categories Name</th>
                                                                  <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Father Name: activate to sort column ascending">Subcategories</th>
                                                                  <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Father Name: activate to sort column ascending">Action</th>
                                                               </tr>
                                                            </thead>
                                                            <tbody>
                                                               {data.map((b => {
                                                                  return (
                                                                     <>
                                                                        <tr className="odd">
                                                                           <td className="dtr-control sorting_1" tabIndex={0}>{b.id}</td>
                                                                           <td><strong className="text-primary">{b.name} </strong></td>
                                                                           <td><strong className="text-primary">{b.slug} </strong></td>
                                                                           <td><button className="btn btn-primary btn-sm"><i className="fa fa-pencil-square" aria-hidden="true"></i> </button></td>
                                                                        </tr>
                                                                     </>)
                                                               }))}
                                                            </tbody>
                                                         </table>


                                                      </div>
                                                   </div>
                                                   <div className="row">
                                                      <div className="col-sm-12 col-md-5">
                                                         <div className="dataTables_info" id="example1_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div>
                                                      </div>
                                                      <div className="col-sm-12 col-md-7">
                                                         <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                                                            <ul className="pagination">
                                                               <li className="paginate_button page-item previous disabled" id="example1_previous"><a href="#" aria-controls="example1" data-dt-idx="0" tabIndex={0} className="page-link">Previous</a></li>
                                                               <li className="paginate_button page-item active"><a href="#" aria-controls="example1" data-dt-idx="1" tabIndex={0} className="page-link">1</a></li>
                                                               <li className="paginate_button page-item next disabled" id="example1_next"><a href="#" aria-controls="example1" data-dt-idx="2" tabIndex={0} className="page-link">Next</a></li>
                                                            </ul>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>

                                          </div>
                                       </div>
                                    </div>

                                 </div>

                              </div>

                           </div>

                        </div>

                     </section>

                  </div>

                  <footer className="main-footer">
                     <div className="float-right d-none d-sm-block">
                        <b>Version</b> 3.2.0-B4B
                     </div>
                     <strong>Copyright &copy; 2022 <Link href=""><a style={{ color: 'dodgerblue' }}>Buy4Business</a></Link>.</strong> All rights reserved.
                  </footer>

                  <aside className="control-sidebar control-sidebar-dark">

                  </aside>

               </div>

               {data.map((i => {
                  return (
                     <>

                        <div id="category" className="modal fade" role="dialog">
                           <div className="modal-dialog">

                              <div className="modal-content">
                                 <div className="modal-header">
                                    <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
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
                                             <div className="form-group">
                                                <label htmlFor="exampleInputEmail1"> Category Description</label>
                                                <input type="text" className="form-control" id="description" placeholder="Enter category description" onChange={(e) => SetDescription(e.target.value)} value={`${description}`} required />
                                             </div>
                                             <div className="form-group">
                                                <label htmlFor="contact">Upload Profile picture:</label>
                                                <input type="file" className="form-control" id="profile_image" onChange={(e) => SetProfile(e.target.value)} value={`${profile_image}`} />
                                             </div>

                                             <button type="submit" onClick={(e) => UpdateCategories(i.id)} className="btn btn-primary">Submit</button>

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
                     </>)
               }))}
               <div className="modal" id="myModal1">
                  <div className="modal-dialog">
                     <div className="modal-content">

                        <div className="modal-header">
                           <h4 className="modal-title">You want to delete?</h4>
                           <button type="button" className="btn-close" data-bs-dismiss="modal"><i className="fa fa-window-close" aria-hidden="true"></i></button>
                        </div>

                        <div className="modal-footer">
                           <button type="button" className="btn btn-success" data-bs-dismiss="modal">Yes</button>
                           <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
                        </div>
                     </div>
                  </div>
               </div>

               <Script type="text/jsx" src="/plugins/jquery/jquery.min.js" />

               <Script type="text/jsx" src="/plugins/bootstrap/js/bootstrap.bundle.min.js" />

               <Script type="text/jsx" src="/plugins/bs-custom-file-input/bs-custom-file-input.min.js" />

               <Script type="text/jsx" src="/dist/js/adminlte.min.js" />

               <Script type="text/jsx" src="/dist/js/demo.js" />

               <Script type="text/jsx" src="/plugins/datatables/jquery.dataTables.min.js" />
               <Script type="text/jsx" src="/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js" />
               <Script type="text/jsx" src="/plugins/datatables-responsive/js/dataTables.responsive.min.js" />
               <Script type="text/jsx" src="/plugins/datatables-responsive/js/responsive.bootstrap4.min.js" />
               <Script type="text/jsx" src="/plugins/datatables-buttons/js/dataTables.buttons.min.js" />
               <Script type="text/jsx" src="/plugins/datatables-buttons/js/buttons.bootstrap4.min.js" />
               <Script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js" />


               {/* <Script type="text/jsx">
               window.jQuery || document.write('<Script type="text/jsx" src="http://mysite.com/jquery.min.js">
             */}

               {/* <Script type="text/jsx">
         $(function () {
           bsCustomFileInput.init();
         });
      </Script type="text/jsx"> */}
            </>
         </div>
      </>
   )
}

