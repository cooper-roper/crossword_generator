import numpy as np
import os
from scipy import spatial


def get_embeddings_dict():
    embeddings_dict = {}
    path = './backend/data/glove6B/glove.6B.300d.txt'
    with open(path, 'r', encoding="utf-8") as f:
        for line in f:
            values = line.split()
            word = values[0]
            vector = np.asarray(values[1:], "float32")
            embeddings_dict[word] = vector
    return embeddings_dict

def find_closest_embeddings(embeddings_dict, embedding):
    return sorted(embeddings_dict.keys(), key=lambda word: spatial.distance.euclidean(embeddings_dict[word], embedding))

def create_word_list(topic):
    embeddings_dict = get_embeddings_dict()
    closest = find_closest_embeddings(embeddings_dict, embeddings_dict[topic])
    return closest
    