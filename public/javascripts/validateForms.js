////////////////////////////////////////////////
// BootStrap 5.0 バリデーションフォーム
////////////////////////////////////////////////

(function () {
  'use strict'

  // form要素取得
  const forms = document.querySelectorAll('.validated-form')

  // Loop over them and prevent submission
  Array.from(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})()
