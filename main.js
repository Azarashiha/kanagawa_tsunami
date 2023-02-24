//https://docs.mapbox.com/mapbox-gl-js/example/add-image/
mapboxgl.accessToken = 'pk.eyJ1IjoiYXphcmFzaGkiLCJhIjoiY2t0YmdibXczMXZwbzJubzBnZHI4Ym4zMCJ9.1C3RNiQqSioL1NkDSFE5Xg';
    
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/azarashi/cleiljshs001f01nv27qq5mn4',
    center: [139.6670516, 35.3811673],//仮数値
    zoom: 11,//仮数値
    pitch: 70,
    //bounds:addpoint(),
    customAttribution: ['<a href="https://www.jma.go.jp/jma/index.html">震度情報:©︎気象庁</a>', '<a href="https://nlftp.mlit.go.jp/index.html">国土数値情報:©︎国土交通省</a>','<a href="https://twitter.com/nyaonearthquake?s=21">編集:©︎nyaonearthquake</a>']
});

// コントロール関係表示
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 3.5 });

    // add a sky layer that will show when the map is highly pitched
    map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
        }
    });

    map.addSource('tunami', {
        type: 'geojson',
        data: 'tunami.geojson' // 外部ファイルのパスを指定
    });
    map.addLayer({
        'id': 'tunami',
        'type': 'fill',
        'source': 'tunami',
        'paint': {
            'fill-color':[
                'case',
                ['==',['get','A40_003'],'0.01m以上 ～ 0.3m未満'],'#ffffff',
                ['==',['get','A40_003'],'0.3m以上 ～ 1m未満'],'#ffb0b0',
                ['==',['get','A40_003'],'1m以上 ～ 2m未満'],'#ff5757',
                ['==',['get','A40_003'],'2m以上 ～ 3m未満'],'#ff0000',
                ['==',['get','A40_003'],'3m以上 ～ 4m未満'],'#8c0000',
                ['==',['get','A40_003'],'4m以上 ～ 5m未満'],'#470000',
                ['==',['get','A40_003'],'5m以上 ～ 10m未満'],'#120000',
                'WHITE' // 上記以外の場合は青色
        ]
    }
    });
    
});