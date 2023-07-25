/* ham nay de tai su dung lai Auth */
// var $ = document.querySelector;
function Validator(options) {
  //   tach ham xu ly validate
  const validate = (inputElement, rule) => {
    // lay value
    // goi ham test
    var errorMessage = rule.test(inputElement.value);
    // console.log(errorMessage);
    //   lay the span bao loi di kem item
    var messageElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    // kiem tra neu co loi
    if (errorMessage) {
      inputElement.parentElement.classList.add("invalid");
      messageElement.innerText = errorMessage;
    } else {
      messageElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  };

  /* function: bo thong bao loi */
  const removeNotify = (inputElement) => {
    var messageElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    messageElement.innerText = "";
    inputElement.parentElement.classList.remove("invalid");
  };

  //   lay element cua form can validate
  let formElement = document.querySelector(options.form);

  if (formElement) {
    // lay cac selector dc truyen vao theo options.rules
    options.rules.forEach((rule) => {
      // lay ra cac element
      var inputElement = document.querySelector(rule.selector);

      if (inputElement) {
        // xl blur khoi input
        inputElement.onblur = () => {
          validate(inputElement, rule);
        };
        // xl moi khi user nhap
        inputElement.oninput = () => {
          removeNotify(inputElement);
        };
      }
    });
  }
}

// dinh nghia Rules
/* Nguyen tac Rules:
    1. khi co loi => tra ra message loi
    2. Khi hop le => ko tra gi ca (undefined)
*/
Validator.isRequired = function (selector) {
  return {
    selector,
    test(value) {
      return value.trim() ? undefined : "Vui long nhap truong nay";
    },
  };
};

Validator.isEmail = function (selector) {
  return {
    selector,
    test(value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Vui long nhap email";
    },
  };
};
Validator.minLength = function (selector, min) {
  return {
    selector,
    test(value) {
      return value.trim().length >= min
        ? undefined
        : `Vui long nhap toi thieu ${min} ky tu`;
    },
  };
};
