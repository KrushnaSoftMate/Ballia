'use client'
import React ,{useEffect}from 'react'
import './navbar.css';
import Link from 'next/link';
import NavbarProperty from '@/Components/NavbarProperty';

const CustomerNavbar = ({ children }) => {
  useEffect(()=>{ 
    // if (typeof window !== 'undefined') {
    //     window.googleTranslateElementInit = function () {
    //      let google= new window.google
    //      google.translate.TranslateElement(
    //         { pageLanguage: 'en' },
    //         'google_translate_element'
    //       );
    //     }
    // window.googleTranslateElementInit()}
  },[])
  return (
    <>
     <NavbarProperty/>

      {children}
    </>
  )
}

export default CustomerNavbar