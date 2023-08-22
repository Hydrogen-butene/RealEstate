import { Modal, Button } from '@mantine/core'
import {DatePicker} from '@mantine/dates'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import UserDetailContext from "../../context/UserDetailContext"
import { bookVisit } from '../../utils/api.js'

const BookingModal = ({opened, setOpened, email, propertyId}) => {

  const [value, setValue] = useState(null)
  const {userDetails:{token}} = useContext(UserDetailContext)

  const {mutate, isLoading} = useMutation({
    mutationFn: ()=> bookVisit(value, propertyId,email, token)
  })

  return (
    <Modal
    opened = {opened}
    onClose = {()=>setOpened(false)}
    title="Select your date of visit"
    centered
    >
          <div className="flexColCenter">
            <DatePicker value={value} onChange={setValue} minDate={new Date()}/>
            <Button disabled={!value} onClick={()=> mutate()}>
              book visit
            </Button>
          </div>
    </Modal>
  )
}

export default BookingModal