import React from 'react'
import { logout } from '../../services/auth/auth'

export default function SignOut() {
  const handleLogout = () => {
    logout()
  }
  return (
    <button onClick={handleLogout}>LogOut</button>
  )
}