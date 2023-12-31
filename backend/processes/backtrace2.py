import vectorize
import copy

# word class
class Word:
    def __init__(self, direction, row, col, length):
        self.row = row
        self.col = col
        self.length = length
        self.direction = direction

# find all required words in puzzle and create word objects
def get_required_words(puzzle):
    words = []
    for row in puzzle:
        for cell in row:
            if cell['number'] != -1:
                # check across
                if cell['direction'] == 'across' or cell['direction'] == 'both':
                    # find length of word
                    length = 0
                    for i in range(cell['pos']['col'], len(row)):
                        if row[i]['letter'] != '#':
                            length += 1
                        else:
                            break
                    # create word object
                    words.append(Word('across', cell['pos']['row'], cell['pos']['col'], length))
                # check down
                if cell['direction'] == 'down' or cell['direction'] == 'both':
                    # find length of word
                    length = 0
                    for i in range(cell['pos']['row'], len(puzzle)):
                        if puzzle[i][cell['pos']['col']]['letter'] != '#':
                            length += 1
                        else:
                            break
                    # create word object
                    words.append(Word('down', cell['pos']['row'], cell['pos']['col'], length))
    return words

# check validity of letter in cell
def check_letter(cell, letter):
    if cell['letter'] == ' ': # empty cell
        return True
    if cell['letter'] == letter: # letter matches
        return True
    return False # letter does not match

# fill the puzzle with words from the word list
def fill_puzzle(puzzle, word_list, words_required, index, words_used=[]):
    # base case
    if index == len(words_required):
        return puzzle
    
    # Get the current word to be placed
    current_word = words_required[index]
    
    # Try placing the current word in all possible positions
    for word in word_list:
        # if word contains a space, skip it
        if ' ' in word:
            continue
        # if word is not correct length, skip it
        if len(word) != current_word.length:
            continue
        # Check if the word has already been used in the puzzle
        if word not in words_used:
            # Check across placement
            if current_word.direction == 'across':
                # Check if the word fits
                if current_word.col + len(word) <= len(puzzle[0]):
                    valid_placement = all(check_letter(puzzle[current_word.row][current_word.col + i], word[i]) for i in range(len(word)))
                    if valid_placement:
                        # make a copy of the puzzle
                        puzzle_copy = copy.deepcopy(puzzle)

                        # Place the word
                        for i in range(len(word)):
                            puzzle[current_word.row][current_word.col + i]['letter'] = word[i]
                        words_used.append(word)
                        
                        # Recurse to place the next word
                        result = fill_puzzle(puzzle, word_list, words_required, index + 1, words_used)
                        if result is not None:
                            return result
                        
                        # If the next words couldn't be placed, backtrack
                        for i in range(len(word)):
                            # reset puzzle
                            puzzle = puzzle_copy
                        words_used.remove(word)
            
            # Check down placement
            elif current_word.direction == 'down':
                # Check if the word fits
                if current_word.row + len(word) <= len(puzzle):
                    valid_placement = all(check_letter(puzzle[current_word.row + i][current_word.col], word[i]) for i in range(len(word)))
                    if valid_placement:
                        # make a copy of the current state of the puzzle
                        puzzle_copy = copy.deepcopy(puzzle)

                        # Place the word
                        for i in range(len(word)):
                            puzzle[current_word.row + i][current_word.col]['letter'] = word[i]
                        words_used.append(word)
                        
                        # Recurse to place the next word
                        result = fill_puzzle(puzzle, word_list, words_required, index + 1, words_used)
                        if result is not None:
                            return result
                        
                        # If the next words couldn't be placed, backtrack 
                        for i in range(len(word)):
                            # reset puzzle
                            puzzle = puzzle_copy
                        words_used.remove(word)
    
    # No valid placement for the current word, return None to backtrack
    return None

                
