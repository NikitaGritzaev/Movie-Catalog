export default () => /*профиль пользователя*/ `
<div class="row mt-4 mx-4 mb-4 bg-white px-4 py-4" id="profile-container">
<div class="col-12 col-md-3">
  <img class="card-img-top profile-avatar" src="..." alt="..." id="avatarImage">
</div>

<div class="col-12 col-md-9 bold">
  <h1 id="name"></h1>
  <form>
    <div class="row">
      <div class="col-12">
        <label for="email">Email</label>
        <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" class="form-control my-2" id="email"
          placeholder="Введите email">
      </div>

      <div class="col-12">
        <label for="avatarLink">Ссылка на аватар</label>
        <input type="text" class="form-control my-2" id="avatarLink" placeholder="Укажите ссылку на аватар">
      </div>

      <div class="col-12">
        <label for="fullName">ФИО</label>
        <input type="text" class="form-control my-2" id="fullName" placeholder="Введите ФИО">
      </div>

      <div class="col-12">
        <label for="birthday">Дата рождения</label>
        <input type="date" class="form-control my-2" id="birthday">
      </div>

      <div class="col-12">
        <label for="gender">Укажите пол</label>
        <select id="gender" class="form-select my-2">
          <option>Мужской</option>
          <option>Женский</option>
        </select>
      </div>


      <div>
        <button type="button" class="btn btn-primary my-2" id="signUpBtn">Зарегистрироваться</button>
      </div>

    </div>
  </form>
</div>
</div>
`;