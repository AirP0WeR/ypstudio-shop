
import Link from 'next/link';


export default async function UsersListPage() {


  return (
    <div className="container">
      <h1>Пользователя</h1>
      <table className='table striped bordered hover responsive'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
          </tr>
        </thead>
        <tbody>
            {/* {users.map((user) => (
              <tr>
                <td>{JSON.stringify(user._id)}</td>
                <td>{user.name}</td>
                <td><Link href={`mailto:${user.email}`}>{user.email}</Link></td>
                <td>
                  {user.role ? (
                    <FaCheck/>
                  ) : (
                    <FaTimes/>
                  )}
                </td>
                <td>
                  {!user.role && (
                    <>
                      <EditUserButton id={user.id}/>
                      <DeleteUserButton id={user.id}/> 
                    </>
                  )}
                </td>
              </tr>
            ))} */}
          </tbody>
      </table>


    </div>
  )
}