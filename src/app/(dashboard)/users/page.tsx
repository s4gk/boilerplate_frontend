import { UsersTable } from '@/features/users/components/UserTable'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Users Saves | Vestel',
  description: 'This is User Administration Page Of Saves',
}

export default function Users() {
  return (
    <>
      <UsersTable />
    </>
  )
}
