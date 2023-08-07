import clues

def test_clues():
    words = ["cat", "dog", "bird"]
    topic = "animals"
    word_clues = clues.make_clues(words, topic)
    print(word_clues)
    
def main():
    test_clues()

if __name__ == "__main__":
    main()