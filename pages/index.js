import React,{useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Script from 'next/script'
import Head from 'next/head'
import axios from 'axios'
import { getCookie, setCookies, removeCookies } from 'cookies-next';
const cookies = new Cookies();
import Cookies from 'cookies'
export async function getServerSideProps({ req, res }) {
    const cookies = new Cookies(req, res)
    let error_message = ''
    let status = false
  
    // await getBody('http://192.168.1.101:8081/api/login/');
    
    const BASE_URL = `${process.env.HOST}`
  

    
    var urlencoded = new URLSearchParams();
    urlencoded.append("username", "admin");
    urlencoded.append("password", "admin@123");
    
    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: urlencoded,
    //   redirect: 'follow'
    // };
    
    // fetch("https://2287-2409-4043-2b97-bf2b-e1d6-ad53-10f5-3023.ngrok.io/auth/token", requestOptions)
    //   .then(response => response.json())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    const { data } = await axios(BASE_URL +"/auth/token",
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'accept': 'application/json' },
          mode: 'cors', method: 'POST', data: urlencoded
        });
  
      console.log(data)
  
    

 
    if (data.access_token) {
      status = true
      // cookies.set('access_token', data.access_token, { path: '/' });
      // cookies.set('access_token', data.access_token, {
      //     httpOnly: true // true by default
      // })
  
      setCookies('access_token', data.access_token, {
        req, res,
        httpOnly: true // true by default
      });

      return {
        redirect: {
          destination: "AddCategories",
          permanent: true,
        },

      }; 
  
      // cookie.set('access_token', data.access_token);
    } else {
      err = data.detail
    }

    return {

        props: {
        
          data
    
    
        }
      };
    }


export default function Home() {
  return (
    <div>
   
    </div>
  )
}
