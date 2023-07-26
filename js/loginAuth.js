/* ham nay de tai su dung lai Auth */
// var $ = document.querySelector;
function Validator(options) {
  var selectorRules = {};
  //   tach ham xu ly validate
  const validate = (inputElement, rule) => {
    // goi ham test
    // var errorMessage = rule.test(inputElement.value);
    var errorMessage = "";

    let rules = selectorRules[rule.selector];

    for (let i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }

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

    return !!errorMessage;
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
    formElement.onsubmit = (e) => {
      e.preventDefault();
      let isFormValid = true;

      // lap qua tung rule va validate luon
      options.rules.forEach((rule) => {
        let inputElement = document.querySelector(rule.selector);
        let isInValid = validate(inputElement, rule);
        if (isInValid) {
          isFormValid = false;
        }
      });

      let enableInputs = formElement.querySelectorAll("[name]:not([disabled])");

      if (isFormValid) {
        let formValues = Array.from(enableInputs).reduce((values, input) => {
          return (values[input.name] = input.value) && values;
        }, {});

        if (typeof options.onSubmit === "function") {
          // submit voi JS
          options.onSubmit(formValues);
        } else {
          //khi nay dev van sd method submit cua form
          formElement.submit();
        }
      }
    };
    // lay cac selector dc truyen vao theo options.rules
    options.rules.forEach((rule) => {
      // luu selectorRule cho moi element;
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }
      // selectorRules[rule.selector] = rule.test;

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
Validator.isRequired = function (selector, errorMessage) {
  return {
    selector,
    test(value) {
      return value.trim()
        ? undefined
        : errorMessage || "Vui long nhap truong nay";
    },
  };
};

Validator.isEmail = function (selector, errorMessage) {
  return {
    selector,
    test(value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : errorMessage || "Vui long nhap email";
    },
  };
};
Validator.minLength = function (selector, min, errorMessage) {
  return {
    selector,
    test(value) {
      return value.trim().length >= min
        ? undefined
        : errorMessage || `Vui long nhap toi thieu ${min} ky tu`;
    },
  };
};

// check repassword
Validator.isConfirmed = (selector, getConfirmValue, errorMessage) => {
  return {
    selector,
    test(value) {
      return value.trim() === getConfirmValue()
        ? undefined
        : errorMessage || "Gia tri nhap vao chua dung";
    },
  };
};
