#!/bin/bash

cd ../tools

python train_net.py \
    --dataset_name          ko_high_sch-data \
    --json_annotation_train ../configs/prima/train.json \
    --image_path_train      ../configs/prima/images \
    --json_annotation_val   ../configs/prima/test.json \
    --image_path_val        ../configs/prima/images \
    --config-file           ../configs/prima/fast_rcnn_R_50_FPN_3x.yaml \
    OUTPUT_DIR  ../outputs/ko_high_sch/fast_rcnn_R_50_FPN_3x/ \
    SOLVER.IMS_PER_BATCH 8