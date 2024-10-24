import os
import re
import sys

# The new copyright header to be added
new_header = '''/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/
'''

# Regular expression pattern to detect existing copyright headers (old headers)
# This pattern looks for headers that contain the word "Copyright"
copyright_pattern = re.compile(r'/\*.*?Copyright.*?\*/', re.DOTALL | re.IGNORECASE)

# Function to add or replace the old copyright header with the new one
def update_copyright_in_file(filepath):
    with open(filepath, 'r+', encoding='utf-8') as f:
        content = f.read()

        # Check if the file contains a copyright header
        if re.search(copyright_pattern, content):
            # Replace the existing copyright header with the new one
            updated_content = re.sub(copyright_pattern, '', content, count=1).lstrip()
            print(f"Replaced old copyright header in {filepath}")
        else:
            # If no copyright header is found, leave other headers intact
            updated_content = content.lstrip()
            print(f"Added new copyright header to {filepath}")
        
        # Write the new header at the top and restore the rest of the content
        f.seek(0, 0)
        f.write(new_header + '\n' + updated_content)
        f.truncate()  # Ensures the file length is correctly adjusted

# Function to process all .js files in a directory
def process_all_js_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.js'):
                filepath = os.path.join(root, file)
                update_copyright_in_file(filepath)

# Main function to decide whether to process a single file or all .js files
def main():
    if len(sys.argv) == 2:
        # If a specific file path is provided
        specific_file = sys.argv[1]
        if os.path.isfile(specific_file) and specific_file.endswith('.js'):
            update_copyright_in_file(specific_file)
        else:
            print(f"Error: {specific_file} is not a valid .js file.")
    else:
        # If no file is specified, process all .js files in the directory
        directory = 'hypergraphos/system/2.1/'
        process_all_js_files(directory)

if __name__ == "__main__":
    main()
