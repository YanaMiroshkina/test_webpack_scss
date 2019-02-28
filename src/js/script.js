'use strict';

$(function() {

  var body = $('body'),
  el_input = $('[data-js-number], [data-js-cardholder]'); 

  /* ========================================= */
  /* =========== COMMON FUNCTIONS ============ */
  /* ========================================= */

  function add_class_invalid(el) {
    el.addClass('invalid');
  }

  function remove_class_invalid(el) {
    el.removeClass('invalid');
  }

  $.each(el_input, function() {
    $(this).on('focus', function(e) {
      remove_class_invalid($(e.target));
    });
  });

  /* ========================================= */
  /* ============ TOGGLE SELECT ============== */
  /* ========================================= */

  var card_year = 0,
  el_select = $("[data-js-select]"),
  el_select_month = $("[data-js-select='month']"),
  el_select_year = $("[data-js-select='year']"),
  selected_value = $("[data-js-selected-value]"),
  list_options = $("[data-js-options]"),
  el_option = $("[data-js-option]"),
  el_toggle_select = $("[data-js-selected-value], [data-js-option]");

  function hide_options() {
    list_options.addClass('options--hidden');
  }

  el_toggle_select.on('click', function(e) {
    e.stopPropagation();

    var target = $(e.target),
    option = target.attr('data-js-option') ? target.attr('data-js-option') : 0,
    click_on_selected = e.target.hasAttribute('data-js-selected-value'),
    select = target.closest(el_select),
    selected = select.find(selected_value),
    options = select.find(list_options),
    options_was_hidden = options.hasClass('options--hidden');
    
    hide_options();

    if (option) {
      selected.text(option);
    } else if (click_on_selected) {
      if (options_was_hidden) {
        options.removeClass('options--hidden'); 
      }
    }

  });

  /* ========================================= */
  /* =========== INPUT VALIDATION ============ */
  /* ========================================= */

  function is_digit(val) {
    var digits = /^[0-9]+$/;
    return digits.test(val);
  }

  function is_latin_letter(val) {
    var latin_letters = /^[A-Za-z ]*$/;
    return latin_letters.test(val);
  }

  /* ========================================= */
  /* ============== FILL DIGITS ============== */
  /* ========================================= */

  var input_number = $("[data-js-number]");

  input_number.on('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '');

    if (e.target.value.length === 4) {
      $(this).next(input_number).focus();
    }
    
  });

  /* ========================================= */
  /* ============ FILL CARDHOLDER ============ */
  /* ========================================= */

  var cardholder = $("[data-js-cardholder]");

  cardholder.on('input', function (e) {
    e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
  });

  /* ========================================= */
  /* ============= VALIDATE FORM ============= */
  /* ========================================= */

  var form = $("[data-js-form='payment']"),
  input_cardnumber = $("[data-js-number='card']"),
  input_cardholder = $("[data-js-cardholder]"),
  input_cvv = $("[data-js-number='cvv']"),
  selected_month = el_select_month.find(selected_value),
  selected_year = el_select_year.find(selected_value);

  function is_valid_cardnumber() {
    var correct_num = '';

    $.each(input_cardnumber, function(i) {
      var t = $(this),
      val = t.val(),
      length = val.length,
      digit = is_digit(val);

      remove_class_invalid(t);
      
      if (length === 4 && digit) {
        correct_num = correct_num + val;
      } else {
        add_class_invalid(t);
      }

    });

    return correct_num;
  }

  function is_valid_cardholder() {
    var val = input_cardholder.val();

    val = $.trim(val);
    val = val.replace(/\s+/, ' ');

    remove_class_invalid(input_cardholder);

    if (is_latin_letter(val) && val.length >= 4) return val;
    else {
      add_class_invalid(input_cardholder);
      return false;
    }

  }

  function is_valid_cvv() {
    var val = input_cvv.val();

    remove_class_invalid(input_cvv);

    if (is_digit(val) && val.length === 3) return val;
    else {
      add_class_invalid(input_cvv);
      return false;
    }

  }

  function clear_inputs() {
    input_number.val('');
    input_cardholder.val('');
    input_cvv.val('');
    el_select_month.find(selected_value).text("04");
    el_select_year.find(selected_value).text("2019");
  }

  form.on("submit", function(e) {
    e.preventDefault();
    var data = [],
    valid_input_cardnumber = is_valid_cardnumber(),
    valid_input_cardholder = is_valid_cardholder(),
    valid_input_cvv = is_valid_cvv(),
    // не проверяем валидность месяца и года,
    // поскольку они заданы в самой верстке
    // (не являются пользовательским вводом).
    // Если человек знает, как поменять html, он и js-проверку отключит - 
    // поэтому должна быть валидация и на сервере.
    month = +selected_month.text() + '',
    year = selected_year.text();

    if (valid_input_cardnumber && valid_input_cardholder && valid_input_cvv) {
      data = {
        "cardnumber": valid_input_cardnumber,
        "cardholder": valid_input_cardholder,
        "validity_month": month,
        "validity_year": year,
        "cvv": valid_input_cvv
      };
      $.ajax({
        url: '#',
        type: 'POST',
        data: {
          'action': '#',
          'data': data
        },
        success: function() {
          // не стала реализовывать логику модалки,
          // просто alert
          alert("Ваш платеж успешно совершен!");
          clear_inputs();
        }
      });
    }

  });

  /* ========================================= */
  /* ============= MOBILE LOGIC ============== */
  /* ========================================= */

  // несмотря на заголовок, здесь не отслеживается
  // ширина окна для определения мобильности,
  // поскольку сами стили для классов visible и active
  // прописаны в css именно в @media-запросах

  /* ========= TOGGLE MOBILE MENU ============ */


  var el_toggle_menu = $("[data-js-toggle='open-menu']"),
  menu_items = $("[data-js-menu-items]");

  el_toggle_menu.on('click', function(e) {
    e.stopPropagation();
    menu_items.toggleClass('visible');
  });


  /* ======== TOGGLE MOBILE CVV HINT ========= */


  var cvv_hint = $("[data-js-cvv-hint]");

  cvv_hint.on('click', function(e) {
    e.stopPropagation();
    cvv_hint.toggleClass('active');
  });

  body.on('click', function(e) {
    e.stopPropagation();
    menu_items.removeClass('visible');
    hide_options();
    if (cvv_hint.hasClass('active')) cvv_hint.removeClass('active');
  });

});


