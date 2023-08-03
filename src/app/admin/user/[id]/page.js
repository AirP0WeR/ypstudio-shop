

export default async function UserPage({id}) {

  return (
    <div className="container">
        <h1>{id}</h1>
      <form action="#">
        <legend>Изменить пользователя</legend>
        <div className="mb-3">
          <label className="form-label">Имя</label>
          <input name="name" type="string" className="form-control" placeholder="Название" defaultValue="{`${user.name}`}"></input>
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input name="email" type="email" className="form-control" placeholder="email" defaultValue="{`${user.email}`}"></input>
        </div>
        <button type="submit" value="Создать">
           Сохранить
        </button>
      </form>
    </div>
  );
}
