import os
import re
import sys

# The new copyright header to be added
new_copyright = '''/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/
'''

# Regular expression to match the "Licensed Materials" part
licensed_pattern = re.compile(
    r'=+\nL.+\n.+\n.+\n.+\n='
)

# Function to update only the Licensed Materials part, preserving Module and Date
def update_copyright_in_file(filepath):
    with open(filepath, 'r+', encoding='utf-8') as f:
        content = f.read()

        # Check if the Licensed Materials section exists and remove it
        if re.search(licensed_pattern, content):
            print(f"Pattern found in {filepath}")
            # Replace the old "Licensed Materials" section with the new copyright header
            content = re.sub(licensed_pattern, '', content)
            print(f"Replaced old copyright header in {filepath}")
        
        # Add the new copyright header at the top
        updated_content = new_copyright + '\n' + content
        print(f"Added new copyright header to {filepath}")
        
        # Write the updated content back to the file
        f.seek(0, 0)
        f.write(updated_content)
        f.truncate()  # Ensures the file length is correctly adjusted

# Function to process all .js files in a directory recursively
def process_all_js_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.js'):
                filepath = os.path.join(root, file)
                print(f"Processing file: {filepath}")
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
        # If no file is specified, process all .js files in the hypergraphos directory
        directory = 'hypergraphos'
        print(f"Processing all .js files in directory: {directory}")
        process_all_js_files(directory)

if __name__ == "__main__":
    main()
