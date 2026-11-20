require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Home",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/ScaleBar",
    "esri/widgets/Expand"
], function (Map, MapView, FeatureLayer, Home, Search, LayerList, Legend, ScaleBar, Expand) {

    const layer = new FeatureLayer({
        url: "https://gisserver.gdi.mk/arcgis/rest/services/KLADILNICI/KLADILNICI_KAZINA_MK/MapServer/1",
        title: "Обложувалници",
        outFields: ["ime", "adresa", "grad", "opstina", "fotografija"],
        popupTemplate: {
            title: "{ime}",
            content: "<b>Адреса:</b> {adresa}<br>" +
                "<b>Град:</b> {grad}<br>" +
                "<b>Општина:</b> {opstina}"
        }
    });

    const map = new Map({ basemap: "topo-vector", layers: [layer] });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [21.7, 41.6],
        zoom: 8
    });

    // Home and Search (from before)
    view.ui.add(new Home({ view: view }), "top-left");
    view.ui.add(new Search({ view: view }), "top-right");

    // Layer List: turn layers on and off (hidden inside a button)
    const layerList = new Expand({
        view: view,
        content: new LayerList({ view: view }),
        expandIconClass: "esri-icon-layers",
        group: "panels"
    });
    view.ui.add(layerList, "top-left");

    // Legend: explains the symbols (hidden inside a button)
    const legend = new Expand({
        view: view,
        content: new Legend({ view: view }),
        expandIconClass: "esri-icon-legend",
        group: "panels"
    });
    view.ui.add(legend, "top-left");

    // Scale bar: shows distance on the map
    view.ui.add(new ScaleBar({ view: view, unit: "metric" }), "bottom-right");
});