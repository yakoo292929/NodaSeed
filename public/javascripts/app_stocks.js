$(function() {

  let table = document.getElementById('productSearchTable');

  /*******************************************************************
  // 在庫数量でカーソルがンターキーを押した場合
  *******************************************************************/
  $('#inventoryquantity').blur(function() {
    const inventoryunitprice = document.getElementById('inventoryunitprice');
    const inventoryquantity = document.getElementById('inventoryquantity');
    const stockprice = document.getElementById('stockprice');
    let culculate = 0;
    culculate = inventoryunitprice.value * inventoryquantity.value;
    stockprice.value = culculate;

  });


  /*******************************************************************
  // 商品検索モーダル：モーダルが開いた後
  *******************************************************************/
  $('#productSearchModal').on('show.bs.modal', function () {

    // #td01要素(商品名)クリック時のイベント
    $('table #td01').on('click', async function() {
      $('#productname').val($(this).text());
      $('#largeclassname').val($(this).next().text());
      $('#middleclassname').val($(this).next().next().text());
      $('#inventoryunitprice').val($(this).next().next().next().text());
      $('#productSearchModal').modal('hide');
    });

    // #td02要素1(大分類名)クリック時のイベント
    $('table #td02').on('click', async function() {
      $('#productname').val($(this).prev().text());
      $('#largeclassname').val($(this).text());
      $('#middleclassname').val($(this).next().text());
      $('#inventoryunitprice').val($(this).next().next().text());
      $('#productSearchModal').modal('hide');
    });

    // #td03要素(中分類)クリック時のイベント
    $('table #td03').on('click', async function() {
      $('#productname').val($(this).prev().prev().text());
      $('#largeclassname').val($(this).prev().text());
      $('#middleclassname').val($(this).text());
      $('#inventoryunitprice').val($(this).next().text());
      $('#productSearchModal').modal('hide');
    });

    // #td04要素(在庫単価)クリック時のイベント
    $('table #td04').on('click', async function() {
      $('#productname').val($(this).prev().prev().prev().text());
      $('#largeclassname').val($(this).prev().prev().text());
      $('#middleclassname').val($(this).prev().text());
      $('#inventoryunitprice').val($(this).text());
      $('#productSearchModal').modal('hide');
    });

  });

  /*******************************************************************
  // 商品検索モーダル：商品名でエンターキーを押した場合
  *******************************************************************/
  $('#modalProductname').on('keypress', function(event) {
    if (event.key === "Enter") {
        const input = document.getElementById('modalProductname');
        if (input.value) {
            // テーブル絞込
            filterTable();
        } else {
            // テーブル戻し
            undoTable();
        }
    }
  });

  /*******************************************************************
  // テーブル戻し関数
  *******************************************************************/
  function undoTable() {

    const rows = table.getElementsByTagName('tr');

    // 各行に対してループを実行し、すべて表示する
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        rows[i].style.display = "";
    }
  }

  /*******************************************************************
  // テーブル絞込関数
  *******************************************************************/
  function filterTable() {

    // テーブルと検索ボックスを取得
    const input = document.getElementById('modalProductname');
    const rows = table.getElementsByTagName('tr');

    // 検索ボックスに入力された文字列を取得
    const filter = input.value.toUpperCase();

    // 各行に対してループを実行し、検索文字列と一致するものだけを表示する
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let showRow = false;

        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell) {
                var text = cell.textContent || cell.innerText;
                if (text.toUpperCase().indexOf(filter) > -1) {
                    showRow = true;
                }
            }
        }

        if (showRow) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
    }
  }

});
