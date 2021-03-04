from datetime import datetime

import geopandas as gp
import matplotlib
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

from shapely.geometry import Point
from adjustText import adjust_text


# tiles = gp.read_file('https://ookla-open-data.s3-us-west-2.amazonaws.com/shapefiles/performance/type%3Dfixed/year%3D2020/quarter%3D4/2020-10-01_performance_fixed_tiles.zip')
# tiles.to_file("tiles.geojson", driver="GeoJSON")

# orlandomap = gp.read_file('https://gis.orlando.gov/PDF_Docs/Data4Web/ZipFiles/OrlandoNeighborhoods.zip')
# orlandomap = orlandomap.to_crs(4326)
# orlandomap.to_file("tiles.geojson", driver="GeoJSON")

tile_orlando = gp.read_file("tile_orlando.geo.json")
orlando_map = gp.read_file("orlando.geo.json")
# print(tile_orlando.head())
county_stats = (
    tile_orlando.groupby(['NeighID','NeighName'])
    .apply(
        lambda x: pd.Series(
            {"avg_d_mbps_wt": np.average(x["avg_d_kbps"], weights=x["tests"])}
        )
    )
    .reset_index()
    .merge(
        tile_orlando.groupby(['NeighID','NeighName'])
        .apply(
            lambda x: pd.Series(
                {"avg_u_mbps_wt": np.average(x["avg_u_kbps"], weights=x["tests"])}
            )
        )
        .reset_index()
    )
    .merge(
        tile_orlando.groupby(['NeighID','NeighName'])
        .apply(
            lambda x: pd.Series(
                {"avg_lat_ms_wt": np.average(x["avg_lat_ms"], weights=x["tests"])}
            )
        )
        .reset_index()
    )
    .merge(
        tile_orlando.groupby(['NeighID','NeighName'])
        .agg(tests=("tests", "sum"))
        .reset_index(),
        on=['NeighID','NeighName'],
    )
    .merge(
        tile_orlando.groupby(['NeighID','NeighName'])
        .agg(devices=("devices", "sum"))
        .reset_index(),
        on=['NeighID','NeighName'],
    )
)

county_data = orlando_map[['NeighID','NeighName','geometry']].merge(county_stats, on=['NeighID','NeighName']).sort_values(by='NeighID').to_crs(4326)

county_data.to_file("o.geo.json", driver="GeoJSON")