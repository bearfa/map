const { json } = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const MapSchema = mongoose.Schema({
    NeighName: {
        type: String,
        required: true
    },
    NeighID: {
        type: Number,
        required: true
    },
    avg_d_mbps_wt: {
        type: Number,
        required: true
    },
    avg_u_mbps_wt: {
        type: Number,
        required: true
    },
    avg_lat_ms_wt: {
        type: Number,
        required: true
    },
    devices: {
        type: Number,
        required: true
    },
    tests: {
        type: Number,
        required: true,
    },
    geometry: {
        type: Object,
        required: true
    }
});
const Map = mongoose.model('Map', MapSchema);

module.exports = Map;
