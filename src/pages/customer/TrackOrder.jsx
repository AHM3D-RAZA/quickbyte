import React from 'react'
import OrderTrack from '../../components/orders/OrderTrack'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

const TrackOrder = () => {
  return (
    <>
      <div className='pb-5'>
        <Navbar />
      </div>
      <OrderTrack />
      <Footer />
    </>
  )
}

export default TrackOrder