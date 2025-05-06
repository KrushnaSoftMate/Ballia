"use client";
import { React } from "react";
import Landingpage from "./LandingPage/page";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


if (typeof window != undefined) {
  window.googleTranslateElementInit = function () {
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en' },
      'google_translate_element'
    );
  }
}
export default function Home({ children }) {


  return (
    <>
      <Landingpage />
      {/* <AdminLogin /> */}
      {/* <CitizenLogin/> */}
      
    </>
  );
}
