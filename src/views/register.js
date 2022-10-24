export default () => /*форма регистрации*/ `
<div class="card p-0 mx-auto my-4 reg" style="width: 85%; font-weight: bold; display: none">
    <div class="card-body">
        <form>
            <div class="row">
                <div class="col-12">
                    <label for="login">Логин</label>
                    <input type="text" class="form-control my-2" id="login" placeholder="Введите логин">
                </div>

                <div class="col-md-6 col-12">
                    <label for="password">Пароль</label>
                    <input type="password" class="form-control my-2" id="password" placeholder="Введите пароль">
                </div>
                <div class="col-md-6 col-12">
                    <label for="passwordConfirm">Подтверждение пароля</label>
                    <input type="password" class="form-control my-2" id="passwordConfirm"
                        placeholder="Подтвердите пароль">
                </div>


                <div class="col-md-6 col-12">
                    <label for="email">Email</label>
                    <input type="email" class="form-control my-2" id="email" placeholder="Введите email">
                </div>
                <div class="col-md-6 col-12">
                    <label for="fullName">ФИО</label>
                    <input type="text" class="form-control my-2" id="fullName" placeholder="Введите ФИО">
                </div>


                <div class="col-md-6 col-12">
                    <label for="birthday">Дата рождения</label>
                    <input type="date" class="form-control my-2" id="birthday" min="1900-01-01">
                </div>
                <div class="col-md-6 col-12">
                    <label for="gender">Укажите пол</label>
                    <select id="gender" class="form-select my-2">
                        <option>Мужской</option>
                        <option>Женский</option>
                    </select>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-primary my-2"
                        id="signUpBtn">Зарегистрироваться</button>
                </div>
            </div>
        </form>
    </div>
</div>
`;