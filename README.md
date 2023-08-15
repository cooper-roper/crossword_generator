# Crossword Generator

## WORK IN PROGRESS
## Description

This is a crossword generator that uses a backtracking algorithm to generate a crossword puzzle from a list of words. The words are generated from word vectors using a word2vec model. The word2vec model is trained on a corpus of 100,000+ words from the [Brown Corpus](https://en.wikipedia.org/wiki/Brown_Corpus). The word2vec model is trained using the [gensim](https://radimrehurek.com/gensim/) library.

## TODO:
Backend:
- [x] Find/Generate word list
- [x] Set up database to store word list
- [x] Generate word list from a topic using word2vec
- [x] Generate crossword puzzle from list of words using backtracking algorithm
- [x] Generate crossword puzzle clues from list of words

