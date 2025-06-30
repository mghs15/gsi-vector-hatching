# gsi-vector-hatching
地理院地図Vectorのハッチングを表示する方法

サンプル　https://mghs15.github.io/gsi-vector-hatching/

* [地理院地図Vector（仮称）](https://maps.gsi.go.jp/vector/)のスタイルを再現する場合、ハッチング表現（`fill-pattern`）用の画像を利用する必要があるが、これらの画像はSpriteに含まれていないので、別途追加する必要がある。
* Mapbox Gl JSでは、`fill-pattern`に指定されたIamgeのidが見つからないときに発火する`styleimagemissing`イベントを利用して、その都度必要なImageを追加する方法をとればよい。 
* 地理院地図Vectorのハッチ用`fill-pattern`に指定されているid名には、パターンや色の情報が含まれているため、ここから必要な画像を復元することができる。

## 利用方法
Mapbox GL JS/MapLibre GL JS の map オブジェクトを `map` として作成した後、
このレポジトリの`addGsiHatchImage.js`を取り込む。

```
<script>
var map = new mapboxgl.Map({
  container: 'map', // container id
  hash: true, //add #position on URL
  style: './style.json', // stylesheet location
  center: [139.78148, 35.768793], // starting position [lng, lat]
  zoom: 15, // starting zoom
  maxZoom: 18,
  localIdeographFontFamily: "MS Gothic"
});
</script>
<script src='./addGsiHatchImage.js'></script>
```

## 参考文献
* [地理院地図Vector（仮称）のソースコード](https://github.com/gsi-cyberjapan/gsimaps-vector-experiment)
* [Mapbox GL JS ドキュメント](https://docs.mapbox.com/mapbox-gl-js/style-spec/)
