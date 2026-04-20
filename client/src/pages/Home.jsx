import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import CuratedCollection from "../components/CuratedCollection";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <NewArrivals />
      <CuratedCollection />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
