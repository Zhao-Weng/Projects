#!/bin/bash


[[ -d static/data ]] && rm -rf static/data/all_*.json
[[ -d static/data ]] && rm -rf static/data/points.json

wget http://128.97.86.189:8002/results/result_20150515_1523_soc-PrattGarden-2014-09-20-Testing-Sport_multiview_multiview-all-vis/all_view-Contour2.json -P static/data/
wget http://128.97.86.189:8002/results/result_20150515_1523_soc-PrattGarden-2014-09-20-Testing-Sport_multiview_multiview-all-vis/all_view-HC2.json -P static/data/
wget http://128.97.86.189:8002/results/result_20150515_1523_soc-PrattGarden-2014-09-20-Testing-Sport_multiview_multiview-all-vis/all_view-HC3.json -P static/data/
wget http://128.97.86.189:8002/results/result_20150515_1523_soc-PrattGarden-2014-09-20-Testing-Sport_multiview_multiview-all-vis/all_view-IP1.json -P static/data/
wget http://128.97.86.189:8002/soc-PrattGarden-2014-09-20-Testing-Sport/points.json -P static/data/

[[ -d static/viz_3d ]] && rm -rf static/viz_3d

wget http://128.97.86.189:8001/static/visualization/js/3d/anim_map.json -P static/viz_3d/
wget http://128.97.86.189:8001/static/viz_3d/anims/ali_wlk.mat.json -P static/viz_3d/anims/
wget http://128.97.86.189:8001/static/viz_3d/anims/ali_sit.mat.json -P static/viz_3d/anims/
wget http://128.97.86.189:8001/static/viz_3d/anims/ske_sitting_ground.mat.json -P static/viz_3d/anims/
wget http://128.97.86.189:8001/static/viz_3d/anims/ali_stand.mat.json -P static/viz_3d/anims/
wget http://128.97.86.189:8001/static/viz_3d/anims/ske_drink1.mat.json -P static/viz_3d/anims/
wget http://128.97.86.189:8001/static/viz_3d/anims/ske_eat.mat.json -P static/viz_3d/anims/
wget http://128.97.86.189:8001/static/viz_3d/anims/ske_point1.mat.json -P static/viz_3d/anims/
wget http://128.97.86.189:8001/static/viz_3d/anims/ske_read.mat.json -P static/viz_3d/anims/
wget http://128.97.86.189:8001/static/viz_3d/anims/ske_sleep.mat.json -P static/viz_3d/anims/
wget http://128.97.86.189:8001/static/viz_3d/anims/ske_throw1.mat.json -P static/viz_3d/anims/
wget http://128.97.86.189:8001/static/viz_3d/anims/ske_type.mat.json -P static/viz_3d/anims/
wget http://128.97.86.189:8001/static/viz_3d/anims/ske_write.mat.json -P static/viz_3d/anims/
wget http://128.97.86.189:8001/static/viz_3d/anims/ali_wlk_bike.mat.json -P static/viz_3d/anims/
