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


  var a = $("#para_a").val();
  var b = $("#para_b").val();
  var n = $("#para_n").val();
  var delta = (b - a) / n;

  var x = Number(a);
  var str_buff = "";
  var ans = 0;
  var ans_sum = 0;
  
  for ( var i = 1; i <= n; i++ ) {
    x = i*delta;
    ans = Math.sqrt(x)*delta;
    str_buff += round(ans, 2).toString();
    if (i != n) {
      str_buff += " + ";
    }
    ans_sum += ans;
  } 
  $("#ans_sum").html("\\( \\simeq " + str_buff + "\\) \n" + "\\( = " + round(ans_sum, 2).toString() + "\\)");


  // 計算ボタン押下時
  $(".cal-form").submit(function() {
    var a = $("#para_a").val();
    var b = $("#para_b").val();
    var n = $("#para_n").val();
    var delta = (b - a) / n;
  
    var x = Number(a);
    var str_buff = "";
    var ans = 0;
    var ans_sum = 0;
    
    for ( var i = 1; i <= n; i++ ) {
      x = i*delta;
      ans = Math.sqrt(x)*delta;
      str_buff += round(ans, 2).toString();
      if (i != n) {
        str_buff += " + ";
      }
      ans_sum += ans;
    } 
    $("#ans_sum").html("\\( \\simeq " + str_buff + "\\) \n" + "\\( = " + round(ans_sum, 2).toString() + "\\)");
    
     // 計算してグラフを書く関数を呼ぶ
    return false;
  });

});