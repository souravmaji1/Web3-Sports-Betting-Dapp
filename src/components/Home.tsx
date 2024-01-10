import React from "react"
import Image from "next/image"
import BettingImage from '../../public/betting.png'

export default function Home() {

  return (
    <div  style={{ display: 'table-caption', flexDirection: 'row', overflowX: 'auto',marginLeft:'990px', maxHeight:'877px', overflowY:'auto', paddingTop:'20px', paddingLeft:'5px', paddingRight:'5px', marginTop:'738px' }} >
      <Image src={BettingImage} alt="" />
    </div>
  )
}
