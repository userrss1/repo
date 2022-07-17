import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import Cookies from 'cookies'


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
 
    const res = await fetch(BASE_URL +`/products/`, { headers:  myHeaders });
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

export default function ViewProducts({data, BASE_URL}) {

    console.log(data)
  return (
    <>
      <Head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Buy4Business | View Products</title>
     
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"/>
    
      <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css"/>
     
      <link rel="stylesheet" href="plugins/datatables-bs4/css/dataTables.bootstrap4.min.css"/>
      <link rel="stylesheet" href="plugins/datatables-responsive/css/responsive.bootstrap4.min.css"/>
      <link rel="stylesheet" href="plugins/datatables-buttons/css/buttons.bootstrap4.min.css"/>
      
      <link rel="stylesheet" href="dist/css/adminlte.min.css"/>
   </Head>
   <div className="hold-transition sidebar-mini layout-fixed">
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
            <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}}/>
            <span className="brand-text font-weight-light">Buy4Business</span>
          
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
                              </a>
                              </Link>
                           </li>
                  </ul>
               </nav>
            </div>
            </a>
           
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
                           <li className="breadcrumb-item active">View Products</li>
                        </ol>
                     </div>
                  </div>
               </div>
             
            </section>
         
            <section className="content">
               <div className="container-fluid">
                  <div className="row">
                     <div className="col-12">
                        <div className="card card-primary">
                           <div className="card-header">
                              <h3 className="card-title">View Products</h3>
                           </div>
                           
                           <div className="card-body">
                         
                              <table id="example1" className="table table-bordered table-striped">
                                 <thead>
                              
                                    <tr>
                                       <th>ID</th>
									   <th>Product_Image</th>
									   <th>Product_Name</th>
                                       <th>Category</th>
                                       <th>Subcategory</th>
									   <th>Brand</th>
									   <th>MRP</th>
									   <th>Manufacture_SKU</th>
									   <th>Product_Code</th>
									   <th>Modal_No</th>
                                       <th>Length</th>
									   <th>Width</th>
									   <th>Height</th>
									   <th>Weight</th>
									   <th>HSN Code</th>
									   <th>Product_Description</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                 {data.map((o=> {
                                                                  return (
                                                                     <>
                                    <tr>
                                       <td>{o.id}</td>
                                       <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYZgQkGhzzaGImYLNE-ZWbI7tkXePwnd0DqA&usqp=CAU" height="70" width="70" className="brand-image img-circle"/></td>
                                       <td><strong className="text-primary">{o.name} </strong></td>
                                       <td>{o.category_id}</td>
									   <td>{o.subcategory_id}</td>
									   <td>{o.addbrand_id}</td>
                                       <td>{o.mrp}</td>
                                       <td>{o.manufacturer_sku}</td>
                                       <td>{o.product_code}</td>
									   <td>{o.model_no}</td>
                                       <td>{o.length}</td>
									   <td>{o.width}</td>
                                       <td>{o.height}</td>
									   <td>{o.weight}</td>
                                       <td>{o.hsn_code}</td>
                                       <td>{o.description}</td>
                                    </tr>
                                    </>)
                                                               }))} 
                                   
                                 </tbody>
                              </table>
                            
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
  
      {/* <script>
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
      </script> */}
   </div>
    </>
  )
}
