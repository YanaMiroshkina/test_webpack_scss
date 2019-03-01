# Запуск проекта:

1. npm install
2. npm run start

В папке dist находится сборка для продакшена (с минифицированными css и js). 
Можно скачать ее и открыть index.html.

## Примечания:

*Для меня главное - хорошая читаемость кода. И такая css-вложенность, которая читаемости помогает, а не мешает.*

**1. Мне удобнее в .sass / .scss писать полные имена классов сразу, без вложенности через & - просто потому, что так нагляднее.**

```
.card__title {}
.card__front {}
.card__back {}
```

Амперсанд удобно использовать для добавления свойств элемента с дополнительными классами, псевдоклассами или модификаторами.
Такой css для элемента не будет занимать много места и может быть окинут одним взглядом, без перелистывания страницы.

```
.menu__item {
  display: block;
  padding: 26px 28px 25px;
  font-size: 18px;
  color: #fff;
  background-color: $color_menu;
  
  &:last-child {
    border-top: 1px solid $color_menu;
  }

  &:hover,
  &--active {
    background-color: $color_menu_active;
  }
}
```


**2. Мне нравится в одном месте указывать применение одинаковых стилей к нескольким элементам:**

```
.input,
.select__selected,
.option {
  padding: 0 11px;
  height: 42px;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid $color_light_grey;
}
```

Можно было бы использовать плейсхолдер для применения одного набора стилей к нескольким селекторам, но тогда приходится при просмотре стилей элемента искать плейсхолдер, чтобы понимать, какие стили к элементу он применяет.

```
%input_styles {
  padding: 0 11px;
  height: 42px;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid $color_light_grey;
}

.input {
  ...
  @extend %input_styles;
}

.select__selected {
  ...
  @extend %input_styles;
}

.option {
  ...
  @extend %input_styles;
}
```

**3. В файле script.js есть свои комментарии.**

