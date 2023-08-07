import clues
import vectorize

def test_clues():
    words = ["cat", "dog", "bird"]
    topic = "animals"
    word_clues = clues.make_clues(words, topic)
    print(word_clues)
    
def test_vectorize():
    topic = "cows"
    print(vectorize.create_word_list(topic)[1:10])

def main():
    # test_clues()
    test_vectorize()

if __name__ == "__main__":
    main()