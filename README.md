# Запуск проекта:

1. npm install
2. npm run start

## Примечания:

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
  background-color: #1F2229;
  
  &:last-child {
    border-top: 1px solid #1F2229;
  }

  &:hover,
  &--active {
    background-color: #2a2d37;
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
  border: 1px solid #e4e9ee;
}
```

Можно было бы использовать плейсхолдер для применения одного набора стилей к нескольким селекторам, но тогда приходится при просмотре стилей элемента искать плейсхолдер, чтобы понимать, какие стили к элементу он применяет.

```
%input_styles {
  padding: 0 11px;
  height: 42px;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid #e4e9ee;
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

