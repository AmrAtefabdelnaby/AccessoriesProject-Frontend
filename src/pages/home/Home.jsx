import React, { useRef } from 'react'
import NewArrivals from '../../components/newArrivals/NewArrivals'
import Carousel from '../../components/carousel/Carousel'
import Services from '../../components/services/Services'
import GetUpdates from '../../components/getAllUpdates/GetUpdates'
import ProductsSection from '../../components/productsSection/ProductsSection'

export default function Home() {
  const productsSectionRef = useRef(null);

  const scrollToProducts = () => {
    productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className=' py'>
      <Carousel  onButtonClick={scrollToProducts}/>
      <NewArrivals/>
      <Services/>
      <GetUpdates/>
      <div ref={productsSectionRef}>
      <ProductsSection />
      </div>
    </div>
  )
}
