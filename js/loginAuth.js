/* ham nay de tai su dung lai Auth */
// var $ = document.querySelector;
function Validator(options) {
  // get phan tu cha chua span t.bao loi
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
  var selectorRules = {};
  //   tach ham xu ly validate
  const validate = (inputElement, rule) => {
    // goi ham test
    // var errorMessage = rule.test(inputElement.value);
    var errorMessage = "";

    let rules = selectorRules[rule.selector];

    for (let i = 0; i < rules.length; i++) {
      switch (inputElement.type) {
        case "checkbox":
        case "radio":
          errorMessage = rules[i](
            formElement.querySelector(rule.selector + ":checked")
          );
          break;

        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }

    // console.log(errorMessage);
    //   lay the span bao loi di kem item
    // thay the: var messageElement = getParent(inputElement,'.form-group')
    var messageElement = getParent(
      inputElement,
      options.formGroupSelector
    ).querySelector(options.errorSelector);
    // kiem tra neu co loi
    if (errorMessage) {
      getParent(inputElement, options.formGroupSelector).classList.add(
        "invalid"
      );
      messageElement.innerText = errorMessage;
    } else {
      messageElement.innerText = "";
      getParent(inputElement, options.formGroupSelector).classList.remove(
        "invalid"
      );
    }

    return !!errorMessage;
  };

  /* function: bo thong bao loi */
  const removeNotify = (inputElement) => {
    var messageElement = getParent(
      inputElement,
      options.formGroupSelector
    ).querySelector(options.errorSelector);
    messageElement.innerText = "";
    getParent(inputElement, options.formGroupSelector).classList.remove(
      "invalid"
    );
  };

  //   lay element cua form can validate
  let formElement = document.querySelector(options.form);

  if (formElement) {
    formElement.onsubmit = (e) => {
      e.preventDefault();
      let isFormValid = true;

      // lap qua tung rule va validate luon khi submit form
      options.rules.forEach((rule) => {
        let isInValid;
        let inputElements = document.querySelectorAll(rule.selector);
        Array.from(inputElements).forEach((inputElement) => {
          isInValid = validate(inputElement, rule);
          if (isInValid) {
            isFormValid = false;
          }
        });
      });

      if (isFormValid) {
        if (typeof options.onSubmit === "function") {
          let enableInputs = formElement.querySelectorAll(
            "[name]:not([disabled])"
          );
          let formValues = Array.from(enableInputs).reduce((values, input) => {
            switch (input.type) {
              case "radio":
                if (input.matches(":checked")) {
                  values[input.name] = input.value;
                }
                break;
              case "checkbox":
                if (
                  Array.isArray(values[input.name]) &&
                  input.matches(":checked")
                ) {
                  values[input.name].push(input.value);
                } else if (input.matches(":checked")) {
                  values[input.name] = [input.value];
                }
                break;
              case "file":
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }
            return values;
          }, {});
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

      // lay ra cac element -> tra ve  la nodelist
      var inputElements = document.querySelectorAll(rule.selector);
      Array.from(inputElements).forEach((inputElement) => {
        if (inputElement) {
          // xl blur khoi input
          inputElement.onblur = () => {
            validate(inputElement, rule);
          };
          inputElement.onchange = () => {
            validate(inputElement, rule);
          };
          // xl moi khi user nhap
          inputElement.oninput = () => {
            removeNotify(inputElement);
          };
        }
      });
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
      let valueReturn = typeof value === "string" ? value.trim() : value;
      return valueReturn
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
