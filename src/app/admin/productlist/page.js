// import { DeleteProductButton, EditProductButton } from '@/components/buttons.component'
import Link from 'next/link';

export default async function Page() {

  // logHelper(products[0]._id)

  return (
    <div className="container">

      <div className='row align-items-center'>
        <div className='col'>
          <h1>Товары</h1>
        </div>
        <div className='col text-end'>
          <Link href="/admin/product">
            <button type="button" className="btn my-3">
              Создать товар
            </button >
          </Link>
        </div>
      </div>

      <table className='table striped bordered hover responsive'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* {products.map((product) => (
            <tr>
              <td>{JSON.stringify(product._id)}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
            <td>
              <div className='container'>
                <EditProductButton id={product.id} key={product.id}/>
                <DeleteProductButton id={product.id} key={product.id}/>
              </div>
            </td>
          </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}