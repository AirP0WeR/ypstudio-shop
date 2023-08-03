import Image from 'next/image';

export default async function EditProductPage() {


  return (
    <div className="container">
      <form action={update}>
        <legend>Создать товар</legend>
        <div className="mb-3">
          <label className="form-label">Название</label>
          <input name="name" type="string" className="form-control" placeholder="Название" defaultValue={`${product.name}`}></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Цена</label>
          <input name="price" type="number" className="form-control" placeholder="0" defaultValue={`${product.price}`}></input>
        </div>
        <div className="mb-3">
          <div className="row">
            <div className='col'>
              <label className="form-label">Изображение</label>
              <input required name="file" type="file" accept="image/png, image/jpeg" className="form-control"></input>
            </div>
            <div className='col'>
              <label className="form-label">Текущее фото</label>
              <input disabled="true" name="image" type="string" className="form-control" placeholder="Картинка" defaultValue={`${product.image}`}></input>
            </div>
            <div className='col text-center'>
              <Image
              src={`${product.image}`}
              width={150}
              height={150}
              alt="Product"
            />
            </div>
          </div>

        </div>
        <div className="mb-3">
          <label className="form-label">Бренд</label>
          <input name="brand" type="string" className="form-control" placeholder="Бренд" defaultValue={`${product.brand}`}></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Количество в наличии</label>
          <input name="count" type="number" className="form-control" placeholder="Количество в наличии" defaultValue={`${product.countInStock}`}></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Категоря</label>
          <input name="category" type="string" className="form-control" placeholder="Категоря" defaultValue={`${product.category}`}></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Описание</label>
          <input name="description" type="string" className="form-control" placeholder="Описание" defaultValue={`${product.description}`}></input>
        </div>
        <button type="submit" value="Создать">
          Сохранить
        </button>
      </form>
    </div>
  );
}
