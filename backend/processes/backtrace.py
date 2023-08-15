import Trie

def generate_crossword(grid, words):
    rows = len(grid)
    cols = len(grid[0])
    trie = Trie.Trie()
    
    for word in words:
        print(word)
        trie.insert(word)
    
    # trie.print()
    
    def is_valid_placement(row, col, direction, word):
        if direction == "horizontal":
            for i, char in enumerate(word):
                if (
                    col + i >= cols
                    or grid[row][col + i]["letter"] not in ["", char]
                ):
                    return False
            return True
        elif direction == "vertical":
            for i, char in enumerate(word):
                if (
                    row + i >= rows
                    or grid[row + i][col]["letter"] not in ["", char]
                ):
                    return False
            return True
    
    def place_word(row, col, direction, word):
        if direction == "horizontal":
            for i, char in enumerate(word):
                grid[row][col + i]["letter"] = char
        elif direction == "vertical":
            for i, char in enumerate(word):
                grid[row + i][col]["letter"] = char
        trie.delete(word)
    
    def remove_word(row, col, direction, word):
        if direction == "horizontal":
            for i in range(len(word)):
                grid[row][col + i]["letter"] = ""
        elif direction == "vertical":
            for i in range(len(word)):
                grid[row + i][col]["letter"] = ""
        trie.insert(word)
    
    def solve(row, col):
        if row >= rows:
            return True
        
        next_row = row + 1 if col == cols - 1 else row
        next_col = col + 1 if col < cols - 1 else 0
        
        cell = grid[row][col]
        if cell["toggled"]:
            return solve(next_row, next_col)
        
        for direction in ["horizontal", "vertical"]:
            for word in words:
                if is_valid_placement(row, col, direction, word):
                    place_word(row, col, direction, word)
                    if solve(next_row, next_col):
                        return True
                    remove_word(row, col, direction, word)
        
        return False

    solve(0, 0)


def print_crossword(grid):
    for row in grid:
        print(" ".join(cell["letter"] for cell in row))