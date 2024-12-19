import os

def read_messages_from_file(file_path):
    """Read messages from a text file and return them as a list."""
    if not os.path.exists(file_path):
        print(f"Error: The file '{file_path}' does not exist.")
        return []

    with open(file_path, 'r', encoding='utf-8') as file:
        messages = file.readlines()

    # Clean and strip messages (remove whitespace/newlines)
    messages = [message.strip() for message in messages if message.strip()]
    return messages

def get_messages_from_user():
    """Allow the user to input messages manually."""
    print("Enter your messages below. Type 'DONE' to finish:")
    messages = []
    while True:
        message = input("> ").strip()
        if message.upper() == "DONE":
            break
        if message:
            messages.append(message)
    return messages

def save_cleaned_messages(messages, output_file):
    """Save the cleaned messages to a new text file."""
    with open(output_file, 'w', encoding='utf-8') as file:
        file.writelines([message + '\n' for message in messages])

def main():
    # Ask the user how they want to provide data
    choice = input("Do you want to (1) use a file or (2) input messages manually? ")

    if choice == "1":
        # Input file path
        input_file = "messages.txt"  # Replace with dynamic input if needed
        messages = read_messages_from_file(input_file)
    elif choice == "2":
        messages = get_messages_from_user()
    else:
        print("Invalid choice. Exiting.")
        return

    if not messages:
        print("No messages found to process.")
        return

    print(f"Collected {len(messages)} messages.")

    # Output file
    output_file = "cleaned_messages.txt"
    save_cleaned_messages(messages, output_file)
    print(f"Cleaned messages saved to '{output_file}'.")

if __name__ == "__main__":
    main()
