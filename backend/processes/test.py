import clues
import vectorize
import backtrace
import Trie
import json

def test_clues():
    words = ["cat", "dog", "bird"]
    topic = "animals"
    word_clues = clues.make_clues(words, topic)
    print(word_clues)
    
def test_vectorize():
    topic = "dogs"
    words = vectorize.create_word_list(topic)
    return words[1:]

def test_backtrace(words):
    with open('backend/data/test/grid.json') as json_file:
        grid = json.load(json_file)
        words = [word for word in words if len(word) <= len(grid[0])]
        print("solving")
        backtrace.generate_crossword(grid, words[:500])
        backtrace.print_crossword(grid)

def test_trie(words):
    print("testing trie")
    trie = Trie.Trie()
    for word in words:
        if len(word) <= 5:
            trie.insert(word)
    print(trie.get_words("cat"))
    

def main():
    # test_clues()
    words = test_vectorize()
    test_backtrace(words)
    # test_trie(words)
    
    

if __name__ == "__main__":
    main()