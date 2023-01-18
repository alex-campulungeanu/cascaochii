import pathlib
import os
from os.path import isfile

FRONTEND_PATH = '../frontend/src'
# lst = os.listdir('../frontend/src')

# files = [f for f in os.listdir(FRONTEND_PATH) if isfile(os.path.join(FRONTEND_PATH, f))]

# files = [os.path.join(FRONTEND_PATH, f) for (dirpath, dirnames, filenames) in os.walk(FRONTEND_PATH) for f in filenames]

file_paths = []
for root, directories, files in os.walk(FRONTEND_PATH):
    for filename in files:
        file_path = os.path.join(root, filename)
        file_paths.append(file_path)
        
# print(file_paths)

for f in file_paths:
    # file_extension = pathlib.Path(f).suffix
    base_name = os.path.splitext(f)[0]
    file_extension = os.path.splitext(f)[1]
    if file_extension == '.js':
        print(file_extension)
        print(base_name)
        os.rename(f, base_name + '.ts')
    # break