export default () => /*форма отзыва*/ ` 
<div class="card p-0" id="newReviewForm">
    <div class="card-header mb-2">Добавить отзыв</div>
    <form class="mx-3 my-3">
        <label for="newReviewText">Текст отзыва</label>
        <textarea class="form-control mb-4 mt-2" id="newReviewText" rows="2"></textarea>
        <label for="newReviewRating"><strong>Оценка</strong></label>
        <select class="form-control" id="newReviewRating">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
        </select>
        <div class="form-check my-4">
            <input type="checkbox" class="form-check-input" id="newReviewAnonymous">
            <label class="form-check-label" for="newReviewAnonymous">Оставить отзыв анонимно</label>
        </div>
        <p class="d-none text-danger">Ошибка!</p>
        <button type="button" class="btn btn-primary" id="saveReview">Сохранить</button>
    </form>
</div>
`;