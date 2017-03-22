cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "cordova-plugin-music-controls.MusicControls",
        "file": "plugins/cordova-plugin-music-controls/www/MusicControls.js",
        "pluginId": "cordova-plugin-music-controls",
        "clobbers": [
            "MusicControls"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-plugin-statusbar": "2.2.0",
    "cordova-plugin-music-controls": "1.4"
};
// BOTTOM OF METADATA
});