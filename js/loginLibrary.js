function Validator(formSelector, options = {}) {
  //   if (!options) options = {}; //es5 gia tri default cho options
  // func get parent
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      } else {
        element = element.parentElement;
      }
    }
  }
  // tat ca cac rules trong form
  let formRules = {};

  //   dinh nghia cac function trung name cac rules
  /* qui uoc tao rules:
    1, co loi thi return 'msg error'
    2, ko co loi tra ve undefined
*/
  let validatorRules = {
    required: function (value) {
      return value ? undefined : "Vui long nhap truong nay";
    },
    email: function (value) {
      let regex =
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return regex.test(value) ? undefined : "Vui long nhap email";
    },
    // min sd function long nhau
    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `Vui long nhap toi thieu ${min} ky tu`;
      };
    },
    max: function (max) {
      return function (value) {
        return value.length <= max
          ? undefined
          : `Vui long nhap toi da ${max} ky tu`;
      };
    },
  };

  let formElement = document.querySelector(formSelector);

  if (formElement) {
    // lay all input co attribute: name & rule
    let inputs = formElement.querySelectorAll("[name][rules]");

    for (let input of inputs) {
      var rules = input.getAttribute("rules").split("|");
      for (let rule of rules) {
        let isRuleHasValue = rule.includes(":");
        let ruleInfo;
        // kiem tra cho min/max
        if (isRuleHasValue) {
          ruleInfo = rule.split(":");
          rule = ruleInfo[0];

          //   console.log(validatorRules[rule](ruleInfo[1]));
        }

        let ruleFunc = validatorRules[rule];
        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
        // formRules[input.name] = input.getAttribute("rules");
      }

      //   Lang nghe su kien de validate (blur, onchange, oninput)
      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }

    // ham thuc hien validate
    function handleValidate(e) {
      //   console.log(formRules[e.target.name]);
      let rules = formRules[e.target.name];
      let errorMessage;

      //   thay find() = some() hoac for() ket hop break;
      rules.find((rule) => {
        errorMessage = rule(e.target.value);
        return errorMessage;
      });

      //   neu co loi thi hien thi message bao loi ra UI
      if (errorMessage) {
        // console.log(e.target);
        let formGroup = getParent(e.target, ".form-group");
        if (formGroup) {
          formGroup.classList.add("invalid");
          let formMessage = formGroup.querySelector(".form-message");
          if (formMessage) {
            formMessage.innerText = errorMessage;
          }
        }
      }
      //   console.log(errorMessage);
      return !errorMessage; //ko co loi tra ve la true
    }

    // Func xoa bao loi
    function handleClearError(e) {
      let formGroup = getParent(e.target, ".form-group");
      if (formGroup.classList.contains("invalid")) {
        formGroup.classList.remove("invalid");
        let formMessage = formGroup.querySelector(".form-message");
        if (formMessage) {
          formMessage.innerText = "";
        }
      }
    }
    // console.log(formRules);

    //   xu ly su kien submit form
    formElement.onsubmit = (e) => {
      e.preventDefault();

      let isValid = true;
      //   dung chinh input lam doi so dau vao
      for (let input of inputs) {
        if (
          !handleValidate({
            target: input,
          })
        ) {
          isValid = false;
        }
        // console.log(input.name);
      }
      console.log(isValid);
      //   khi ko co loi thi submit form
      if (isValid) {
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

          //   tra ve kem data cho submit
          return options.onSubmit(formValues);
        }
        formElement.submit();
      }
    };
  }
}
