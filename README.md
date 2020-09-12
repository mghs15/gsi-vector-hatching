# gsi-vector-hatching
地理院地図Vectorのハッチングを表示する方法

* [地理院地図Vector提供実験](https://maps.gsi.go.jp/vector/)では、ハッチング表現（`fill-pattern`）用の画像を利用する必要があるが、これらの画像はSpriteに含まれていないので、別途追加する必要がある。
* Mapbox Gl JSでは、fill-patternに指定されたIamgeのidが見つからないときに発火する`styleimagemissing`イベントを利用して、その都度必要なImageを追加する方法をとればよい。 
* 地理院地図Vectorのハッチ用fill-patternに指定されているid名には、パターンや色の情報が含まれているため、ここから必要な画像を復元することができる。

## 利用方法
このレポジトリの`addGsiHatchImage.js`を取り込んだうえで、以下のようなコードを記述する。

```
map.on('styleimagemissing', function (e) {
  
  var imgid = e.id;
  var hatchImg = convertGsiHatchImage(imgid);
  if(!hatchImg) return;
  
  map.addImage(imgid, { width: hatchImg.size, height: hatchImg.size, data: hatchImg.data });
  
});
```

## 参考文献
* [地理院地図Vectorのソースコード](https://github.com/gsi-cyberjapan/gsimaps-vector-experiment)
* [Mapbox Gl JS ドキュメント](https://docs.mapbox.com/mapbox-gl-js/style-spec/)
