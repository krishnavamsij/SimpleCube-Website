import sys

def check_brackets(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    stack = []
    lines = content.split('\n')
    
    # Simple bracket matching that ignores contents of backtick strings
    # This is a bit complex for a one-liner, but we can try a state machine
    
    in_backtick = False
    in_double_quote = False
    in_single_quote = False
    escaped = False
    
    for i, char in enumerate(content):
        if escaped:
            escaped = False
            continue
        
        if char == '\\':
            escaped = True
            continue
            
        if char == '`':
            if not in_double_quote and not in_single_quote:
                in_backtick = not in_backtick
            continue
        
        if in_backtick:
            continue
            
        if char == '"':
            if not in_backtick and not in_single_quote:
                in_double_quote = not in_double_quote
            continue
            
        if in_double_quote:
            continue
            
        if char == "'":
            if not in_backtick and not in_double_quote:
                in_single_quote = not in_single_quote
            continue
            
        if in_single_quote:
            continue
            
        # If we are here, we are in code, not strings
        if char == '{':
            stack.append(('{', i))
        elif char == '}':
            if not stack:
                print(f"Extra closing brace at index {i}")
                return False
            stack.pop()
        elif char == '[':
            stack.append(('[', i))
        elif char == ']':
            if not stack:
                print(f"Extra closing bracket at index {i}")
                return False
            stack.pop()
            
    if stack:
        for s, i in stack:
            # Find line number
            line_no = content[:i].count('\n') + 1
            print(f"Unclosed {s} at line {line_no}")
        return False
    
    print("All brackets balanced!")
    return True

if __name__ == "__main__":
    if check_brackets(sys.argv[1]):
        sys.exit(0)
    else:
        sys.exit(1)
