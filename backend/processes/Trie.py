class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word
    
    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
    
    def delete(self, word):
        def delete_helper(node, word, index):
            if index == len(word):
                if not node.is_end_of_word:
                    return False
                node.is_end_of_word = False
                return len(node.children) == 0
            char = word[index]
            if char not in node.children:
                return False
            should_delete = delete_helper(node.children[char], word, index + 1)
            if should_delete:
                del node.children[char]
                return len(node.children) == 0
            return False
        delete_helper(self.root, word, 0)
    
    def get_words(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return []
            node = node.children[char]
        return self.get_words_helper(node, prefix)

    def get_words_helper(self, node, prefix):
        words = []
        if node.is_end_of_word:
            words.append(prefix)
        for char in node.children:
            words.extend(self.get_words_helper(node.children[char], prefix + char))
        return words
        
    
    def print(self, node=None, word=""):
        if node is None:
            node = self.root
        for char in node.children:
            if node.children[char].is_end_of_word:
                print(word + char)
            self.print(node.children[char], word + char)
