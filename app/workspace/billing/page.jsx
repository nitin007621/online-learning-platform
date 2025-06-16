import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Billing() {
  return (
    <div>
        <h2 className='text-3xl font-bold mb-5'>Select Plan</h2>
        <PricingTable />
    </div>
  )
}

export default Billing