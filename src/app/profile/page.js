
export default async function Profile() {

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <h2>User Profile</h2>
          <form>
          <div className="mb-3">
              <label className="form-label">Имя</label>
              <input className="form-control" type='string' placeholder='Имя'></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input className="form-control" type='email' placeholder='Enter email'></input>
            </div>
            <button className="btn btn-primary" type='submit' variant='primary'>
              Update
            </button>
          </form>
        </div>

        <div className="col-9">
          <h2>My Orders</h2>
          <table className='table table-striped table-hover table-responsive'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>order.createdAt</td>
                <td>order.totalPrice</td>
                <td>
                  order.isPaid

                </td>
                <td>

                </td>
                <td>
                  <button className='btn btn-primary' variant='light'>
                    Подробнее
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
