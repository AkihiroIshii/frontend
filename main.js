$(function() {

  // 小数点以下precision位で四捨五入
  function round(number, precision) {
    var shift = function (number, precision, reverseShift) {
      if (reverseShift) {
        precision = -precision;
      }
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true);
  }

  // 計算ボタン押下時
  $(".cal-form").submit(function() {
    // 入力パラメータの取得
    var a = Number($("#para_a").val());
    var b = Number($("#para_b").val());
    var n = Number($("#para_n").val());
    var delta = (b - a) / n;

    // n が大きい場合は警告メッセージを表示して処理終了
    if ( n > 50 ) {
      alert("nの値が大きいと処理に時間がかかります。nは50以下の値を設定してください");
      exit;
    }

    // ローカル変数の定義
    var str_buff = "";  // 画面に出力する途中式（展開式）
    var x = 0.0;
    var x1 = 0.0;
    var x2 = 0.0;
    var y = 0.0;
    var y_sum = 0.0;
    var kai1 = [];
    var kai2 = [];
    var area = 0.0;
    var area_sum1 = 0.0;
    var area_sum2 = 0.0;

    // 厳密解（に近い近似解）の計算→できれば厳密解をプロットしたい
    for ( var i = 1; i <= 100*n; i++) {
      x = a + i*(delta/100);
      y = Math.sqrt(x);
      area = y*(delta/100);
      area_sum1 += area;
      kai1.push({x,y});
    }
    // 厳密解をhtmlに表示
    $("#genmitsu-kai").html("\\( \\int_{" + a + "}^{" + b + "} \\sqrt{x} dx \\simeq " + round(area_sum1, 2) + "\\)")

    // 級数和
    for ( var i = 1; i <= n; i++ ) {
      x1 = a + (i-1)*delta;
      x2 = a + i*delta;
      y = Math.sqrt(x2)
      area = y*delta;
      area_sum2 += area;
      x = x1;
      kai2.push({x,y});
      x = x2;
      kai2.push({x,y});
      str_buff += round(area, 2).toString();
      if (i != n) {
        str_buff += " + ";
      }
    }
    $("#ans_sum").html("\\( \\simeq " + str_buff + "\\) \n" + "\\( = " + round(area_sum2, 2).toString() + "\\)");

    // 計算してグラフを書く関数を呼ぶ
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
        {
          type: 'scatter',
          label: '厳密解',
          data: kai1,
          cubicInterpolationMode: 'monotone',
          borderColor: "red",
          pointRadius: 0.1, // 点の半径
        },
        {
          type: 'scatter',
          label: '近似解',
          data: kai2,
          pointRadius: 0, // 点の半径
          //cubicInterpolationMode: 'monotone',
          backgroundColor: "rgba(153,255,51,1)",
        },

        ]
      },
      options: {
        elements: {
          line:     {
            // ベジェ曲線を無効化し、直線で接続する
            tension: 0,
          }
        }
      }
    });

    return false;
  });

});
