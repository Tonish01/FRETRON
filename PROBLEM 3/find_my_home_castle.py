class ChessBoard:
    def __init__(self, size):
        self.size = size
        self.board = [[0 for _ in range(size)] for _ in range(size)]
        self.special_castle_pos = None
        self.paths = []

    def place_soldiers(self, soldiers):
        for x, y in soldiers:
            self.board[x-1][y-1] = 1

    def place_special_castle(self, x, y):
        self.special_castle_pos = (x-1, y-1)

    def find_paths(self, x, y, path, direction):
        if (x, y) == self.special_castle_pos and path:
            self.paths.append(path.copy())
            return

        if direction == "up" and x > 0:
            for i in range(x-1, -1, -1):
                if self.board[i][y] == 1:
                    self.board[i][y] = 0
                    path.append((i+1, y+1))
                    self.find_paths(i, y, path, "left")
                    path.pop()
                    self.board[i][y] = 1
                    break
                elif (i, y) == self.special_castle_pos:
                    path.append((i+1, y+1))
                    self.find_paths(i, y, path, "left")
                    path.pop()
                    break

        if direction == "left" and y > 0:
            for i in range(y-1, -1, -1):
                if self.board[x][i] == 1:
                    self.board[x][i] = 0
                    path.append((x+1, i+1))
                    self.find_paths(x, i, path, "up")
                    path.pop()
                    self.board[x][i] = 1
                    break
                elif (x, i) == self.special_castle_pos:
                    path.append((x+1, i+1))
                    self.find_paths(x, i, path, "up")
                    path.pop()
                    break

    def find_unique_paths(self):
        self.find_paths(self.special_castle_pos[0], self.special_castle_pos[1], [], "up")
        return self.paths

def main():
    size = 10
    board = ChessBoard(size)

    # Read input from user
    num_soldiers = int(input("Enter the number of soldiers: "))
    soldiers = []
    for i in range(num_soldiers):
        x, y = map(int, input(f"Enter coordinates for soldier {i+1}: ").split(","))
        soldiers.append((x, y))

    special_castle_x, special_castle_y = map(int, input("Enter the coordinates for your 'special' castle: ").split(","))

    # Place soldiers and special castle on the board
    board.place_soldiers(soldiers)
    board.place_special_castle(special_castle_x, special_castle_y)

    # Find unique paths
    paths = board.find_unique_paths()

    # Print the paths
    print(f"Thanks. There are {len(paths)} unique paths for your 'special_castle'")
    for i, path in enumerate(paths):
        print(f"Path {i+1}")
        print("=" * 7)
        for step in path:
            print(f"Kill {step}. Turn Left")
        print("Arrive", (special_castle_x, special_castle_y))

if __name__ == "__main__":
    main()
