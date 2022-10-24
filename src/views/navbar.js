export default () => /*навбар для авторизованного пользователя*/ ` 
<nav class="navbar navbar-dark navbar-expand-md bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="/1">Movies catalog</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/1" id="moviesLink">Фильмы</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/favorites" id="favoritesLink">Избранное</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/profile" id="profileLink">Мой профиль</a>
                </li>
            </ul>
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/profile" id="user"></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/1" id="logout">Выйти</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
`;