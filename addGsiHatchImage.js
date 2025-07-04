/******************************************
地理院地図Vector（https://maps.gsi.go.jp/vector/）由来の
スタイルに含まれるハッチング用の画像を生成する関数。
（参考）
https://github.com/gsi-cyberjapan/gsimaps-vector-experiment/blob/master/js/src/map/hatch-imagemanager.js
******************************************/

/*****************************************
// 赤 点
* "-gsibv-hatch-dot-4-255,0,0,1-"

// 橙 網目
* "-gsibv-hatch-plus-4-255,100,0,1-"

// 黒 箱状
* "-gsibv-hatch-box-4-255,0,0,1-"

******************************************/


var convertGsiHatchImage = function(hatchId){

  if(!hatchId.match("-gsibv-hatch-")) return;
  
  var imgcomp = hatchId.split("-");
  console.log(imgcomp);
  
  var imgtype = imgcomp[3];//type
  var imgsize = parseInt(imgcomp[4]);//size
  var hatchcolor = {
    "r": imgcomp[5].split(",")[0],
    "g": imgcomp[5].split(",")[1],
    "b": imgcomp[5].split(",")[2],
    "a": imgcomp[5].split(",")[3]
  }
  
  var backcolor;
  if(imgcomp[6]){
    backcolor = {
      "r": imgcomp[6].split(",")[0],
      "g": imgcomp[6].split(",")[1],
      "b": imgcomp[6].split(",")[2],
      "a": imgcomp[6].split(",")[3]
    }
  }
  
  var dataarr = new Uint8Array(imgsize * imgsize * 4);
  
  var imgdata = drawGsiHatch(dataarr, imgtype, imgsize, hatchcolor, backcolor );
  
  return{
    "size": imgsize,
    "data": imgdata
  }
}




var drawGsiHatch = function(data, type, size, color, bgColor) {

    
    if (bgColor) {
      for (var i = 0; i < data.length; i += 4) {
        data[i] = bgColor.r;
        data[i + 1] = bgColor.g;
        data[i + 2] = bgColor.b;
        data[i + 3] = bgColor.a * 255;
      }
    }else {
      for (var i = 0; i < data.length; i++) data[i] = 0;
    }
    
    // 左上→右下のライン描画
    switch (type) {
      case "ltrb":
      case "cross":
        for (var y = 0; y < size; y++) {
          var idx = (y * size * 4) + y * 4;
          data[idx] = color.r;
          data[idx + 1] = color.g;
          data[idx + 2] = color.b;
          data[idx + 3] = color.a * 255;
        }
        break;

      case "minus":
        for (var x = 1; x < size; x++) {
          var y = 3;
          var idx = (y * size * 4) + x * 4;
          data[idx] = color.r;
          data[idx + 1] = color.g;
          data[idx + 2] = color.b;
          data[idx + 3] = color.a * 255;
        }
        for (var x = 0; x < size - 1; x++) {
          var y = 9;
          var idx = (y * size * 4) + x * 4;
          data[idx] = color.r;
          data[idx + 1] = color.g;
          data[idx + 2] = color.b;
          data[idx + 3] = color.a * 255;
        }
        break;

      case "dot":
        var x = 1;
        var y = 1; // 変更
        var idx = (y * size * 4) + x * 4;
        data[idx] = color.r;
        data[idx + 1] = color.g;
        data[idx + 2] = color.b;
        data[idx + 3] = color.a * 255;
        break;

      // 追加
      case "box":
        for (var x = 0; x < size; x++) {
          for (var y = 0; y < size; y++) {
            if(x<3 && y<3 && !(x == 1 && y == 1)){
              var idx = (y * size * 4) + x * 4;
              data[idx] = color.r;
              data[idx + 1] = color.g;
              data[idx + 2] = color.b;
              data[idx + 3] = color.a * 255;
            }
          }
        }
        break;
        
      // 追加
      case "plus":
        for (var x = 0; x < size; x++) {
          for (var y = 0; y < size; y++) {
            if(x<1 || y<1){
              var idx = (y * size * 4) + x * 4;
              data[idx] = color.r;
              data[idx + 1] = color.g;
              data[idx + 2] = color.b;
              data[idx + 3] = color.a * 255;
            }
          }
        }
        break;
    }

    // 右下→左上のライン描画
    switch (type) {
      case "rtlb":
      case "cross":
        for (var y = 0; y < size; y++) {
          var idx = (y * size * 4) + (size - y - 1) * 4;
          data[idx] = color.r;
          data[idx + 1] = color.g;
          data[idx + 2] = color.b;
          data[idx + 3] = color.a * 255;
        }
        break;
    }
    
    return data;

}


//fill-pattern,icon-image用のImageがないときに、追加処理を行う。
//（参考）https://docs.mapbox.com/mapbox-gl-js/example/add-image-missing-generated/
map.on('styleimagemissing', function (e) {
  
  var imgid = e.id;
  var hatchImg = convertGsiHatchImage(imgid);
  if(!hatchImg) return;
  
  map.addImage(imgid, { width: hatchImg.size, height: hatchImg.size, data: hatchImg.data });
  
});

