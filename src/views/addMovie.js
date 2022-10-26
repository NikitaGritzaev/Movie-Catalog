export default () => `
<div class="card p-0 mx-auto my-4 bold" style="width: 85%;">
      <div class="card-body">
        <label for="addMovieName">Название</label>
        <input type="text" class="form-control my-2" id="addMovieName" placeholder="Введите название фильма">

        <label for="addMovieAvatarLink">Ссылка на постер</label>
        <input type="text" class="form-control my-2" id="addMovieAvatarLink" placeholder="Введите ссылку на постер">

        <label for="addMovieYear">Год</label>
        <input type="number" class="form-control my-2" id="addMovieYear" placeholder="Введите год фильма" min="1900">

        <label for="addMovieCountry">Страна</label>
        <input type="text" class="form-control my-2" id="addMovieCountry" placeholder="Введите страну фильма">

        <label for="addMovieTime">Время</label>
        <input type="number" class="form-control my-2" id="addMovieTime" placeholder="Введите длительность" min="0">

        <label for="addTagline">Слоган</label>
        <input type="text" class="form-control my-2" id="addTagline" placeholder="Введите слоган">

        <label for="newFilmDesc">Описание</label>
        <textarea class="form-control my-2" id="newFilmDesc" placeholder="Введите описание"></textarea>

        <label for="addMovieDirector">Режиссер</label>
        <input type="text" class="form-control my-2" id="addMovieDirector" placeholder="Укажите режиссера">

        <label for="addMovieBudget">Бюджет</label>
        <input type="number" class="form-control my-2" id="addMovieBudget" placeholder="Укажите бюджет" min="0" step="1000000">

        <label for="addMovieFees">Сборы</label>
        <input type="number" class="form-control my-2" id="addMovieFees" placeholder="Укажите сборы" min="0" step="1000000">

        <label for="addMovieAge">Возрастные ограничения</label>
        <input type="number" class="form-control my-2" id="addMovieAge" placeholder="Укажите возрастные ограничения" min="0" max="18">

        <label for="addMovieGenres">Используйте ctrl для множественного выбора жанров</label>
        <select class="form-select" multiple aria-label="multiple select example" id="addMovieGenres">
        </select>

        <button type="button" class="btn btn-primary my-2" id="newMovieBtn">Добавить</button>
        <a class="btn btn-secondary my-2 mw-75" id="newGenreBtn" href="/genres">Жанры</a>
      </div>
</div>
`;