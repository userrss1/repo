import React, {useState} from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import Cookies from 'cookies'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'


export const getServerSideProps = async ({ req, response }) => {

    const cookies = new Cookies(req, response)

    const BASE_URL = `${process.env.HOST}`
 
    let token1 = null
  
    if (cookies.get('access_token')){
         token1 = cookies.get('access_token')
    }else{
         token1 = null
    }
   
    var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token1}`);
 
    const res = await fetch(BASE_URL +"/brand/", { headers:  myHeaders });
    const data = await res.json();
   
  
    // let token1 = null
   
    // if (cookies.get('access_token')){
    //      token1 = cookies.get('access_token')
    // }else{
    //      token1 = null
    // }
    
   console.log(data)
  
    return {
        props: {
           data, token1, BASE_URL
        },
    };
  };

export default function AddBrands({data, token1, BASE_URL}) {

      const [data1, setData] = useState({
    name1: ""
   
  })

  function submit(e) {
    e.preventDefault();
  }

  const postBrand = () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token1}`);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "brand_name": data1.name1
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(BASE_URL +"/brand/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const postBrands = (e) => {

    const newdata = { data1 }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
    console.log("hiiii")

  }
  return (
    <>
       <Head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Buy4Business | Add Brands</title>
   
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"/>
    
      <link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css"/>
     
      <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    
      <link rel="stylesheet" href="/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"/>
  
      <link rel="stylesheet" href="/plugins/icheck-bootstrap/icheck-bootstrap.min.css"/>
     
      <link rel="stylesheet" href="/plugins/jqvmap/jqvmap.min.css"/>
      
      <link rel="stylesheet" href="/dist/css/adminlte.min.css"/>
      <link rel="stylesheet" href="/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css"/>
      
      <link rel="stylesheet" href="/plugins/overlayScrollbars/css/OverlayScrollbars.min.css"/>
     
      <link rel="stylesheet" href="/plugins/daterangepicker/daterangepicker.css"/>

      <link rel="stylesheet" href="/plugins/summernote/summernote-bs4.min.css"/>
 
      <link rel="stylesheet" href="/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css"/>
      <link rel="stylesheet" href="/plugins/datatables-responsive/css/responsive.bootstrap4.min.css"/>
      <link rel="stylesheet" href="/plugins/datatables-buttons/css/buttons.bootstrap4.min.css"/>
      <link rel="stylesheet" href="/form.css"/>
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
               <li className="nav-item">
                  <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                  <i className="fas fa-th-large"></i>
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
                     <li className="nav-header">Categories</li>
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
                           <li className="breadcrumb-item active">Add Brands</li>
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
                               <h3 className="card-title">Brands</h3>
                           </div>
                          
                           
                              <div className="row card-body">
                                 <div className="col-md-4">
                                    <div className="card">
                                       <div className="card-header">
                                          <h3 className="card-title">Add Brands</h3>
                                       </div>
                                      
                                       <div className="card-body">
                                       <form onSubmit={(e) => submit(e)}>
                                          <div className="form-group">
                                       
                                             <label htmlFor="exampleInputEmail1"> Brands Name</label>
                                             <input type="name" className="form-control"  placeholder="Enter category name"  onChange={(e) => postBrands(e)} id="name1" value={data1.name1} required/>
                                          </div>
                                          <button type="submit" className="btn btn-primary" onClick={postBrand}>Submit</button>
                                          </form>
                                       </div>
                                      
                                    </div>
                                 </div>
                                 <div className="col-md-8">
                                    <div className="card">
                                       <div className="card-header">
                                          <h3 className="card-title">View Brands</h3>
                                       </div>
                                     
                                       <div className="card-body">
                                          <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                             <div className="row">
                                                <div className="col-sm-12">
                                                   <div id="example1_filter" className="dataTables_filter"><label>Search:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="example1"/></label></div>
                                                </div>
                                             </div>
                                             <div className="row">
                                                <div className="col-sm-12">
                                                    {data.map((o) => { 
                                                        return(<>
                                                   <table id="example1" className="table table-bordered table-striped dataTable no-footer dtr-inline collapsed" aria-describedby="example1_info">
                                                      <thead>
                                                         <tr>
                                                            <th className="sorting sorting_asc" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="ID: activate to sort column descending">ID</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Employee: activate to sort column ascending">Brands Name</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Father Name: activate to sort column ascending">Action</th>
                                                         </tr>
                                                      </thead>
                                                      <tbody>
                                                         <tr className="odd">
                                                            <td className="dtr-control sorting_1" tabIndex={0}>{o.id}</td>
                                                            <td><strong className="text-primary">{o.brand_name} </strong></td>
                                                            <td><button className="btn btn-primary btn sm"><i className="fa fa-pencil-square" aria-hidden="true"></i>  </button></td>
                                                         </tr>
                                                      </tbody>
                                                   </table>
                                                   </>
                                                        )
                                                   })}
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
            <strong>Copyright &copy; 2022 <Link href=""><a style={{color: 'dodgerblue'}}>Buy4Business</a></Link>.</strong> All rights reserved.
         </footer>
       
         <aside className="control-sidebar control-sidebar-dark">
          
         </aside>
        
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
   </>
    </>
  )
}