# main function to call to build the puzzle
def build(puzzle, word_list):
    # find all required words in puzzle and create word objects
    words = get_required_words(puzzle)

    # print out required words
    print('Required words:')
    for word in words:
        print(f'start: (r:{word.row}, c:{word.col}), dir: {word.direction}, len: {word.length}')
    print()

    # call recursive function
    final_puzzle = fill_puzzle(puzzle, word_list, words, 0, [])
    # return puzzle
    return final_puzzle


def main():
    # create puzzle for testing
    #puzzle = [[0 for x in range(3)] for y in range(3)]
    puzzle = [[0 for x in range(4)] for y in range(4)]
    puzzle[0][0] = {'pos': {'row': 0, 'col': 0}, 
                    'letter': ' ', 
                    'toggled' : False,
                    'number': 1,
                    'direction': 'both'}
    puzzle[0][1] = {'pos': {'row': 0, 'col': 1},
                    'letter': ' ',
                    'toggled' : False,
                    'number': -1,
                    'direction': None}
    puzzle[0][2] = {'pos': {'row': 0, 'col': 2},
                    'letter': ' ',
                    'toggled' : False,
                    'number': -1,
                    'direction': None}
    puzzle[0][3] = {'pos': {'row': 0, 'col': 3},
                    'letter': ' ',
                    'toggled' : False,
                    'number': 2,
                    'direction': 'down'}
    puzzle[1][0] = {'pos': {'row': 1, 'col': 0},
                    'letter': ' ',
                    'toggled' : False,
                    'number': -1,
                    'direction': None}
    puzzle[1][1] = {'pos': {'row': 1, 'col': 1},
                    'letter': '#',
                    'toggled' : True,
                    'number': -1,
                    'direction': None}
    puzzle[1][2] = {'pos': {'row': 1, 'col': 2},
                    'letter': '#',
                    'toggled' : True,
                    'number': -1,
                    'direction': None}
    puzzle[1][3] = {'pos': {'row': 1, 'col': 3},
                    'letter': ' ',
                    'toggled' : False,
                    'number': -1,
                    'direction': None}
    puzzle[2][0] = {'pos': {'row': 2, 'col': 0},
                    'letter': ' ',
                    'toggled' : False,
                    'number': 3,
                    'direction': 'across'}
    puzzle[2][1] = {'pos': {'row': 2, 'col': 1},
                    'letter': ' ',
                    'toggled' : False,
                    'number': -1,
                    'direction': None}
    puzzle[2][2] = {'pos': {'row': 2, 'col': 2},
                    'letter': ' ',
                    'toggled' : False,
                    'number': -1,
                    'direction': None}
    puzzle[2][3] = {'pos': {'row': 2, 'col': 3},
                    'letter': ' ',
                    'toggled' : False,
                    'number': -1,
                    'direction': None}
    puzzle[3][0] = {'pos': {'row': 3, 'col': 0},
                    'letter': ' ',
                    'toggled' : False,
                    'number': -1,
                    'direction': None}
    puzzle[3][1] = {'pos': {'row': 3, 'col': 1},
                    'letter': '#',
                    'toggled' : True,
                    'number': -1,
                    'direction': None}
    puzzle[3][2] = {'pos': {'row': 3, 'col': 2},
                    'letter': '#',
                    'toggled' : True,
                    'number': -1,
                    'direction': None}
    puzzle[3][3] = {'pos': {'row': 3, 'col': 3},
                    'letter': ' ',
                    'toggled' : False,
                    'number': -1,
                    'direction': None}
    
    
    # print puzzle (print the letters in each cell)
    print('Puzzle:')
    for row in puzzle:
        for cell in row:
            if cell['letter'] == ' ':
                print('_', end=' ')
            else:
                print(cell['letter'], end=' ')
        print()
    print()
    
    # word list for testing from vectorize.py
    word_list = vectorize.create_word_list('animal')
    # trim word list to 500 words
    word_list = word_list[:500]

    # run solve function
    final_puzzle = build(puzzle, word_list)

    if final_puzzle is None:
        print('No solution found')
        return

    # print final puzzle
    for row in final_puzzle:
        for cell in row:
            print(cell['letter'], end=' ')
        print()
    
if __name__ == "__main__":
    main()